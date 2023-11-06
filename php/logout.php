<?php
    session_start();

    if($_SERVER["REQUEST_METHOD"] == "GET" && isset($_SESSION['id_usuario'])) {
        session_unset();
        session_destroy();
        echo json_encode(array('success' => true));
    }  else {
        echo json_encode(array('success' => false, 'message' => 'Variável não encontrada na sessão.'));
    }
?>
