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

var quantidade_baloes = 30;

criar_baloes(quantidade_baloes);

//imprimir quantidade de balões inteiros
document.getElementById('baloes_inteiros').innerHTML = quantidade_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

}

function criar_baloes(quantidade_baloes){

    for(var i = 1; i <= quantidade_baloes; i++){
        var balao = document.createElement("img");
        balao.src = 'img/balao_azul_pequeno.png';
        balao.style.margin = '10px';

        document.getElementById('cenario').appendChild(balao);
    }
}