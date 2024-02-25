import mongoose from "mongoose";

const UsuarioAdSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo:{
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    role:{
        type: String,
        default: "ADMIN_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UsuarioAdSchema.methods.toJson = function(){
    const { __v, password, _id,...usuarioAd } = this.toObject();
    usuarioAd.uid = _id;
    return usuarioAd
}

export default mongoose.model('Usuario', UsuarioAdSchema);