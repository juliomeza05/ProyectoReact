const Usuario = require('../Models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

//api/auth
exports.autenticarUsuario = async (req,res) => {
    const  errors = validationResult(req);
    if(!errors.isEmpty() )
    {
        return res.status(400).json({errorres: errors});
    }
    
    //extraer email y password
    const {email,password} = req.body;

    try 
    {
        //Revisar que sea usuario registrado
        let usuario = await Usuario.findOne({email});
       
        if(!usuario){
            res.status(400).json({msg: 'El usuario no existe!'});
        }

        //Revisar password
        const passCorrecto = await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            
            res.status(400).json({msg: 'Password incorrecto!'});
        }

        //si todo es correcto crear y firmar
        const payload = {
            usuario: {
                id: usuario.id
            }  
        };

        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600 //1hora
        },(error, token)=>{
            if(error) throw error;
            res.json({token});
        });

    } catch (error) {
       console.log(error); 
    }

}

exports.usuarioAutenticado = async(req,res) =>{
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'hubo un error'});
    }
}