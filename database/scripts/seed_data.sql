-- ============================================
-- Dados de exemplo para testes
-- ============================================

USE livraria_db;

INSERT INTO categorias (nome) VALUES
('Ficção'),
('Tecnologia'),
('Romance'),
('Infantil');

INSERT INTO autores (nome) VALUES
('Machado de Assis'),
('J.K. Rowling'),
('Robert C. Martin'),
('Monteiro Lobato');

INSERT INTO livros (titulo, autor_id, categoria_id, isbn, preco, quantidade_estoque, capa_arquivo) VALUES
('Dom Casmurro', 1, 1, '9788525406958', 29.90, 15, 'dom_casmurro.jpg'),
('Harry Potter e a Pedra Filosofal', 2, 1, '9788532511010', 49.90, 8, 'harry_potter_1.jpg'),
('Clean Code', 3, 2, '9780132350884', 89.90, 5, 'clean_code.jpg'),
('Sítio do Picapau Amarelo', 4, 4, '9788525056733', 34.90, 20, 'sitio_picapau.jpg');
