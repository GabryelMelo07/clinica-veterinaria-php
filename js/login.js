$(document).ready(function () {
    $("#login-form").on('submit', function (e) {
        e.preventDefault();

        var email = $('#emailLogin').val();
        var senha = $('#senhaLogin').val();

        var formData = new FormData();
        formData.append("email", email);
        formData.append("senha", senha);

        $.ajax({
            url: './php/login.php',
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