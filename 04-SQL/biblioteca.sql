-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:13306
-- Tiempo de generación: 02-12-2025 a las 13:23:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autor`
--

CREATE TABLE `autor` (
  `id_autor` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `pais` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `id_libro` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `anio` int(11) DEFAULT NULL CHECK (`anio` >= 1500),
  `id_autor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id_prestamo` int(11) NOT NULL,
  `id_libro` int(11) NOT NULL,
  `id_socio` int(11) NOT NULL,
  `fecha_prestam` date NOT NULL,
  `fecha_devolucion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socio`
--

CREATE TABLE `socio` (
  `id_socio` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`id_autor`);

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`id_libro`),
  ADD KEY `id_autor` (`id_autor`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id_prestamo`),
  ADD KEY `id_libro` (`id_libro`),
  ADD KEY `id_socio` (`id_socio`);

--
-- Indices de la tabla `socio`
--
ALTER TABLE `socio`
  ADD PRIMARY KEY (`id_socio`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autor`
--
ALTER TABLE `autor`
  MODIFY `id_autor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `id_libro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id_prestamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `socio`
--
ALTER TABLE `socio`
  MODIFY `id_socio` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `libro`
--
ALTER TABLE `libro`
  ADD CONSTRAINT `libro_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autor` (`id_autor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`id_libro`) REFERENCES `libro` (`id_libro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`id_socio`) REFERENCES `socio` (`id_socio`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
