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


SHOW VARIABLES LIKE 'character_set_database';
SHOW VARIABLES LIKE 'collation_database';
ALTER DATABASE biblioteca CHARACTER SET utf8 COLLATE utf8_spanish_ci; -- Actualiza la tabla a utf 8 
 


/* Creacion estructurada de tablas*/

CREATE TABLE autor (

    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50)
);

CREATE TABLE libro (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
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

/*AHORA NOS TOCA METER DATOS*/


INSERT INTO autor (nombre, pais) VALUES
('Marta Tomé', 'España'),
('Isabel Allende', 'Chile'),

/* SELECT: PODEMOS TESTEAR QUE LA BBDD ESTÁ BIEN */
-- Obtencion de todos los libros
SELECT * FROM libro;
-- Obteniendo de todos los libros
SELECT nombre FROM autor;
-- Obteniendo consultas más parametrizadas
SELECT id_autor, anio FROM libro WHERE anio>1970;
-- Con ordenación ASCendente y DESCendente
SELECT id_autor, anio From libro Order By anio ASC;
SELECT id_autor, anio From libro Order By anio DESC;
-- cuenta cuentos... Ahora funcionamos con funciones built-in (precocninadas)
SELECT COUNT(*) AS TOTAL_AUTORES FROM autor;-- Conteo
SELECT DISTINCT anio FROM libro; -- Sin duplicado
SELECT id_autor, anio, FROM libro WHERE anio BETWEEN 1950 AND 1980; -- Entre fechas
SELECT nombre, email FROM socio WHERE email LIKE '%.com';-- expresiones regulares


-- --  FUNCIONES PRE-BUILD DE SQL -- --
COUNT()-- Cuenta registros -> SELECT COUNT(*) FROM libro;
SUM() -- suma valores -> SELECT SUM(precio) FROM libro;
AVG() -- promedio -> SELECT AVG(anio FROM libro; 
MAX() -- Máximo SELECT MAX(anio) FROM libro;
MIN() -- MinimoSELECT MIN(precio) FROM libro;

-- -- FUNCIONES DE TEXTO
UPPER() -- mayúsculas -> SELECT UPPER ('hola'); --> "HOLA"
LOWER() -- minúsculas -> SELECT LOWER ('HOLA'); --> "hola"
LENGTH() -- longitud -> SELECT LENGTH ('LIBRO'); --> 5
CONCAT() -- concatenación -> SELECT CONCAT ('Hola ', 'Mundo'); --> "Hola Mundo"
SUBSTRING() -- extrascción -> SELECT SUBSTRING('biblioteca', 1,4); --> "bibl"
REMPLACE() -- remplazo -> SELECT REMPLACE ('hola mundo', 'hola', 'hey'); --> "hey mundo"
TRIM() -- quita espacios antes y después -> SELECT TRIM (' texto '); --> "texto"

-- -- FUNCIONES DE MATEMÁTICAS/NUMÉRICAS -- -- 
ROUND() --REDONDEO -> SELECT ROUND (3.14159,2); 3.14
CEIL() -- muestra el número más pequeño próximo al dado -> SELECT CEIL (4.1); --> 5
FLOOR() -- redondeo a la baja -> SELECT FLORR (4.9); -->4
ABS() -- valor abbsoluto -> SELECT ABS (-8); --8
MOD() -- resto -> SELECT MOD(10,3); MOD(dividiendo, divisor)-->1

-- -- FUNCIONES DE FECHA / HORA -- -- 
NOW() -- fecha y hora actual -> SELECT NOW();
CURDATE() -- solo fecha -> SELECT CURDATE();
CURTIME() -- solo hora -> SELECT CURTIME();
YEAR() -- solo year -> SELECT YEAR ('2024-10-01');
MONTH () -- solo mes -> SELECT MOUNTH ('2024-10-01');
DAY () -- solo día -> SELECT DAY ('2024-10-01');
DATEDIFF() -- 'la cuenta la vieja' -> SELECT DATEDIFF('2025-01-10', '2025-1-1'); -->9
DATE_ADD() -- fecha + x días -> SELECT DATE_ADD(CURDATE(), INTERVAL 10 DAY);
DATE_SUB() -- fecha - x días -> SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH);

-- -- FUNCIONES DE LÓGICAS/CONDICIONALES -- --
IF() -- condicional simple -> SELECT IF (1=1, 'Sí', 'No');
INFULL() -- reemplazar NULL -> SELECT INFULL(email, 'sin correo');
NULLIF() -- devuelve NULL si son iguales -> SELECT NULLIF(5,5);
CASE -- condicionale múltiple -> CASE WHEN edad>18 THEN 'Adulto' END
-- Ejemplo completo de un CASE:
SELECT nombre,
        CASE
            WHEN anio < 1950 THEN 'Antiguo' 
            WHEN anio BETWEEN 1950 AND 200 THEN 'Moderno'
            ELSE 'Reciente'
        END AS categoria
FROM libro; 

-- -- FUNCIONES DE CONVERSIÓN: PARSEANDO -- --
CAST() -- conversión de tipos -> SELECT CAST (10 AS CHAR);
CONVERT() -- conversión flexible -> SELECT CONVERT ('2024-01-01', date);

-- EJEMPLO INDIVIDUALIZADOS -- 
SELECT COUNT(*), SUM(precio), AVG(precio), MAX(precio), MIN(precio)
FROM libro; -- agregación

SELECT UPPER(nombre), LENGTH(nombre), SUBSTRING(nombre,1,3)
FROM  libro; -- textO

select PRECIO, ROUND(precio,1), CEIL(precio), MOD(stock,5)
FROM libro; -- matemáticas

SELECT fecha_publicación, 
        YEAR (fecha_publicacion), 
        DATEDIFF(NOW(), fecha_publicación)
FROM libro; -- fechas

SELECT nombre, 
        IF (stock>0,'Disponible', 'Agotado'), 
        CASE WHEN precio>30 THEN 'Caro' ELSE 'Económico' END
FROM libro;-- lógicas 

SELECT CAST(stock AS CHAR), CONVERT(precio,DECIMAL (10,2))
FROM libro; -- conversión 

-- OPERADORES, PATRONMNES Y FUNCIONES DE LIKE (SQL) -- 
-- Operador LIKE se utiliza para comparar cadenas contra una RegExp (expresión regular)

... columna LIKE 'patrón'...
-- % - cualquier nuemro de caracteres
nombre LIKE 'A%' -> empieza con A
nombre LIKE '%A' -> finaliza con A
nombre LIKE '%an%' -> contiene A

-- _ un solo carácter

codigo LIKE 'A_1' -> a + 1 CARÁCTER + 1

-- Conjuntos y rangos (solo en SQL Server, POSTGRESQL y SQLite)

-- En MySQL NO funciona; usar REGEXP
-- cualqueiera de esos caracteres
nobre LIKE '[abc]%' -- empieza con a,b o c
-- rango de letras
nobre LIKE '[A-Z]%' -- empieza con mayúscula
-- NO está en el rango
nobre LIKE '[^0-9]%' -- No empieza con número
-- Negación de LIKE
columna NOT LIKE '%texto%'

-- Escape de caracteres especiales: Si necesitas buscar un %, - o [], debes escapar-- 

---> para SQL Server
columna LIKE '%[%]%'

---> Para MySQL y PostgreSQL

columna LIKE '%\%%' Escape'\': -- busca signo %  

---> aLTENATIVAS MÁS POTANTE QUE lIKE
MySQL - > RREGEXP
PostgreSQL ~-> y ~*
SQL Server -> LIKE + PATINDEX
SQLite -> REGEXP (si está activado)

-- Ejemplo a lo "brutito"--
SELECT id_socio, nombre, email
FROM socio
WHERE email REGEXP '^[a-z0-9._%-]+@gmail.com$';

/*
^ -> iniciamos la REGEXP
[a-z0-9._%-]nombre email, con letras, números, guiones y puntos
@gmail.com -> dominio exacto del email
$-> fin de cadena
*/

-- Funciones relacionadas que suelen usarse con LIKE --
SELECT * FROM libros WHERE LOWER(nombre) LIKE LOWER ('%García%')-- búsquedas sin distinguir mayúsculas
SELECT * FROM libros WHERE RTRIM(nombre) LIKE 'Juan%' -- limpiar espacios a la derecha
SELECT * FROM libros WHERE LTRIM(nombre) LIKE 'Juan%' -- limpiar espacios a la left
SELECT * FROM libros WHERE email LIKE CONCAT ('%', 'gmail', '%' ) -- concatenar patrones


-- Ejemplos útiles (de todo un poco) --
SELECT * FROM socio WHERE email LIKE '%gmail.com'; -- Buscar correos de dominio Gmail
SELECT * FROM socio WHERE telefono LIKE '-645-___-___'; -- Buscar números telefónicos con
-- Buscar todos los trelefonos que tengan el codigo de país (+XX)

SELECT telefono FROM contactos
-- Para paises
    WHERE telefono LIKE '+%'; -- empieza por +loquesea
    WHERE telefono LIKE '+__%'; -- exactamente 2 dígitos
    WHERE telefono LIKE '+__%' OR telefono LIKE '+___%';
-- para códigos de rovincias, condados, estados, sectores o áreas
WHERE telefono LIKE '(___)%'; -- contiene código de area
WHERE telefono LIKE '(925)%'OR telefono LIKE '925-%' OR telefono LIKE '925 %'; -- área especifica

-- para números más locales
WHERE telefono LIKE '%23'; -- que termine en 23
WHERE telefono LIKE '23%'; -- que empiece en 23
WHERE telefono LIKE '6%'; -- que telefonía móvil
WHERE telefono LIKE '%_______'; -- con 7 dígitos exactos
-- TODOS los teléfonos válidos (solo números, espacios y signos básicos)
WHERE telefono LIKE '%[0-9+()- ]%'
-- TODOS los móviles
WHERE telefono LIKE '6________'
    OR telefono LIKE '7________';
WHERE telefono LIKE '%-%-%'; -- si los metes con guiones

-- HASH: Utilidades que podemos tener "a mano"-- 
    -- MD5: produce un valor de hash de 128-bit (es muy antiguo)
    -- SHA-1 (Secure Hash Algorithm): genera un hash de 160-bit (20 bytes) 
    -- SHA2-256: regresa un balor de hash de 256-bits, o 64 dígitos hexadecimales
    -- SHA3-256: variante con aplicabilidad equivalente a SHA-256
-- en MySQL, tiene disponible MD% y SHA-256
-- Principal uso para passwords, claves de acceso y demás -- columna -> password_hash VARCHA(128) PARA sha-512
    -- y VARCHAR (64) SI ES sha-256
INSERT INTO users (username, password_hash)
ALUES ('Diego', SHA2('mipasswordamazon',256));

-- comparando un password ingresado
SELECT * FROM users WHERE username == 'Diego'
AND password_hash=sha2('mipasswordamazon', 256);

-- -- -- -- -- -- -- -- -- -- -- -- -- --
-- Se mos va de madre, la cosa...
INSERT INTO users (username,salt,pashword_hash)
VALUES(
    'Diego',
    'abcd1234',
    SHA2(concat('abcd1234','passwordpaamazons'),256)
);

-- Ahora, valida si tienes ...

SELECT * FROM users WHERE username = 'Diego' AND password_hash= SHA2(CONCAT('abcd1234','passwordpaamazons'),256)






