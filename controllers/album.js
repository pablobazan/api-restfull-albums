'use strict'

var Album = require('../models/album');

function getAlbum(req, res)
{
	var albumId = req.params.id;


	Album.findById(albumId, (err, album)=>{
		if(err)
		{
			return res.status(500).send({message: 'Error en la peticion'});
		}
		else
		{
			if(!album)
			{
				res.status(404).send({message: 'El album no existe'});
			}
			else
			{
				res.status(200).send({album});
			}
		}
	})
}

function getAlbums(req, res)
{
	var albumId = req.params.id;


	Album.find({}, (err, albums)=>{
		if(err)
		{
			return res.status(500).send({message: 'Error en la peticion'});
		}
		else
		{
			if(!albums)
			{
				res.status(404).send({message: 'No hay albums'});
			}
			else
			{
				res.status(200).send({albums});
			}
		}
	})
}

function saveAlbum(req, res)
{
	var album = new Album();

	var params = req.body;
	album.title = params.title;
	album.description = params.description;

	album.save((err, albumStored)=>{
		if(err)
		{
			return res.status(500).send({message: 'Error al guardar el album'});
		}
		else
		{
			if (!albumStored)
			{
				res.status(404).send({message: 'No se ha guardado el album'});
			}
			else
			{
				res.status(200).send({album: albumStored});
			}
		}

	});
}

function updateAlbum(req, res)
{
	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=> { //albumUpdate es el modificado, no la modificacion!!!

		if(err)
		{
			res.status(500).send({message: 'Error al actualizar el album'});
		}
		else
		{
			if(!albumUpdated)
			{
				res.status(404).send({message: 'No se ha podido actualizar el album'});
			}
			else
			{
				res.status(200).send({albumUpdated});
			}
		}


	})
}


function deleteAlbum(req, res)
{
	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndRemove(albumId, (err, albumRemove)=> { //albumUpdate es el modificado, no la modificacion!!!

		if(err)
		{
			res.status(500).send({message: 'Error al actualizar el album'});
		}
		else
		{
			if(!albumRemove)
			{
				res.status(404).send({message: 'No se ha podido actualizar el album'});
			}
			else
			{
				res.status(200).send({albumRemove});
			}
		}


	})
}


module.exports = {
	getAlbum,
	getAlbums,
	saveAlbum,
	updateAlbum,
	deleteAlbum

};