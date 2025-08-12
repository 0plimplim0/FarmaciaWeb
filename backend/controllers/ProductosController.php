<?php

require_once __DIR__ . '/../models/Producto.php';

class ProductosController {
    private $productoModel;

    public function __construct($conn) {
        $this->productoModel = new Producto($conn);
    }

    public function obtenerDestacados() {
        return $this->productoModel->obtenerDestacados();
    }

    public function obtenerTodos() {
        return $this->productoModel->obtenerTodos();
    }
}
