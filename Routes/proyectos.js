const express = require('express');
const router = express.Router();
const proyectoController = require('../Controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea un Proyectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.crearProyecto
);
//obtener todos los proyecto
//api/proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//actualiza un proyecto
//api/proyectos/id
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty(),
    ],
    proyectoController.actualizarProyecto
);

//actualiza un proyecto
//api/proyectos/id
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);


module.exports= router;