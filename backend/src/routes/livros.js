const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.get('/', livrosController.listarLivros);
router.get('/:id', livrosController.buscarLivro);
router.post('/', livrosController.criarLivro);
router.put('/:id', livrosController.atualizarLivro);
router.delete('/:id', livrosController.excluirLivro);

module.exports = router;
