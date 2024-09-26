//variável que armazena a chamada da função timerout
var timerId = null; 

function iniciarJogo(){

var url = window.location.search;

var nivel_jogo = url.replace("?", "");

var tempo_segundos = 0;

if(nivel_jogo == 1)  {//Easy -> 120 segundos
    tempo_segundos = 120;
}
if(nivel_jogo == 2)  {//Medium -> 60 Segundos
    tempo_segundos = 60;
}
if(nivel_jogo == 3)  {//Herd -> Segungos
    tempo_segundos = 30;
}

//inserindo segundos no span
document.getElementById('cronometro').innerHTML = tempo_segundos;

// Quantidade de balões

var quantidade_baloes = 80;

criar_baloes(quantidade_baloes);

//imprimir quantidade de balões inteiros
document.getElementById('baloes_inteiros').innerHTML = quantidade_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

contagem_tempo(tempo_segundos + 1)

}

function contagem_tempo(segundos){

    segundos = segundos -1;
    if(segundos== -1){
        clearTimeout(timerId); //para a execução da função do settimeout
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

   timerId = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function game_over(){
    alert('Fim de jogo, O trouxa não estourou os balões a tempo, HAHAHA!!!');
}

function criar_baloes(quantidade_baloes){

    for(var i = 1; i <= quantidade_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'img/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' + i;
        balao.onclick = function(){estourar(this);};

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){

    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'img/balao_azul_pequeno_estourado.png';

    pontuacao(-1);

}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt (baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Parabéns, Você é demais!!!');
        parar_game();
    }
}

function parar_game(){
    clearTimeout(timerId);
}