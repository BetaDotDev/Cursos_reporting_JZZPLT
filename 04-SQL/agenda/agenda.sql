DROP DATABASE IF EXISTS agenda;
CREATE DATABASE IF NOT EXISTS agenda 
    CHARACTER SET utf8 
    COLLATE utf8_spanish_ci;

USE agenda;

SHOW VARIABLES LIKE 'character_set_database';
SHOW VARIABLES LIKE 'collation_database';

ALTER DATABASE agenda 
    CHARACTER SET utf8 
    COLLATE utf8_spanish_ci;


-- ============================
-- Tabla Usuarios
-- ============================
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL UNIQUE,
    password_hash VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    nombre_completo VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL UNIQUE,
    email VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci,
    rol ENUM('admin', 'editor', 'lector') NOT NULL DEFAULT 'lector',
    activo TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;


-- ============================
-- Tabla Contactos
-- ============================
DROP TABLE IF EXISTS contactos;

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    apellidos VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    telefono VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    email VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    observaciones TEXT CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
