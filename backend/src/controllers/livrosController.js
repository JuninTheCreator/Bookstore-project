const db = require('../config/db');

// GET /api/livros - lista todos os livros
exports.listarLivros = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT l.id, l.titulo, a.nome AS autor, c.nome AS categoria,
             l.isbn, l.preco, l.quantidade_estoque, l.capa_arquivo
      FROM livros l
      LEFT JOIN autores a ON l.autor_id = a.id
      LEFT JOIN categorias c ON l.categoria_id = c.id
      ORDER BY l.id DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livros', detalhe: err.message });
  }
};

// GET /api/livros/:id - busca um livro específico
exports.buscarLivro = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM livros WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar livro', detalhe: err.message });
  }
};

// POST /api/livros - cadastra um novo livro
exports.criarLivro = async (req, res) => {
  try {
    const { titulo, autor_id, categoria_id, isbn, preco, quantidade_estoque, capa_arquivo } = req.body;

    if (!titulo || !preco) {
      return res.status(400).json({ erro: 'Título e preço são obrigatórios' });
    }

    const [resultado] = await db.query(
      `INSERT INTO livros (titulo, autor_id, categoria_id, isbn, preco, quantidade_estoque, capa_arquivo)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, autor_id || null, categoria_id || null, isbn || null, preco, quantidade_estoque || 0, capa_arquivo || null]
    );

    res.status(201).json({ id: resultado.insertId, mensagem: 'Livro cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar livro', detalhe: err.message });
  }
};

// PUT /api/livros/:id - atualiza um livro
exports.atualizarLivro = async (req, res) => {
  try {
    const { titulo, autor_id, categoria_id, isbn, preco, quantidade_estoque, capa_arquivo } = req.body;

    const [resultado] = await db.query(
      `UPDATE livros SET titulo=?, autor_id=?, categoria_id=?, isbn=?, preco=?, quantidade_estoque=?, capa_arquivo=?
       WHERE id=?`,
      [titulo, autor_id || null, categoria_id || null, isbn || null, preco, quantidade_estoque, capa_arquivo, req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json({ mensagem: 'Livro atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar livro', detalhe: err.message });
  }
};

// DELETE /api/livros/:id - remove um livro
exports.excluirLivro = async (req, res) => {
  try {
    const [resultado] = await db.query('DELETE FROM livros WHERE id = ?', [req.params.id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }

    res.json({ mensagem: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover livro', detalhe: err.message });
  }
};
