<?php
    require_once('conexao.php');

    $conexao = new Conexao();
    
    if(isset($_GET['id'])) {
        $consultaId = $_GET['id'];
        
        $sql = "SELECT * FROM consultas WHERE id = $consultaId";
        $result = $conexao->executarConsulta($sql);

        if ($result->num_rows > 0) {
            $consultaDetalhes = $result->fetch_assoc();
            echo json_encode($consultaDetalhes);
        } else {
            echo json_encode(array('Erro:' => 'Consulta não existe, ou foi cancelada.'));
        }
    } else {
        echo json_encode(array('Erro: ' => 'ID da consulta não fornecido ou incorreto'));
    }

    $conexao->fecharConexao();
?>
