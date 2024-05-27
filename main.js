const form = document.getElementById('form-agenda');
const contato = [];
const telefone = [];

let linhas = '';

const inputTelefone = document.getElementById('num-telefone');
inputTelefone.addEventListener('blur', mascaraDeTelefone);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    adicionarLinha();
    atualizarTabela();
    atualizarContato();
});

function adicionarLinha() {
    const inputNomeContato = document.getElementById('nome-contato');

    if (contato.includes(inputNomeContato.value)) {
        alert(`O contato "${inputNomeContato.value}" já foi inserido.`);
    } else {
        contato.push(inputNomeContato.value);
        telefone.push(inputTelefone.value);

        let linha = '<tr>';
        linha += `<td>${inputNomeContato.value}</td>`;
        linha += `<td>${inputTelefone.value}</td>`;
        linha += '</tr>';

        linhas += linha;
    }

    inputNomeContato.value = '';
    inputTelefone.value = '';
}

function atualizarTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizarContato() {
    const total = somaContato();

    document.getElementById('total-contato').innerHTML = total;

}

function somaContato() {
    let totalContatos = contato.length;
    return totalContatos;
}

function mascaraDeTelefone() {
    const celular = document.getElementById("num-telefone");

    celular.addEventListener("input", () => {
        // Remover os caracteres não numéricos usando a expressão regular /\D/g e limitar a 11 dígitos.
        const limparValor = celular.value.replace(/\D/g, "").substring(0, 11);

        // Dividir a string em um array de caracteres individuais.
        const numeriArray = limparValor.split("");

        // Criar a variável para receber o número formatado.
        let numeroFormatado = "";

        if (numeriArray.length > 0) {
            numeroFormatado += `(${numeriArray.slice(0, 2).join("")})`;
        }

        if (numeriArray.length > 2) {
            numeroFormatado += ` ${numeriArray.slice(2, 7).join("")}`;
        }

        if (numeriArray.length > 7) {
            numeroFormatado += `- ${numeriArray.slice(7, 11).join("")}`;
        }

        // Enviar para o campo o número formatado.
        celular.value = numeroFormatado;
    });
}

