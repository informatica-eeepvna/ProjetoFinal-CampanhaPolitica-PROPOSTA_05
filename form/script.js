import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, push, get, update, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_czM4CzjX8EqMdluGslbR13UfTIOOOys",
    authDomain: "arthur-schultz.firebaseapp.com",
    projectId: "arthur-schultz",
    storageBucket: "arthur-schultz.appspot.com",
    messagingSenderId: "273634896292",
    appId: "1:273634896292:web:0654cd33669194ded4b931",
    measurementId: "G-C5G4446HG9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

function exibirPerfil(user) {
    document.getElementById("useremail").textContent = user.email;
    const userRef = ref(db, 'users/' + user.uid);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            console.log("userData:", userData); // Verificar se os dados do usuário estão sendo obtidos corretamente
            if (userData && userData.nome) {
                document.getElementById("username").textContent = userData.nome;
            } else {
                console.error("Nome de usuário não encontrado.");
            }
        } else {
            console.error("Dados do usuário não encontrados.");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function verificarAutenticacao() {
    const user = auth.currentUser;
    if (user) {
        document.querySelectorAll('.input-group').forEach((element) => {
            element.style.display = 'block';
        });
        document.getElementById('loginModal').style.display = "none";
    } else {
        const modal = document.getElementById('loginModal');
        modal.style.display = "flex";

        const closeButton = document.querySelector('.close');
        closeButton.onclick = function () {
            modal.style.display = "none";
        };
    }
}
// Seleciona todos os elementos com a classe "close"
document.querySelectorAll('.close').forEach((closeButton) => {
    // Adiciona um event listener a cada botão de fechar
    closeButton.addEventListener('click', function () {
        // Encontra o elemento pai (o modal) e oculta-o
        closeButton.closest('.modal').style.display = "none";
    });
});

document.getElementById("verificarAutenticacao").addEventListener("click", verificarAutenticacao);

document.addEventListener("DOMContentLoaded", function () {
    // Verificar o estado de autenticação ao carregar a página
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Se o usuário estiver logado, exibir perfil e apoiadores
            exibirPerfil(user);
            verificarAutenticacao(); // Adiciona a chamada para verificarAutenticacao() aqui
            exibirApoiadores();
        } else {
            // Se o usuário não estiver logado, exibir modal de login
            const modal = document.getElementById('loginModal');
            modal.style.display = "flex";
        }
    });
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            document.getElementById('loginModal').style.display = "none";
        })
        .catch((error) => {
            console.error(error.message);
            alert("Erro ao fazer login. Por favor, verifique suas credenciais.");
        });
});

document.getElementById("verificarAutenticacao").addEventListener("click", cadastrarApoiador);

