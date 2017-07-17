var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var controller = {};

	controller.show = function(req,res){
		/*Contato.find().populate('emergencia').exec()
			.then(
					function(contatos) {
						res.json(contatos);
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
			);*/
	};
	return controller;
};
