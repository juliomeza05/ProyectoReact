const { SchemaType } = require('mongoose');
const Proyecto = require('../Models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req,res) =>{

    //Revisar si hay errores
    const  errors = validationResult(req);
    if(!errors.isEmpty() )
    {
        return res.status(400).json({errorres: errors});
    }

    try {
        
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        //guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        proyecto.save();

        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('huboo un error');
    }
}

//obtiene todos los proyectos del el usuario actual

exports.obtenerProyectos = async(req,res) => {
    try 
    {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('huboo un error');
    }
}

//actualiza un proyecto 
exports.actualizarProyecto =async (req,res) => {
    //Revisar si hay errores
    const  errors = validationResult(req);
    if(!errors.isEmpty() )
    {
        return res.status(400).json({errorres: errors});
    }

    //extraer la información del proyecto
    const {nombre} = req.body;

    const nuevoProyecto = {};

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
              //si el proyecto existe
        if(!proyecto){
            res.status(404).json({msg:'Proyecto no existe'});
        }
        //verificar el creador del proyecto.
        if(proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg:'No autorizado'});
        }
        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},
                                                    {$set: nuevoProyecto},
                                                    {new : true});

        res.status(200).json({proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).send('huboo un error');
    }

}
//elimina un proyecto por su id
exports.eliminarProyecto = async (req,res) => {
    try {
        //revisar el id
        let proyecto = await Proyecto.findById(req.params.id);
        console.log(req.params.id);
        //si el proyecto existe
        if(!proyecto){
            res.status(404).json({msg:'Proyecto no existe'});
        }
        //verificar el creador del proyecto.
        if(proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg:'No autorizado'});
        }
        //Eliminar
        await Proyecto.findOneAndRemove({_id: req.params.id});

        res.status(200).json({msg:'Proyecto eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).send('huboo un error');
    }
}