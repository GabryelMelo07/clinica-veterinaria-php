$(document).ready(function () {
    $("#cadastro-form").on('submit', function (e) {
        e.preventDefault();
        
        var nome = $('#nomeCadastro').val();
        var email = $('#emailCadastro').val();
        var senha = $('#senhaCadastro').val();
        
        var formData = new FormData();
        formData.append("nome", nome);
        formData.append("email", email);
        formData.append("senha", senha);
        
        $.ajax({
            url: './php/cadastro.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                window.location.href = "consultas.html";
            },
            error: function (response) {
                console.log('Erro:', response);
            }
        });
    });
});