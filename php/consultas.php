<?php
    session_start();
    require_once('conexao.php');

    $conexao = new Conexao();

    if(isset($_SESSION['id_usuario'])) {
        $id_usuario = $_SESSION['id_usuario'];
    } else {
        $id_usuario = null;
    }
    
    $sql = "SELECT * FROM consultas";
    $result = $conexao->executarConsulta($sql);
    $consultas = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $consultas[] = $row;
        }
    }

    $response = [
        'id_usuario' => $id_usuario,
        'consultas' => $consultas
    ];

    header('Content-Type: application/json');
    echo json_encode($response);
    
    $conexao->fecharConexao();
    exit();
?>
