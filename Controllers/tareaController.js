const Tarea = require('../Models/Tarea');
const Proyecto = require('../Models/Proyecto');
const {validationResult} = require('express-validator');


//Crea una nueva tarea
exports.creaTarea = async(req,res) => {
      //Revisar si hay errores
      const  errors = validationResult(req);
      if(!errors.isEmpty() )
      {
          return res.status(400).json({errorres: errors});
      }
      
      
      try 
      {
        //extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            res.status(404).send({msg: 'Proyecto no encontrado'});
        }

        //verificar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg:'No autorizado'});
        }

        //Creamos la tarea

        const tarea = new Tarea(req.body);
        await tarea.save();

        res.json({tarea});


      } catch (error) {
        console.log(error);
        res.status(500).send('huboo un error');
      }
}

//obtiene las tareas por proyectos
exports.obtenerTareas = async(req,res) => {

   try {
       //extraer el proyecto y comprobar si existe
       const {proyecto} =req.query;
       const existeProyecto = await Proyecto.findById(proyecto);
       if(!existeProyecto){
           res.status(404).send({msg: 'Proyecto no encontrado'});
       }
       //verificar si el proyecto actual pertenece al usuario autenticado
       if(existeProyecto.creador.toString() !== req.usuario.id) {
           res.status(401).json({msg:'No autorizado'});
       }


       //obtener las tareas por proyectos
       const tareas = await Tarea.find({proyecto}).sort({creado: -1});
       res.json({tareas});
   } catch (error) {
    console.log(error);
    res.status(500).send('huboo un error');
   }
}
//actualizar tarea
exports.actualizarTarea = async(req,res) => {

    try {
        //extraer el proyecto y comprobar si existe
        const {proyecto,nombre,estado} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
         
        //verificar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).send({msg: 'La tarea no existe'});
        }
        //verificar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg:'No autorizado'});
        }
        //creamos un objeto con la nueva información
        const nuevaTarea = {};
        nuevaTarea.nombre =nombre;
        nuevaTarea.estado = estado;

        //guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id},nuevaTarea,{new: true});
        res.json({tarea});

    } catch (error) {
     console.log(error);
     res.status(500).send('hubo un error : ' +  error);
    }
 }
 //eliminar tarea
exports.eliminarTarea = async(req,res) => {

    try {
        //extraer el proyecto y comprobar si existe
        const {proyecto} = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
         
        //verificar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).send({msg: 'La tarea no existe'});
        }
        //verificar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({msg:'No autorizado'});
        }
      

        //Eliminar la tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        return res.status(200).send({msg: 'Tarea Eliminada'});

    } catch (error) {
     console.log(error);
     res.status(500).send('hubo un error');
    }
 }