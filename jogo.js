//variável que armazena a chamada da função timerout
let timerId = null; 

function iniciarJogo() {
    const url = globalThis.location.search;
    const nivel_jogo = url.replace("?", "");

    let tempo_segundos = 0;
    let quantidade_baloes;

    if (nivel_jogo == 1) { // Easy
        tempo_segundos = 120;
        quantidade_baloes = 60;
    } else if (nivel_jogo == 2) { // Medium
        tempo_segundos = 60;
        quantidade_baloes = 80;
    } else if (nivel_jogo == 3) { // Hard Core
        tempo_segundos = 30;
        quantidade_baloes = 100;
    }

    document.getElementById('cronometro').innerHTML = tempo_segundos;
    criar_baloes(quantidade_baloes);

    document.getElementById('baloes_inteiros').innerHTML = quantidade_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);
}

function contagem_tempo(segundos) {
    segundos = segundos - 1;

    if (segundos == -1) {
        clearTimeout(timerId);
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout(() => contagem_tempo(segundos), 1000);
}

function game_over() {
    remove_eventos_baloes();
    alert('Fim de jogo! Você não conseguiu estourar todos os balões a tempo.');
}

function criar_baloes(quantidade_baloes) {
    const cenario = document.getElementById('cenario');
    for (let i = 1; i <= quantidade_baloes; i++) {
        const balao = document.createElement("img");
        balao.src = 'img/balao_azul_pequeno.png';
        balao.className = 'w-12 h-16 object-contain m-2 hover:scale-110 transition-transform cursor-pointer';
        balao.id = 'b' + i;
        balao.alt = 'Balão azul inteiro';
        balao.onclick = function () { estourar(this); };

        cenario.appendChild(balao);
    }
}

function estourar(e) {
    const id_balao = e.id;
    const element = document.getElementById(id_balao);
    
    element.setAttribute("onclick", "");
    element.src = 'img/balao_azul_pequeno_estourado.png';
    element.alt = 'Balão azul estourado';
    element.classList.add('opacity-50', 'grayscale-[0.5]');

    pontuacao(-1);
}

function pontuacao(acao) {
    let baloes_inteiros = Number.parseInt(document.getElementById('baloes_inteiros').innerHTML);
    let baloes_estourados = Number.parseInt(document.getElementById('baloes_estourados').innerHTML);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
    if (baloes_inteiros == 0) {
        parar_game();
    }
}

function parar_game() {
    clearTimeout(timerId);
}

function remove_eventos_baloes() {
    let i = 1;  //contado para recuperar balões por id //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
        //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}