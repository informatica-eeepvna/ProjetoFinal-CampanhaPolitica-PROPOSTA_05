let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        return item.numero === numero;
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = 'Nome: ' + candidato.nome + '<br/>' + 'Partido: ' + candidato.partido;

        let fotosHTML = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += '<div class="d-1-image small"> <img src="Images/' + candidato.fotos[i].url + '" alt="" />' + candidato.fotos[i].legenda + '</div>';
            } else {
                fotosHTML += '<div class="d-1-image"> <img src="Images/' + candidato.fotos[i].url + '" alt="" />' + candidato.fotos[i].legenda + '</div>';
            }
        }

        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let somNumeros = new Audio("audios/numeros.mp3");
    somNumeros.play();

    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = numero + n;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige() {
    let somCorrige = new Audio("audios/corrige.mp3");
    somCorrige.play();
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    let somConfirma = new Audio("audios/confirma.mp3");

    if (votoBranco === true) {
        votoConfirmado = true;
        somConfirma.play();

        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });

        // Armazena o voto no sessionStorage com prefixo
        let votosBrancos = sessionStorage.getItem('voto_branco') || 0;
        sessionStorage.setItem('voto_branco', parseInt(votosBrancos) + 1);
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        somConfirma.play();

        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });

        // Armazena o voto no sessionStorage com prefixo
        let votosCandidato = sessionStorage.getItem('voto_' + numero) || 0;
        sessionStorage.setItem('voto_' + numero, parseInt(votosCandidato) + 1);
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
            resultado(); // Chama a função resultado() após a última etapa
        }
    }
}

function resultado() {
    let resultadoContainer = document.getElementById("resultado");
    resultadoContainer.innerHTML = "";

    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        if (key.startsWith('voto_')) {
            let value = sessionStorage.getItem(key);
            let candidato = key.replace('voto_', 'Candidato ');
            resultadoContainer.innerHTML += `${candidato} tem ${value} votos<br/>`;
        }
    }
}

// Adiciona o event listener para o botão de resultado
document.querySelector('.verde').addEventListener('click', resultado);
