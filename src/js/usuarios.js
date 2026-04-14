let usuarios = getData("usuarios");

function render() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    usuarios.forEach((u, i) => {
        lista.innerHTML += `
            <div>
                ${u.nome} - ${u.email}
                <button onclick="remover(${i})">X</button>
            </div>
        `;
    });
};

function remover(i) {
    usuarios.splice(i, 1);
    saveData("usuarios", usuarios);
    render();

};

document.getElementById("form").addEventListener("submit", e => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    usuarios.push({ nome, email });
    saveData("usuarios", usuarios);

    e.target.reset();
    render();
});

render();


function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
};

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};