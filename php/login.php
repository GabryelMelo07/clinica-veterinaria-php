<?php
    session_start();
    require_once('conexao.php');

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email']) && isset($_POST['senha'])) {
        $conexao = new Conexao();
        
        $email = mysqli_real_escape_string($conexao->getConexao(), $_POST['email']);
        $senha = md5($_POST['senha']);

        $sql = "SELECT * FROM usuario WHERE email='$email' AND senha='$senha'";
        $resultado = $conexao->executarConsulta($sql);

        if ($resultado->num_rows == 1) {
            $row = $resultado->fetch_assoc();
            $_SESSION['id_usuario'] = $row['id'];
            session_regenerate_id();
            
            $conexao->fecharConexao();
        } else {
            echo "Login inválido";
        }

        $conexao->fecharConexao();
    } else {
        echo "Campos de e-mail ou senha não estão definidos no formulário.";
    }
?>
