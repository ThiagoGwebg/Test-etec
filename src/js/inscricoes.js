let inscricoes = getData("inscricoes");
let usuarios = getData("usuarios");
let eventos = getData("eventos");

function carregarSelects() {
    const selectUsuario = document.getElementById('select-usuario');
    const selectEvento = document.getElementById('select-evento');

    // Limpa as opções anteriores (mantém a primeira opção padrão)
    selectUsuario.innerHTML = '<option value="" disabled selected>Selecione um Usuário</option>';
    selectEvento.innerHTML = '<option value="" disabled selected>Selecione um Evento</option>';

    usuarios.forEach((u, i) => {
        selectUsuario.innerHTML += `<option value="${i}">${u.nome} - ${u.email}</option>`;
    });

    eventos.forEach((e, i) => {
        let dataFormatada = "";
        if (e.data) {
            dataFormatada = e.data.split('-').reverse().join('/');
        }
        selectEvento.innerHTML += `<option value="${i}">${e.titulo} - ${dataFormatada}</option>`;
    });
};

function render() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    inscricoes.forEach((insc, i) => {
        lista.innerHTML += `
            <div>
                <p><strong>Usuário:</strong> ${insc.usuario} - ${insc.email}</p>
                <p><strong>Evento:</strong> ${insc.evento} - ${insc.data}</p>
                <button onclick="remover(${i})">X</button>
            </div>
        `;
    });
};

function remover(i) {
    inscricoes.splice(i, 1);
    saveData("inscricoes", inscricoes);
    render();
};

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();
    const usuarioIndex = document.getElementById("select-usuario").value;
    const eventoIndex = document.getElementById("select-evento").value;

    const usuario = usuarios[usuarioIndex].nome;
    const email = usuarios[usuarioIndex].email;
    const evento = eventos[eventoIndex].titulo;
    let data = "";
    if (eventos[eventoIndex].data) {
        data = eventos[eventoIndex].data.split('-').reverse().join('/');
    }

    inscricoes.push({ usuario, email, evento, data });
    saveData("inscricoes", inscricoes);

    e.target.reset();
    render();
});

render();
carregarSelects();

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
};

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};
