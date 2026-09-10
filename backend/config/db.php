<?php
// Configuração de conexão com o banco de dados
// Ajuste esses dados se o seu MySQL/XAMPP usar outra senha

$host = 'localhost';
$dbname = 'livraria_db';
$usuario = 'root';
$senha = '';   // no XAMPP padrão, geralmente fica vazio

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $usuario,
        $senha,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Falha na conexão com o banco', 'detalhe' => $e->getMessage()]);
    exit;
}
