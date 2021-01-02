const express = require('express');
const router = express.Router();
const tareaController = require('../Controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear una tarea
//api/tareas
router.post('/',
            auth,
            [
                check('nombre','El nombre de la tarea es obligatorio').not().isEmpty()
            ],
            tareaController.creaTarea
);
//Obtener tareas
//api/tareas
router.get('/',
    auth,        
    tareaController.obtenerTareas
);

//Actualizar tareas
//api/tareas
router.put('/:id',
    auth,        
    tareaController.actualizarTarea
);

//eliminar tareas
//api/tareas
router.delete('/:id',
    auth,        
    tareaController.eliminarTarea
);
module.exports = router;