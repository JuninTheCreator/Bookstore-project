const express = require('express');
const cors = require('cors');
require('dotenv').config();

const livrosRoutes = require('./src/routes/livros');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/livros', livrosRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Livraria rodando com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
