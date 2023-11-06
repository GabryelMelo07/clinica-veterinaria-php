<?php
    require_once('conexao.php');

    if (isset($_GET['id'])) {
        $idConsulta = $_GET['id'];

        $conexao = new Conexao();

        $sql = "DELETE FROM consultas WHERE id = $idConsulta";
        $result = $conexao->executarConsulta($sql);

        if ($result === TRUE) {
            http_response_code(200);
            echo json_encode(array("message" => "Consulta excluída com sucesso."));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Erro ao excluir consulta: " . $conexao->error));
        }

        $conexao->fecharConexao();
    } else {
        http_response_code(405);
        echo json_encode(array("message" => "Método não permitido."));
    }
?>
