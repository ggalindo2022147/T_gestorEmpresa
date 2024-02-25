import { Router } from "express";
import { check } from "express-validator";

import { usuarioLogin } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router()

router.post(
    "/",
    [
        check('correo', 'Este no es un correo valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos,
    ], usuarioLogin)

export default router