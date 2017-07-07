'use strict'

var path = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

var fs = require('fs');

function pruebas(req, res)
{
	res.status(200).send({message: 'Pruebas de controlador de imagenes'});
}

function getImage(req, res)
{
	var imageId = req.params.id;

	Image.findById(imageId, (err, image) =>
	{

		if(err)
		{
			res.status(500).send({message: 'Error en la peticion'});

		}
		else
		{
			if(!image)
			{
				res.status(404).send({message: 'No existe la imagen'});
			}
			else
			{
				Album.populate(image, {path: 'album'}, (err, image)=>{
					if(err)
					{
						res.status(500).send({message: 'Error en la peticion populate'});
					}
					else
					{
						res.status(200).send({image});
					}

				});
				
			}
		}
	})
}

function getImages(req, res)
{
	var albumId = req.params.album;

	if(!albumId)
	{
		//sacar todas las imagenes de bd
		Image.find({}).sort('title').exec((err, images)=>{
			if(err)
			{
				res.status(500).send({message: 'Error en la peticion de traer todas las imagenes'});
			}
			else
			{
				if(!images)
				{
					res.status(404).send({message: 'No existen imagenes'});
				}
				else
				{
					Album.populate(images, {path: 'album'}, (err, images)=>{
						if(err)
						{
							res.status(500).send({message: 'Error en la peticion populate'});
						}
						else
						{
							res.status(200).send({images});
						}

					});
				}
			}
		});
	}
	else
	{
		//sacar todas las imagenes asociadas al album
		Image.find({album: albumId}).sort('title').exec((err, images)=>{
			if(err)
			{
				res.status(500).send({message: 'Error en la peticion de traer todas las imagenes'});
			}
			else
			{
				if(!images)
				{
					res.status(404).send({message: 'No existen imagenes'});
				}
				else
				{
					Album.populate(images, {path: 'album'}, (err, images)=>{
						if(err)
						{
							res.status(500).send({message: 'Error en la peticion populate'});
						}
						else
						{
							res.status(200).send({images});
						}

					});
				}
			}
		});
	}
}

function saveImage(req, res)
{
	var image = new Image();

	var params = req.body;

	image.title = params.title;
	image.picture = null;
	image.album = params.album;

	image.save((err, imageStored)=> {
		if(err)
		{
			res.status(500).send({message: 'Error en la peticion'});
		}
		else
		{
			if(!imageStored)
			{
				res.status(404).send({message: 'La imagen no se ha guardado'});
			}
			else
			{
				res.status(200).send({image: imageStored});
			}
		}
	})
}

function updateImage(req, res)
{
	var imageId = req.params.id;
	var update = req.body;

	Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) =>{
	
		if(err)
		{
			res.status(500).send({message: 'Error en la peticion de actualizar la imagen'});
		}
		else
		{
			if(!imageUpdated)
			{
				res.status(404).send({message: 'No se ha actualizado la imagen'});
			}
			else
			{
				res.status(200).send({imageUpdated});
			}
			
		}
	});
}

function deleteImage(req, res)
{
	var imageId = req.params.id;

	Image.findByIdAndRemove(imageId, (err, imageRemoved) =>{
	
		if(err)
		{
			res.status(500).send({message: 'Error en la peticion de borrar la imagen'});
		}
		else
		{
			if(!imageRemoved)
			{
				res.status(404).send({message: 'No se ha podido eliminar la imagen porque no existe'});
			}
			else
			{
				res.status(200).send({image: imageRemoved});
			}
			
		}
	})
}

function uploadImage(req, res)
{
	var imageId = req.params.id;
	var file_name = 'No subido';

	if(req.files)
	{
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[1];

		Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) =>{
	
			if(err)
			{
				res.status(500).send({message: 'Error en la peticion de actualizar la imagen'});
			}
			else
			{
				if(!imageUpdated)
				{
					res.status(404).send({message: 'No se ha actualizado la imagen'});
				}
				else
				{
					res.status(200).send({imageUpdated});
				}
				
			}
		});
	}
	else
	{
		res.status(200).send({message: 'No ha subido ninguna imagen'});
	}

	
}

function getImageFile(req, res)
{
	var imageFile = req.params.imageFile;

	fs.exists('./uploads/' + imageFile, function(exists)
	{
		if(exists)
		{
			res.sendFile(path.resolve('./uploads/' + imageFile));
		}
		else
		{
			res.status(200).send({message: 'La imagen no existe'});
		}
	})
	
}

module.exports = {
	pruebas,
	getImage,
	getImages,
	saveImage,
	updateImage,
	deleteImage,
	uploadImage,
	getImageFile
}