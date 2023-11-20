//VARIAVEIS DE CONTROLE DO NOSSO JOGO

let perguntasFeitas = [];

//PERGUNTAS DO JOGO
const perguntas = [
    {
        pergunta: "Qual dessas linguagens NÃO é considerada uma linguagem de programação?",
        respostas: ["PHP","JavaScript","C++","HTML"],
        correta: "resp3"
    },
    {
        pergunta: "Em que ano o Brasil foi descoberto?",
        respostas: ["1498","1500","1375","1828"],
        correta: "resp1"
    },
    {
        pergunta: "O que significa a sigla HTML?",
        respostas: ["Hyper Tonto Maluco Legal","Hyper Text Markup Language","Hey Trade more language","Hyper text Market Language"],
        correta: "resp1"
    },
    {
        pergunta: "Qual dessas linguagens é considerada uma linguagem de marcação?",
        respostas: ["HTML","JavaScript","C++","PHP"],
        correta: "resp0"
    },
    {
        pergunta: "O que significa a sigla CSS?",
        respostas: ["Cascading Still Sheets","Cozinha Sem Sal","Cascading Style Sheets","Castanha Sem Sabor"],
        correta: "resp2"
    }
]

var qtdPerguntas = perguntas.length - 1;

gerarPerguntas(qtdPerguntas)

function gerarPerguntas(maxPerguntas){
    //GERAR UM NÚMERO ALEATORIO
    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);

    console.log('a pergunta sorteada foi a ' + aleatorio);

    //VERIFICAR SE A PERGUNTA JÁ FOI FEITA
    if(!perguntasFeitas.includes(aleatorio)){
        //COLOCAR COMO PERGUNTA FEITA
        perguntasFeitas.push(aleatorio);

        //PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice',aleatorio);

        //COLOCAR AS RESPOSTA

        for (var i = 0; i < 4; i++){
            $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
        }


        var pai = $("#respostas");
        var botoes = pai.children();

        for(var i = 1; i < botoes.length; i++){
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    }else{
        //SE A PERGUNTA JÁ FOI FEITA
        console.log('A pergunta já foi feita. Sorteando novamente...');
        if (perguntasFeitas.length < qtdPerguntas + 1){
            return gerarPerguntas(maxPerguntas);
        }else{
            console.log('Acabaram as perguntas!');

            $('#quiz').addClass('oculto');
            $('#mensagem').html('Parabéns você venceu. Acertou todas as perguntas!');
            $('#status').removeClass('oculto');
        }
    }
}

$('.resposta').click(function(){
    if($('#quiz').attr('data-status')!=='travado'){
    //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    resetaBotoes();

    //ADICIONAR A CLASSE SELECIONADA
    $(this).addClass('selecionada');
    }
});


$("#confirm").click(function(){
    //PEGAR O INDICE DA PERGUNTA
    var indice = $("#pergunta").attr('data-indice');

    //QUAL É A RESPOSTA CERTA
    var respCerta = perguntas[indice].correta;

    //QUAL FOI A RESPOSTA QUE O USUÁRIO SELECIONOU
    $('.resposta').each(function(){
        if ($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id');
            
            if (respCerta == respostaEscolhida){
                console.log('Aceeeertou Miseraveeee!');
                proximaPergunta();
            }else{
                console.log('Erroooou!')
                $("#quiz").attr('data-status','travado');
                $("#confirm").addClass('oculto');
                $('#'+respCerta).addClass('correta');
                $('#'+respostaEscolhida).removeClass('selecionada');
                $('#'+respostaEscolhida).addClass('errada');
                setTimeout(function(){
                    gameOver();
                },4000);
            }
        
        }


    })

});

function newGame(){
    $("#confirm").removeClass('oculto');
    $("#quiz").attr('data-status','ok');
    perguntasFeitas = [];
    resetaBotoes();
    gerarPerguntas(qtdPerguntas);
    $('#quiz').removeClass('oculto');
    $('#status').addClass('oculto');
}

function proximaPergunta(){
    resetaBotoes();
    gerarPerguntas(qtdPerguntas);
}

function resetaBotoes(){
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            $(this).removeClass('selecionada')
        }
        if($(this).hasClass('correta')){
            $(this).removeClass('correta')
        }
        if($(this).hasClass('errada')){
            $(this).removeClass('errada')
        }
    });
}

function gameOver(){
    $('#quiz').addClass('oculto');
    $('#mensagem').html('Game Over!');
    $('#status').removeClass('oculto');

}

$('#novoJogo').click(function(){
    newGame();
});