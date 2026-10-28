document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('form-contato');
    const popup = document.getElementById('popup-sucesso');
    const botaoContinuar = document.getElementById('popup-continuar');
    const campoNome = document.getElementById('nome');
    const campoEmail = document.getElementById('email');
    const campoAssunto = document.getElementById('assunto');
    const campoMensagem = document.getElementById('mensagem');
    const contador = document.getElementById('contador');
    const status = document.getElementById('form-status');

    // Atualiza o contador da mensagem
    campoMensagem.addEventListener('input', function () {
        contador.textContent = campoMensagem.value.length + ' / 2000';
    });

    // Valida o formulário antes de mostrar o pop-up
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        const campos = [
            campoNome,
            campoEmail,
            campoAssunto,
            campoMensagem
        ];

        // Limpa os avisos anteriores
        campos.forEach(function (campo) {
            campo.classList.remove('invalido');
        });

        status.textContent = '';
        status.className = 'form-status';

        // Todos os campos precisam estar preenchidos
        const campoVazio = campos.find(function (campo) {
            return campo.value.trim() === '';
        });

        if (campoVazio) {
            campoVazio.classList.add('invalido');
            status.textContent = 'Preencha todos os campos antes de continuar.';
            status.classList.add('erro');
            campoVazio.focus();
            return;
        }

        // Confere o tamanho mínimo das informações
        if (campoNome.value.trim().length < 2) {
            status.textContent = 'Digite um nome com pelo menos 2 caracteres.';
            status.classList.add('erro');
            campoNome.classList.add('invalido');
            campoNome.focus();
            return;
        }

        if (campoAssunto.value.trim().length < 3) {
            status.textContent = 'O assunto precisa ter pelo menos 3 caracteres.';
            status.classList.add('erro');
            campoAssunto.classList.add('invalido');
            campoAssunto.focus();
            return;
        }

        if (campoMensagem.value.trim().length < 10) {
            status.textContent = 'A mensagem precisa ter pelo menos 10 caracteres.';
            status.classList.add('erro');
            campoMensagem.classList.add('invalido');
            campoMensagem.focus();
            return;
        }

        // Confere se o e-mail tem um formato válido
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
            campoEmail.value.trim()
        );

        if (!emailValido) {
            status.textContent = 'Digite um endereço de e-mail válido.';
            status.classList.add('erro');
            campoEmail.classList.add('invalido');
            campoEmail.focus();
            return;
        }

        // Só chega aqui se todas as validações passarem
        popup.style.display = 'flex';
        botaoContinuar.focus();
    });

    // Continuar leva diretamente para a página inicial
    botaoContinuar.addEventListener('click', function () {
        window.location.href = './index.html';
    });
});