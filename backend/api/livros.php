<?php
// API de Livros - CRUD completo
// Rotas (todas nesse mesmo arquivo, diferenciadas pelo método HTTP):
//   GET    /api/livros.php          -> lista todos os livros
//   GET    /api/livros.php?id=1     -> busca um livro específico
//   POST   /api/livros.php          -> cadastra um novo livro
//   PUT    /api/livros.php?id=1     -> atualiza um livro
//   DELETE /api/livros.php?id=1     -> remove um livro

header('Content-Type: application/json; charset=utf-8');

// Libera acesso do frontend (CORS) - útil ao abrir o index.html direto no navegador
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Requisição de "pre-flight" do navegador - só responde OK e encerra
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/db.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : null;

switch ($metodo) {
    case 'GET':
        if ($id) {
            buscarLivro($pdo, $id);
        } else {
            listarLivros($pdo);
        }
        break;

    case 'POST':
        criarLivro($pdo);
        break;

    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID do livro é obrigatório para atualizar']);
            break;
        }
        atualizarLivro($pdo, $id);
        break;

    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(['erro' => 'ID do livro é obrigatório para excluir']);
            break;
        }
        excluirLivro($pdo, $id);
        break;

    default:
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
        break;
}

// ===== Funções =====

function listarLivros($pdo)
{
    $sql = "SELECT l.id, l.titulo, a.nome AS autor, c.nome AS categoria,
                   l.isbn, l.preco, l.quantidade_estoque, l.capa_arquivo
            FROM livros l
            LEFT JOIN autores a ON l.autor_id = a.id
            LEFT JOIN categorias c ON l.categoria_id = c.id
            ORDER BY l.id DESC";

    $stmt = $pdo->query($sql);
    echo json_encode($stmt->fetchAll());
}

function buscarLivro($pdo, $id)
{
    $stmt = $pdo->prepare("SELECT * FROM livros WHERE id = ?");
    $stmt->execute([$id]);
    $livro = $stmt->fetch();

    if (!$livro) {
        http_response_code(404);
        echo json_encode(['erro' => 'Livro não encontrado']);
        return;
    }

    echo json_encode($livro);
}

function criarLivro($pdo)
{
    $dados = json_decode(file_get_contents('php://input'), true);

    if (empty($dados['titulo']) || empty($dados['preco'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Título e preço são obrigatórios']);
        return;
    }

    $sql = "INSERT INTO livros (titulo, autor_id, categoria_id, isbn, preco, quantidade_estoque, capa_arquivo)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados['titulo'],
        $dados['autor_id'] ?? null,
        $dados['categoria_id'] ?? null,
        $dados['isbn'] ?? null,
        $dados['preco'],
        $dados['quantidade_estoque'] ?? 0,
        $dados['capa_arquivo'] ?? null,
    ]);

    http_response_code(201);
    echo json_encode(['id' => $pdo->lastInsertId(), 'mensagem' => 'Livro cadastrado com sucesso']);
}

function atualizarLivro($pdo, $id)
{
    $dados = json_decode(file_get_contents('php://input'), true);

    $sql = "UPDATE livros SET titulo=?, autor_id=?, categoria_id=?, isbn=?, preco=?, quantidade_estoque=?, capa_arquivo=?
            WHERE id=?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados['titulo'] ?? null,
        $dados['autor_id'] ?? null,
        $dados['categoria_id'] ?? null,
        $dados['isbn'] ?? null,
        $dados['preco'] ?? null,
        $dados['quantidade_estoque'] ?? 0,
        $dados['capa_arquivo'] ?? null,
        $id,
    ]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['erro' => 'Livro não encontrado']);
        return;
    }

    echo json_encode(['mensagem' => 'Livro atualizado com sucesso']);
}

function excluirLivro($pdo, $id)
{
    $stmt = $pdo->prepare("DELETE FROM livros WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['erro' => 'Livro não encontrado']);
        return;
    }

    echo json_encode(['mensagem' => 'Livro removido com sucesso']);
}
