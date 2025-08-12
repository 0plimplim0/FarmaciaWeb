<?php

class Producto {
    private $conn;

    public function __construct($conexion) {
        $this->conn = $conexion;
    }

    // Obtener todas las categorías con sus productos (sin filtro destacado)
    public function obtenerTodos() {
        $resultado = [];

        $sqlCategorias = "SELECT id, nombre FROM categorias";
        $resCat = $this->conn->query($sqlCategorias);

        if ($resCat) {
            while ($categoria = $resCat->fetch_assoc()) {
                $categoria_id = $categoria['id'];
                $sqlProductos = "SELECT id, nombre, precio, imagen FROM productos WHERE categoria_id = $categoria_id";
                $resProd = $this->conn->query($sqlProductos);

                $productos = [];

                if ($resProd) {
                    while ($producto = $resProd->fetch_assoc()) {
                        $productos[] = $producto;
                    }
                }

                $resultado[] = [
                    'categoria' => $categoria['nombre'],
                    'productos' => $productos
                ];
            }
        } else {
            return ['error' => $this->conn->error];
        }

        return $resultado;
    }

    // Obtener categorías destacadas con sus productos
    public function obtenerDestacados() {
        $resultado = [];

        $sqlCategorias = "SELECT id, nombre FROM categorias WHERE destacado = 'TRUE'";
        $resCat = $this->conn->query($sqlCategorias);

        if ($resCat) {
            while ($categoria = $resCat->fetch_assoc()) {
                $categoria_id = $categoria['id'];
                $sqlProductos = "SELECT id, nombre, precio, imagen FROM productos WHERE categoria_id = $categoria_id";
                $resProd = $this->conn->query($sqlProductos);

                $productos = [];

                if ($resProd) {
                    while ($producto = $resProd->fetch_assoc()) {
                        $productos[] = $producto;
                    }
                }

                $resultado[] = [
                    'categoria' => $categoria['nombre'],
                    'productos' => $productos
                ];
            }
        } else {
            return ['error' => $this->conn->error];
        }

        return $resultado;
    }
}