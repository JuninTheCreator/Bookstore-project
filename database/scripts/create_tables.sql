-- ============================================
-- Banco de Dados: Livraria
-- Descrição: Estrutura de tabelas para gerenciamento
--            de livros de uma livraria
-- ============================================

CREATE DATABASE IF NOT EXISTS livraria_db;
USE livraria_db;

-- Tabela de categorias dos livros
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela de autores
CREATE TABLE IF NOT EXISTS autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL
);

-- Tabela principal de livros
CREATE TABLE IF NOT EXISTS livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor_id INT,
    categoria_id INT,
    isbn VARCHAR(20) UNIQUE,
    preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantidade_estoque INT NOT NULL DEFAULT 0,
    capa_arquivo VARCHAR(255),        -- caminho/nome do arquivo de capa (pasta files/)
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE SET NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Tabela de clientes (opcional, para futuras vendas)
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    telefone VARCHAR(20)
);

-- Tabela de vendas (opcional, para futuras vendas)
CREATE TABLE IF NOT EXISTS vendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    livro_id INT NOT NULL,
    cliente_id INT,
    quantidade INT NOT NULL DEFAULT 1,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (livro_id) REFERENCES livros(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
