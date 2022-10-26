const {response} = require('express');
// const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} =require('../helpers/jwt')


const getUsuarios = async(req, res) => {  
    
    const usuarios = await Usuario.find({},'nombre mail role google');

    res.json({
        ok: true,
        usuarios,
        // uid: req.uid
    });
}


const crearUsuario = async(req, res = response) => {    

    //console.log(req.body)
    const {email, password} = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email });
        

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
       
        //guardar usuario
        await usuario.save();

        //Generar token-jwt
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        });
    }
   
}

const actualizarUsuario = async(req, res=response) => {
     //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    //const {nombre etc.. } = re.body;

    try {


        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //Actualizaciones
        const {password,google, email,...campos} = req.body;

        if(usuarioDB.email != email){            
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usario con ese email'
                })
            }


        }

        campos.email=email;


        // delete campos.password;
        // delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{ new:true } );

        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'

        });
    }

}


const borrarUsuario = async(req, res=response) => {
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese id'
            });
        }


        await Usuario.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg: 'Usuario eliminado'

        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el admimistrador'
        });    
        
    }


    

    const eu = await Usuario.findByIdAndDelete(uid,campos);

    

}


module.exports = {
    getUsuarios,crearUsuario,actualizarUsuario,borrarUsuario,
}