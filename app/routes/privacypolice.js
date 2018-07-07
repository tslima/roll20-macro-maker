module.exports = function(app){
  app.get('/privacypolice',function(req,res){
    var login = '';
    if(req.user) {
      login = req.user.nome;
      console.log(login);
    }
    res.render('privacypolice');
  })
};
