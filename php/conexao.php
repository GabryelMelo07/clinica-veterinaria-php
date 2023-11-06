<?php
class Conexao {
    private $host = 'localhost';
    private $usuario = 'root';
    private $senha = '';
    private $banco = 'agenda';
    private $conexao;
    public $error;

    public function __construct() {
        $this->conexao = new mysqli($this->host, $this->usuario, $this->senha, $this->banco);

        if ($this->conexao->connect_error) {
            die("Conexão falhou: " . $this->conexao->connect_error);
        }
    }

    public function getConexao() {
        return $this->conexao;
    }

    public function executarConsulta($sql) {
        $resultado = $this->conexao->query($sql);
        if ($resultado) {
            return $resultado;
        } else {
            $this->error = $this->conexao->error;
            return false;
        }
    }

    public function fecharConexao() {
        $this->conexao->close();
    }
}
?>