function limparCamposCadastro() {
    document.getElementById('nome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('data-nascimento').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('tipo').value = '';
}

function cadastrarApoiador() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const cidade = document.getElementById('cidade').value;
    const tipo = document.getElementById('tipo').value;

    console.log("Dados do apoiador:", nome, cpf, dataNascimento, cidade, tipo); // Verificar se os dados estão sendo corretamente obtidos

    if (nome && cpf && dataNascimento && cidade && tipo) {
        const apoiadoresRef = ref(db, 'apoiadores');
        push(apoiadoresRef, {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cidade: cidade,
            tipo: tipo
        }).then(() => {
            alert('Apoiador cadastrado com sucesso!');
            // Limpar os campos de entrada após o cadastro bem-sucedido
            limparCamposCadastro();
            // Após cadastrar, exibir novamente os apoiadores
            exibirApoiadores();
        }).catch((error) => {
            console.error('Erro ao cadastrar apoiador:', error);
        });
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

document.getElementById("logout-link").addEventListener("click", function () {
    signOut(auth).then(() => {
        // Remover o nome de usuário do localStorage, se necessário
        window.location.reload();
    }).catch((error) => {
        console.error(error);
    });
});

function exibirApoiadores() {
    const apoiadoresRef = ref(db, 'apoiadores');
    get(apoiadoresRef).then((snapshot) => {
        if (snapshot.exists()) {
            const apoiadoresData = snapshot.val();
            const apoiadoresList = document.getElementById("apoiadores-list");
            // Limpar a lista antes de adicionar os novos apoiadores
            apoiadoresList.innerHTML = "";
            // Iterar sobre os dados dos apoiadores e adicioná-los à lista
            Object.keys(apoiadoresData).forEach((key) => {
                const apoiador = apoiadoresData[key];
                const listItem = document.createElement("li");
                const apoiadorInfo = document.createElement("div");
                const nome = document.createElement("div");
                const cpf = document.createElement("div");
                const dataNascimento = document.createElement("div");
                const cidade = document.createElement("div");
                const tipo = document.createElement("div");

                nome.textContent = `Nome: ${apoiador.nome}`;
                cpf.textContent = `CPF: ${apoiador.cpf}`;
                dataNascimento.textContent = `Data de Nascimento: ${apoiador.dataNascimento}`;
                cidade.textContent = `Cidade: ${apoiador.cidade}`;
                tipo.textContent = `Tipo de Apoiador: ${apoiador.tipo}`;

                apoiadorInfo.appendChild(nome);
                apoiadorInfo.appendChild(cpf);
                apoiadorInfo.appendChild(dataNascimento);
                apoiadorInfo.appendChild(cidade);
                apoiadorInfo.appendChild(tipo);

                const editarButton = document.createElement("button");
                editarButton.textContent = "Editar";
                editarButton.classList.add("btn-editar-apoiador");
                editarButton.onclick = function () {
                    abrirModalEdicao(apoiador, key);
                };

                const excluirButton = document.createElement("button");
                excluirButton.textContent = "Excluir";
                excluirButton.classList.add("btn-excluir-apoiador");
                excluirButton.onclick = function () {
                    excluirApoiador(key);
                    
                };

                listItem.appendChild(apoiadorInfo);
                listItem.appendChild(editarButton);
                listItem.appendChild(excluirButton);
                listItem.classList.add("apoiador-item");
                apoiadoresList.appendChild(listItem);
            });
        } else {
            console.log("Nenhum apoiador cadastrado.");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function abrirModalEdicao(apoiador, key) {
    document.getElementById('edit-key').value = key;
    document.getElementById('edit-nome').value = apoiador.nome;
    document.getElementById('edit-cpf').value = apoiador.cpf;
    document.getElementById('edit-data-nascimento').value = apoiador.dataNascimento;
    document.getElementById('edit-cidade').value = apoiador.cidade;
    document.getElementById('edit-tipo').value = apoiador.tipo;
    document.getElementById('modalEditarApoiador').style.display = "flex";
}

// Adiciona o evento de clique ao botão de salvar
document.getElementById('btnSalvarEdicaoApoiador').addEventListener('click', salvarEdicaoApoiador);

function salvarEdicaoApoiador() {
    const key = document.getElementById('edit-key').value;
    const nome = document.getElementById('edit-nome').value;
    const cpf = document.getElementById('edit-cpf').value;
    const dataNascimento = document.getElementById('edit-data-nascimento').value;
    const cidade = document.getElementById('edit-cidade').value;
    const tipo = document.getElementById('edit-tipo').value;

    const apoiadorRef = ref(db, `apoiadores/${key}`);
    update(apoiadorRef, {
        nome: nome,
        cpf: cpf,
        dataNascimento: dataNascimento,
        cidade: cidade,
        tipo: tipo
    }).then(() => {
        alert('Apoiador atualizado com sucesso!');
        document.getElementById('modalEditarApoiador').style.display = "none";
        exibirApoiadores();
    }).catch((error) => {
        console.error('Erro ao atualizar apoiador:', error);
    });
}

function excluirApoiador(key) {
    const apoiadorRef = ref(db, `apoiadores/${key}`);
    remove(apoiadorRef).then(() => {
        alert('Apoiador excluído com sucesso!');
        // Recarregar a página
        window.location.reload();
    }).catch((error) => {
        console.error('Erro ao excluir apoiador:', error);
    });
}
