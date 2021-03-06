const express = require('express');
const Actor = require('../models/booking');

// Restfull => GET POST PUT PATCH DELETE
function list(req, res, next) {
    Actor.find().then(objs => res.status(200).json ({
        message: 'Lista de actores del sistema',
        obj: objs
    })).catch(ex => res.status(500).json({
        message: 'No se consultar la informacion de los actopres...',
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Actor almacenado con ID ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `No se pudo localizar al actor con ID ${id}`,
        obj: ex
    }));
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });

    actor.save().then(obj => res.status(200).json({
        message: 'Actor creado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo almacenar el actor',
        obj: ex
    }));

}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name: "";
    let lastName = req.body.lastName ? req.body.lastName: "";

    let actor = new Object({
        _name: name,
        _lastname: lastName
    });

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
        message: 'El actor fue reemplazado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo reemplazar el actor',
        obj: ex
    }));


}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;

    let actor = new Object();

    if(name){
        actor._name = name;
    }
    if(lastName){
        actor._lastName = lastName;
    }

    Actor.findOneAndUpdate({"_id":id}, actor).then(obj => res.status(200).json({
        message: 'El actor fue actualizado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo actualizar el actor',
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Actor.remove({"_id":id}).then(obj => res.status(200).json({
        message: 'El actor fue eliminado correctamente',
        obj: obj
    })).catch(ex => res.status(500).json({
        message: 'No se pudo eliminar el actor',
        obj: ex
    }));
}


module.exports = {
    list, index, create, edit, replace, destroy
}
