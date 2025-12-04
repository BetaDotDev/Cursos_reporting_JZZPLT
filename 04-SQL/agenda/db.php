<?php
    // Conexión a la BBDD
    $dsn = 'mysql:host=localhost;dbname:agenda;charset=utf8';
    $db_user='';
    $db_pass = '';

    // Conexión a una base de datos usando PDO (PHP Data Objects)
    $options: [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Si ocurre un error, lanza una excepción
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // modo de optención de resultados, retorna un array asociativo(['id'=>1, 'nombre' => 'Juan'])

    ];

    // Ahora, nos toca arrancar todo
    try {
        $pdo = new PDO($dsn, $db_user, $db_pass, $options);
    } catch (PDOException $e) {
        die('Error de conexión: '. $e->getMessage());
    } 

    // Error tipico: SQLSTATE[HY000] [1045] Access denied for user ... 

    