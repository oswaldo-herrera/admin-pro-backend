const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');




const login = async(req, res = response) => {
    
    const {email, password } = req.body;
    
    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });
        }

        // verificar contraseña  POCn0nbFZAsv6LKR elliot2022
        const validPassword = bcrypt.compareSync(password,usuarioDB.password); //es para hacer match los password login
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'

            });
        }

        //generar un token
        const token = await generarJWT(usuarioDB.id);

        
        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });    
    }

}


module.exports = {
    login,
} 