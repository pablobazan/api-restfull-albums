'use strict'

var mongoose = require("mongoose");
var app = require('./app');
var port = process.env.PORT || 3700;



mongoose.connect('mongodb://localhost:27017/appalbums', (err, resp) =>{
	if (err) 
	{
		throw err;
	}
	else
	{
		console.log("Base de datos funcionando correctamente...");

		app.listen(port, () => {
			console.log('Api Restful de albums escuchando... en localhost:3700');
		})
	}
});