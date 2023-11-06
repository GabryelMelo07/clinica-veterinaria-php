<?php
    session_start();
    require_once('conexao.php');

    $conexao = new Conexao();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_SESSION['id_usuario'])) {
            $id_usuario = $_SESSION['id_usuario'];
            $acao = $_POST['acao'];
            $consulta_id = $_POST['consulta_id'];
            $idade = $_POST['idade'];
            $data = $_POST['data'];
            $hora = $_POST['hora'];
            $motivo = $_POST['motivo'];

            if ($acao == 'POST') {
                $sql = "INSERT INTO consultas (id_usuario, idade, data, hora, motivo) VALUES ('$id_usuario', '$idade', '$data', '$hora', '$motivo')";
                $result = $conexao->executarConsulta($sql);
                
                if ($result === TRUE) {
                    echo json_encode(['message' => 'Nova consulta inserida com sucesso.']);
                } else {
                    echo json_encode(['error' => 'Erro ao inserir nova consulta: ' . $conexao->error]);
                }
            } elseif ($acao == 'PUT') {
                $sql = "UPDATE consultas SET idade='$idade', data='$data', hora='$hora', motivo='$motivo' WHERE id='$consulta_id'";
                $result = $conexao->executarConsulta($sql);
                
                if ($result === TRUE) {
                    echo json_encode(['message' => 'Consulta atualizada com sucesso.']);
                } else {
                    echo json_encode(['error' => 'Erro ao atualizar consulta: ' . $conexao->error]);
                }
            }
        }
    }

    $conexao->fecharConexao();
?>
