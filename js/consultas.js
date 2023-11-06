class Consulta {
    constructor(id, id_usuario, idade, data, hora, motivo) {
        this.id = id;
        this.id_usuario = id_usuario;
        this.idade = idade;
        this.data = data;
        this.hora = hora;
        this.motivo = motivo;
    }
}

var myModal = new bootstrap.Modal(document.getElementById('form-consulta'));
var myModalConfirmarCancelamento = new bootstrap.Modal(document.getElementById('confirmar-exclusao-consulta'));

function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function formatarHora(hora) {
    console.log(hora);
    const horas = String(hora.getHours()).padStart(2, '0');
    const minutos = String(hora.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

function carregarConsultas() {
    $.ajax({
        url: './php/consultas.php',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#consultas-table > tbody > tr').remove();
            var tableBody = $('#consultas-table tbody');
            
            if (data.consultas.length === 0) {
                tableBody.append('<tr><td colspan="8">Não há nenhuma consulta agendada.</td></tr>');
            } else {
                data.consultas.forEach(function (consulta) {
                    var idUsuario = data.id_usuario;
                    
                    const consultaClass = new Consulta(
                        consulta.id,
                        consulta.id_usuario,
                        consulta.idade,
                        new Date(consulta.data),
                        consulta.hora,
                        consulta.motivo
                    );

                    const dataFormatada = formatarData(consultaClass.data);
                    
                    if (consultaClass.id_usuario === idUsuario) {
                        tableBody.append(`
                            <tr>
                                <td id="id-consulta">${consultaClass.id}</td>
                                <td>${consultaClass.id_usuario}</td>
                                <td>${consultaClass.idade}</td>
                                <td>${dataFormatada}</td>
                                <td>${consulta.hora}</td>
                                <td>${consultaClass.motivo}</td>
                                <td><button class="btn btn-warning btn-sm d-flex align-items-center gap-2" onclick="editarConsultaModal(${consultaClass.id})">Editar <i class='bx bx-edit' ></i></button></td>
                                <td><button class="btn btn-danger btn-sm d-flex align-items-center gap-2" onclick="cancelarConsulta(${consultaClass.id})">Cancelar <i class='bx bx-trash' ></i></button></td>
                            </tr>
                        `);
                    } else {
                        tableBody.append(`
                            <tr>
                                <td>${consultaClass.id}</td>
                                <td>${consultaClass.id_usuario}</td>
                                <td>${consultaClass.idade}</td>
                                <td>${dataFormatada}</td>
                                <td>${consulta.hora}</td>
                                <td>${consultaClass.motivo}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        `);
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

function agendarConsultaModal() { 
    var modalTitle = document.getElementById('modal-title-id');
    var form_consultaId = document.getElementById('consulta_id');
    form_consultaId.value = 0;
    modalTitle.textContent = 'Agendar nova consulta';
    myModal.show();
}

function editarConsultaModal(id) {
    var modalTitle = document.getElementById('modal-title-id');
    var form_consultaId = document.getElementById('consulta_id');
    form_consultaId.value = id;
    modalTitle.textContent = 'Editar consulta';

    $.ajax({
        url: './php/buscar_consulta.php',
        type: 'GET',
        dataType: 'json',
        data: "id=" + id,
        success: function (response) {
            $('#idade').val(response.idade);
            $('#data').val(response.data);
            $('#hora').val(response.hora);
            $('#motivo').val(response.motivo);
        },
        complete: function (response) {
            myModal.show();
        },
        error: function (response) {
            console.log('Erro:', response);
        }
    });
}

function validarDataHora() {
    var dataInput = $('#data').val();
    var horaInput = $('#hora').val();

    var dataSelecionada = new Date(dataInput + ' ' + horaInput);
    var dataAtual = new Date();

    if (dataSelecionada < dataAtual) {
        alert('Por favor, selecione uma data e hora futura para a consulta.');
        return false;
    }

    if (dataSelecionada.getDate() === dataAtual.getDate() && dataSelecionada.getHours() <= dataAtual.getHours()) {
        alert('Por favor, selecione uma hora futura para a consulta.');
        return false;
    }

    return true;
}

function enviarForm() {
    var form_consultaId = $('#consulta_id').val();
    var idade = $('#idade').val().trim();
    var data = $('#data').val().trim();
    var hora = $('#hora').val().trim();
    var motivo = $('#motivo').val().trim();

    if (idade.length === 0 || data.length === 0 || hora.length === 0 || motivo.length === 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (!validarDataHora()) {
        return;
    }

    var acao;
    if (form_consultaId == 0) {
        acao = 'POST';
    } else {
        acao = 'PUT';
    }

    $.ajax({
        url: './php/consulta_form.php',
        type: 'POST',
        dataType: 'json',
        data: {
            acao: acao,
            consulta_id: form_consultaId,
            idade: idade,
            data: data,
            hora: hora,
            motivo: motivo
        },
        success: function (response) {
            $('#idade').val('');
            $('#data').val('');
            $('#hora').val('');
            $('#motivo').val('');
            carregarConsultas();
        },
        complete: function () {
            myModal.hide();
        },
        error: function (response) {
            console.log('Erro:', response);
        }
    });
}

function cancelarAgendamento() {
    $('#idade').val('');
    $('#data').val('');
    $('#hora').val('');
    $('#motivo').val('');
    myModal.hide();
}

function cancelarConsulta(id) {
    myModalConfirmarCancelamento.show();

    $("#voltar-exclusao-btn").on('click', function (e) {
        myModalConfirmarCancelamento.hide();
    });

    $("#confirmar-exclusao-btn").on('click', function (e) {
        $.ajax({
            url: './php/cancelar_consulta.php',
            type: 'GET',
            dataType: 'json',
            data: "id=" + id,
            success: function (response) {
                carregarConsultas();
                myModalConfirmarCancelamento.hide();
            },
            error: function (response) {
                console.log('Erro:', response);
            }
        });
    });
}