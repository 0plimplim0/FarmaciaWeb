<?php

// Datos de conexión
$db_host = "localhost";
$db_user = "root";
$db_pass = "root";
$db_name = "accesoVital";

// Crear conexión
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Configurar UTF-8
if (!$conn->set_charset("utf8mb4")) {
    die("Error configurando charset: " . $conn->error);
}