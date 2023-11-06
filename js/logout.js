function logout() {
    $.ajax({
        url: './php/logout.php',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                window.location.href = 'index.html';
            } else {
                console.error('Erro ao remover variável: ' + response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Erro na requisição AJAX: ' + error);
        }
    });
}