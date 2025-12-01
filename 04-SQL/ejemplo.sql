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

---> BINARIOS (imágenes, PDF, archivos o datos RAW/en crudo)
        * BINARY(n)
        VARBINARY(n)
        *BLOB- dato binario largo\
        *TINYBLOB, MEDIUMBLOB, LONGBLOB (MySQL)

---> TIPOS ESPECIALES, DEPENDIENTES DEL DBMS (MOTOR)
    PostgreSQL
        SERIAL, BIGSERIAL -autoincremento
        UUID - idetificadores únicos
        JSON, JSONB - datos en formato JSON
        ARRAY - arreglos
        INET, CIDR, MARCADOR - redes/IP
        GEOMETRY, GEOGRAPHY - datos espaciales (PostGIS)
    
    MySQL
        ENUM - lista de valores permitidos
        SET - conjunto de valores múltiples
        JSON
        
    SQL Server
        UNIQUEIDENTIFIER - UUID
    
    XML
        GEOGRAPHY, GEOMETRY
    

*/

/* Creación y  arranque de la BBDD */

CREATE DATABASE biblioteca;
USE biblioteca;


/* Creacion estructurada de tablas*/

CREATE TABLE autor (

    id_autor INT AUTO_INCREMENT PRMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50)
);

CREATE TABLE libro (
    id_libro INT AUTO_INCREMENT PRMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    anio INT CHECK (anio >= 1500),
    id_autor INT NOT NULL,
    CONSTRAINT fk_libro_autor FOREIGN KEY (id_autor) REFERENCES autor(id_autor) /* Constuye una FK */
    /*FOREIGN KEY (campo que enlaza mi tabla actual) REFERENCES la_tabla_con_la_que_enlaza(campo con el que enlaza)*/

);

CREATE TABLE socio (
    id_socio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE

);


CREATE TABLE prestamo (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_libro INT NOT NULL,
    id_socio INT NOT NULL,
    fecha_prestam DATE NOT NULL,
    fecha_devolucion DATE,
    CONSTRAINT fk_prestamo_libro FOREIGN KEY (id_libro) REFERENCES libro(id_libro),
    CONSTRAINT fk_libro_socio FOREIGN KEY (id_socio) REFERENCES socio(id_socio)

);


/*
UN POQUITO DE CIBER: 
    - CHECK (condición): restricción que obliga a que los valores insertados en ea colmna cumpla la condición
    - PRIMARY KEY: identificación única y exclusiva, no permite NULL o no se puede repetir
    - Foreign Key (Clave foránea): establece la relacion entre 2 tablas. El valor siempre debe existir en amblas tablas relacionadas (autor en el libro y en la tabla autor) 
    - UNIQUE: evita que se repitan valores en la columna
    - NOT NULL : impide los valores nulos, es decir, debemos rellenarlo obligatoriamente
    - DEFAULT: si no introduces el valor, lo coloca por defecto al que se programe
    - AUTO_INCREMENT/SERIAL: dependiendo del motor de gestión de BBDD, se genera un número consecutivo para las PKs:
        MySQL: AUTO_INCREMENT
        PostgreSQL: SERIAL
        SQL Server: IDENTITY
    - INDEX: mejoramos la velocidad de búsqueda - no es restricción de integridad. Es lo más cercano a disponer de MongoDB y sus "cositas"
    - CONSTAINT: regla que asegura la integridad de los datos en MySQL, evitando datos inválidos, duplicados, o incoherencias entre 2 tablas -->
        CONSTRAINT edad_valida CHECK (edad >= 18)
        CONSTRAINT pk_usuario PRIMARY KEY (id_usuario)


*/