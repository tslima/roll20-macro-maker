var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

  var Usuario = mongoose.model('Usuario');

  passport.use(new FacebookStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
  }, function(token, refreshToken, profile, done) {
      console.log(profile)
              Usuario.findOrCreate(
                    {"login": profile.id},
                    {"nome" : profile.displayName},
                    //{"email": profile.email.value},
                    function(erro,usuario){
                      if(erro){
                        console.log(erro);
                        return done(erro);
                      }
                      return done(null,usuario);
                    })}
              ));

  passport.serializeUser(function(usuario,done){
    done(null,usuario._id);
  });

  passport.deserializeUser(function(id,done){
    Usuario.findById(id).exec()
      .then(function(usuario){
        done(null,usuario)
      });
  });
};
