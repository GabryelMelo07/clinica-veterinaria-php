<?php
    session_start();
    require_once('conexao.php');
    
    $conexao = new Conexao();

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = md5($_POST['senha']);

        $sql = "INSERT INTO usuario (nome, email, senha) VALUES ('$nome', '$email', '$senha')";
        $resultado = $conexao->executarConsulta($sql);

        if ($resultado === TRUE) {
            $usuarioId = $conexao->getConexao()->insert_id;
            $_SESSION['usuarioId'] = $usuarioId;

            $conexao->fecharConexao();
            exit();
        } else {
            echo "Erro ao cadastrar usuário: " . $conn->error;
            $conexao->fecharConexao();
        }
    }
?>
