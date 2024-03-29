import { request, response } from "express";
import Empresa from "./empresa.model.js"
import Excel from "exceljs"

export const empresaPost = async (req, res) => {
    const { nombreEmpresa, fundacionEmpresa, nivelImpacto, anTrayectoria, categoriaEmpresarial } = req.body;
    const empresa = new Empresa({ nombreEmpresa, fundacionEmpresa, nivelImpacto, anTrayectoria, categoriaEmpresarial });

    await empresa.save();

    res.status(200).json({
        empresa
    });
}

export const empresas = async (req, res) => {
    const query = { estadoEmpresa: true };

    const [cantidadRegistradas, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);

    res.status(200).json({
        msg: "Empresas",
        cantidadRegistradas,
        empresas
    });
}

export const ordenEmpresas = async (req, res) => {
    const query = { estadoEmpresa: true };
    const direction = req.query.order === 'desc' ? -1 : 1;

    const [cantidadRegistradas, empresas] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query).sort({ nombreEmpresa: direction })
    ]);

    res.status(200).json({
        msg: "Empresas ordenas",
        cantidadRegistradas,
        empresas
    });
}

export const anTrayectoriaE = async (req, res) => {
    const query = { estadoEmpresa: true };
    const filtrarAn = req.query.years ? { anTrayectoria: parseInt(req.query.years) } : {};
    const direction = req.query.order === 'desc' ? -1 : 1;

    const [cantidadRegistradas, empresas] = await Promise.all([
        Empresa.countDocuments({ ...query, ...filtrarAn }),
        Empresa.find({ ...query, ...filtrarAn }).sort({ nombreEmpresa: direction })
    ]);

    res.status(200).json({
        msg: "Empresa coincidente",
        cantidadRegistradas,
        empresas
    });
}

export const categoriaEmpresarial = async (req, res) => {
    const query = { estadoEmpresa: true };
    const categoria = req.query.categoria ? { categoriaEmpresarial: req.query.categoria } : {};

    if (req.query.categoria && (await Empresa.countDocuments({ ...query, ...categoria })) === 0) {
        return res.status(400).json({
            msg: "No se encontraron empresas para la categoría proporcionada, verifique que el nombre de la categoria esté bien escrito (tildes, mayúsculas, minúsculas)"
        });
    }

    const [cantidadRegistradas, empresas] = await Promise.all([
        Empresa.countDocuments({ ...query, ...categoria }),
        Empresa.find({ ...query, ...categoria })
    ]);

    res.status(200).json({
        msg: "Empresas coincidentes",
        cantidadRegistradas,
        empresas
    });
}



export const actualizarEmpresa = async (req, res) => {
    const { id } = req.params;
    const { _id, nombreEmpresa, estadoEmpresa,...resto} = req.body;

    await Empresa.findByIdAndUpdate(id, resto);

    const empresa = await Empresa.findOne({_id: id});

    res.status(200).json({
        msg: "Actualizado exitosamente",
        empresa
    })
}

export const obtenerExcel = async (req, res) => {
    const query = { estadoEmpresa: true };

    try {
        const empresas = await Empresa.find(query);
    
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');
    
        worksheet.addRow(['Nombre de la empresa', 'Año de fundacion', 'Nivel de impacto', 'Años de trayectoria', 'Categoría empresarial']);
    
        const agregarEmpresasFila = async (index) => {
            if (index < empresas.length) {
                const empresa = empresas[index];
                worksheet.addRow([
                    empresa.nombreEmpresa,
                    empresa.fundacionEmpresa,
                    empresa.nivelImpacto,
                    empresa.anTrayectoria,
                    empresa.categoriaEmpresarial
                ]);
                await agregarEmpresasFila(index + 1);
            } else {
                const buffer = await workbook.xlsx.writeBuffer();
    
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename="empresas.xlsx"');
    
                res.status(200).send(buffer);
            }
        };
    
        await agregarEmpresasFila(0);
    
    } catch (error) {
        console.log('Error al generar el excel', error)
    }
}