// Formulário de contato — Lençóis Cristalinos
// Só avisa quando algum campo está vazio. Em caso de falha no envio, não mostra erro:
// os dados continuam preenchidos para a pessoa tentar de novo.
// Requer o jQuery carregado antes deste arquivo (ver contato.html).

$(function () {
    var $form = $('#form-contato');

    if ($form.length === 0) return;

    var $status = $('#form-status');
    var $botao = $form.find('button[type="submit"]');
    var $contador = $('#contador');
    var textoOriginalBotao = $botao.text();

    var CAMPOS = ['nome', 'email', 'assunto', 'mensagem'];

    var ROTULOS = {
        nome: 'Nome',
        email: 'E-mail',
        assunto: 'Assunto',
        mensagem: 'Mensagem'
    };

    function valorDe(campo) {
        return $form.find('[name="' + campo + '"]').val().trim();
    }

    function mostrarStatus(tipo, texto) {
        $status.attr('class', 'form-status ' + tipo).text(texto);
    }

    function atualizarContador() {
        $contador.text(
            $form.find('[name="mensagem"]').val().length + ' / 2000'
        );
    }

    function campoVazio() {
        for (var i = 0; i < CAMPOS.length; i++) {
            if (valorDe(CAMPOS[i]) === '') {
                return CAMPOS[i];
            }
        }

        return null;
    }

    // Remove o destaque ao digitar
    $form.on('input', 'input, textarea', function () {
        $(this).removeClass('invalido');

        if (this.name === 'mensagem') {
            atualizarContador();
        }
    });

    // Envio do formulário
    $form.on('submit', function (e) {
        e.preventDefault();

        $form.find('.invalido').removeClass('invalido');

        var vazio = campoVazio();

        if (vazio) {
            mostrarStatus(
                'erro',
                'Preencha o campo ' + ROTULOS[vazio] + '.'
            );

            $form.find('[name="' + vazio + '"]').addClass('invalido').focus();
            return;
        }

        var dados = {
            nome: valorDe('nome'),
            email: valorDe('email'),
            assunto: valorDe('assunto'),
            mensagem: valorDe('mensagem'),
            website: $form.find('[name="website"]').val()
        };

        $botao.prop('disabled', true).text('Enviando...');
        mostrarStatus('enviando', 'Enviando sua mensagem...');

        $.ajax({
            url: '/api/contato',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dados),
            dataType: 'json',
            timeout: 10000
        })

        // SE O ENVIO DER CERTO
        .done(function () {
            $form[0].reset();
            atualizarContador();

            // Abre o pop-up azul e branco
            $('#popup-sucesso').css('display', 'flex');

            $botao.prop('disabled', false)
                  .text(textoOriginalBotao);
        })

        // SE O ENVIO FALHAR
        .fail(function (xhr, textStatus) {
            console.error(
                'Falha no envio:',
                textStatus,
                xhr.status,
                xhr.responseText
            );

            mostrarStatus('', '');

            $botao.prop('disabled', false)
                  .text(textoOriginalBotao);
        });
    });

    // Botão CONTINUAR do pop-up
    $('#popup-continuar').on('click', function () {
        $('#popup-sucesso').fadeOut(200, function () {
            window.location.href = 'vlw.html';
        });
    });

    atualizarContador();
});