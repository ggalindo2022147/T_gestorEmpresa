import { Router } from "express";
import { check } from "express-validator";
import { usuarioAdPost } from "./usuarioAd.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("correo", "El correo no puede estar vacio").not().isEmpty(),
        check("password", "La contraseña no puede ser menor a 6 caracteres").not().isLength({min:6}),
    ], usuarioAdPost);

export default router;