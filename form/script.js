import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
        import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
                    document.getElementById("username").textContent = userData.nome;
                }
            }).catch((error) => {
                console.error(error);
            });
        }

        function verificarAutenticacao() {
            const user = auth.currentUser;
            if (user) {
                cadastrarApoiador();
            } else {
                const modal = document.getElementById('loginModal');
                modal.style.display = "flex";

                const closeButton = document.querySelector('.close');
                closeButton.onclick = function () {
                    modal.style.display = "none";
                };
            }
        }

        document.getElementById("verificarAutenticacao").addEventListener("click", verificarAutenticacao);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                exibirPerfil(user);
                document.querySelectorAll('.input-group').forEach((element) => {
                    element.style.display = 'block';
                });
            } else {
                const modal = document.getElementById('loginModal');
                modal.style.display = "flex";
            }
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

        function cadastrarApoiador() {
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const dataNascimento = document.getElementById('data-nascimento').value;
            const cidade = document.getElementById('cidade').value;
            const tipo = document.getElementById('tipo').value;

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
            }).catch((error) => {
                console.error(error);
            });
        });