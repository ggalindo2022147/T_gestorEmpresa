import { request, response } from "express";
import Empresa from "./empresa.model.js"

export const empresaPost = async (req, res) => {
    const { nombreEmpresa, fundacionEmpresa, nivelImpacto, anTrayectoria, categoriaEmpresarial } = req.body;
    const empresa = new Empresa({nombreEmpresa, fundacionEmpresa, nivelImpacto, anTrayectoria, categoriaEmpresarial});

    await empresa.save();

    res.status(200).json({
        empresa
    });
}