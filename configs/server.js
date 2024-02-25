'use strict'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js'
import usuarioRoutes from '../src/usuarioAdmin/usuarioAd.routes.js'
import authRoutes from '../src/auth/auth.routes.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "/coperex/v1/auth"
        this.userAdPath = "/coperex/v1/usuarioAd"

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userAdPath, usuarioRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;