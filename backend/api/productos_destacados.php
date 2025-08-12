<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../controllers/ProductosController.php';

if ($conn->connect_error) {
    echo json_encode(['error' => $conn->connect_error]);
    exit;
}

$controller = new ProductosController($conn);

$data = $controller->obtenerDestacados();

if ($data === false) {
    echo json_encode(['error' => 'Error al obtener productos destacados']);
} else {
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}