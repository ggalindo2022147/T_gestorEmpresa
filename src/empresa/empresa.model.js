import mongoose from "mongoose";

const EmpresaSchema = mongoose.Schema({
    nombreEmpresa:{
        type: String,
        required: [true, "El nombre de la empresa es obligatorio"]
    },
    fundacionEmpresa:{
        type: Number,
        required: [true, "El año de fundacion es obligatorio"]
    },
    nivelImpacto:{
        type: String,
        required: [true, "El nivel de impacto es obligatorio"]
    },
    anTrayectoria:{
        type: String,
        required: [true, "Los años de trayectoria son obligatorios"]
    },
    categoriaEmpresarial:{
        type: String,
        required: [true, "La categoria empresarial es obligatoria"]
    },
    estadoEmpresa:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Empresa', EmpresaSchema);