const Usuario = require('../Models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req,res)=> {
    //Revisar si hay errores
    const  errors = validationResult(req);
    if(!errors.isEmpty() )
    {
        return res.status(400).json({errorres: errors});
    }
    //extraer email y password
    const {email,password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});
        //validar si ya existe el usuario
        if(usuario)
        {
            return res.status(400).json({msg: 'El usuario ya existe!'});
        }
        //guardar nuevo usuario
        usuario =  new Usuario(req.body);

        //hashear el pass
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);
        //guardar Ususrio
        await usuario.save();

        //crear y firmar
        const payload = {
            usuario: {
                id: usuario.id
            }  
        };
       
        //firmar jwt
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600 //1hora
        },(error, token)=>{
            if(error) throw error;
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.res.status(400).json({msg: 'Error: '+ error});
    }
}