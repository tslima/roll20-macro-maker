var http = require('http');
var app = require('./config/express')();
require('./config/passport')();
require('./config/database.js')(process.env.MONGODB_URI);

if (process.env.ENV == "development") {
  var path = require('path');
  var fs = require('fs');
  var https = require('https')
  var certOptions = {
    key: fs.readFileSync(path.resolve('server.key')),
    cert: fs.readFileSync(path.resolve('server.crt'))
  }
  https.createServer(certOptions, app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
  });
} else {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' + app.get('port'));
  });
}
