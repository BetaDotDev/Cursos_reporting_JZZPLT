/*
TIPOS D EDATOS EN SQL (CUALQUIER TIPO DE DBMS)

* Tipos de datos utilizados por norma general en casi todas las BBDD

---> NUMÉRICOS DE TIPO ENTERO
        TINYINT = enteros muy pequeños
        SMALLINT - enteros pequeños
        *INT / INTEGER - enteros estándar
        BIGINT - enteros grandes

---> NUMÉRICOS DE TIPO DECIMAL/PRECISIÓN
        *DECIMAL(p.s) / NUMERIC (p.s) - precisión exacta (ideal para dinero)
            - P : precisión total
            - S : decimales

---> NUMÉRICOS DE TIPO  FLOTANTE O APROXIMADO
        *FLOAT - doble precisión en algunos motores de SGBD
        REAL - precisión simple
        DOUBLE / DOUBLE PRECISION - mayor precision

---> CADENAS DE TAMAÑO X (caracteres ASCII)
        CHAR(n) - ocupa exactamente n caracteres
        *VARCHAR(n) - hasta n caracteres, más dos que indican la longitud
        TEXT- (MySQL,PostgreSQL)
        TINYTEXT, MEDIUMTEXT, LONGTEXT (MySQL)
        INTEXT (SQL Server, obsoleto)

---> FECHA/HORA
        *DATE - solo fecha (AAAA-MM-DD)
        *TIME - solo hora
        *DATETIME - fecha y hora
        *TIMESTAMP - fecha y hora con zona/ajuste
        *YEAR - MySQL

---> BOOLEANO
        BOOLEAN/BOOL: se guarda bien 0/1 o True/False en muchos motores

*/

/* Creación y  arranque de la BBDD */

CREATE DATABASE biblioteca;
USE biblioteca;


/* Creacion estructurada de tablas*/

CREATE TABLE autor (

    id_autor INT AUTO_INCREMENT PRMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50)
;)

CREATE TABLE libro


