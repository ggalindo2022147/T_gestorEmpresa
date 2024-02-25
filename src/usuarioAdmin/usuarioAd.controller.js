import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import UsuarioAd from './usuarioAd.model.js'

export const usuarioAdPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const usuarioAd = new UsuarioAd({ nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    usuarioAd.password = bcryptjs.hashSync(password, salt);

    await usuarioAd.save();

    res.status(200).json({
        usuarioAd
    });
}