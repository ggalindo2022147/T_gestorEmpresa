import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJwt } from "../middlewares/validar-jwt.js";
import { actualizarEmpresa, anTrayectoriaE, categoriaEmpresarial, empresaPost, empresas, obtenerExcel, ordenEmpresas } from "./empresa.controller.js";

const router = Router();

router.post(
    "/",
    [
        validarJwt,
        check("nombreEmpresa", "El nombre de la empresa no puede estar vacio").not().isEmpty(),
        check("fundacionEmpresa", "El año de fundacion de la empresa no puede estar vacio").not().isEmpty(),
        check("nivelImpacto", "El nivel de impacto de la empresa no puede estar vacio").not().isEmpty(),
        check("anTrayectoria", "Los años de trayectoria de la empresa no puede estar vacio").not().isEmpty(),
        check("categoriaEmpresarial", "La categoria empresarial no puede estar vacia").not().isEmpty(),
        validarCampos,
    ], empresaPost);

router.get("/", empresas);

router.get("/or", validarJwt, ordenEmpresas);

router.get("/an", validarJwt, anTrayectoriaE);

router.get("/categoria", validarJwt, categoriaEmpresarial);

router.put(
    "/:id",
    [
        validarJwt,
        check("id", "No es un id valido").isMongoId(),
        validarCampos,
    ], actualizarEmpresa);

router.get(
    "/excel",
    validarJwt,
    obtenerExcel);

export default router;