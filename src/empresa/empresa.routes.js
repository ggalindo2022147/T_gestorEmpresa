import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { empresaPost } from "./empresa.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nombreEmpresa", "El nombre de la empresa no puede estar vacio").not().isEmpty(),
        check("fundacionEmpresa", "El año de fundacion de la empresa no puede estar vacio").not().isEmpty(),
        check("nivelImpacto", "El nivel de impacto de la empresa no puede estar vacio").not().isEmpty(),
        check("anTrayectoria", "Los años de trayectoria de la empresa no puede estar vacio").not().isEmpty(),
        check("categoriaEmpresarial", "La categoria empresarial no puede estar vacia").not().isEmpty(),
        validarCampos,
    ], empresaPost);

export default router;