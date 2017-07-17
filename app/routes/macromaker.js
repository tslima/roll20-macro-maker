
function verificaAutenticacao(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.status('401').json('Não Autorizado');
	}
}

module.exports = function(app){
	var controller = app.controllers.macromaker;
	app.route('/macromaker')
		.get(verificaAutenticacao,controller.show)
};
