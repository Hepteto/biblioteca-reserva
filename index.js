const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./Routes/todoRoutes');

dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para lidar com solicitações de /favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// Rotas da API
app.use('/todo', todoRoutes);

// Rota/ Endpoint inicial
app.get('/', (req,res) =>{
    res.json({message: 'Testando API'})
});

// entregar uma porta
mongoose.connect(process.env.MONGO) // conectar ao banco de dados
    .then(() => {
        console.log("Conectamos ao mongo DB");
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
    })
    .catch((err) => console.log(err));
