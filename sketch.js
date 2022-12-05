var soloSprite, soloImagem;
var trexSprite, trexAnimacao;
var nuvemImagem, nuvemSprite;


var o1, o2, o3, o4, o5, o6;

//criar as variáveis JOGAR, FIM, estadoJogo;
var JOGAR = 1;
var FIM = 0;
var estadoJogo = JOGAR;

//criar as variáveis para os grupos de nuvens e cactos; 
var grupoCactos, grupoNuvens;

function preload() {
    soloImagem = loadImage("solo.png");
    trexAnimacao = loadAnimation("trex1.png","trex2.png","trex3.png");
    nuvemImagem = loadImage("nuvem.png");

    o1 = loadImage("obstaculo1.png");
    o2 = loadImage("obstaculo2.png");
    o3 = loadImage("obstaculo3.png");
    o4 = loadImage("obstaculo4.png");
    o5 = loadImage("obstaculo5.png");
    o6 = loadImage("obstaculo6.png");

}


function setup() {
    createCanvas(600, 200);
    
    soloSprite = createSprite(300, 180, 300, 40);
    soloSprite.addImage(soloImagem);
    soloSprite.velocityX = -3;

    trexSprite = createSprite(50,170,50,50);
    trexSprite.addAnimation("correndo",trexAnimacao);
    trexSprite.scale = 0.5;


    grupoCactos = new Group();
    grupoNuvens = new Group();


}

var aleatorio = 0;
function draw() {
    background("white");
    //caso o estado de jogo seja igual a jogar
    if(estadoJogo === JOGAR){
        //os comandos entre as chaves do if serão lidos
        console.log("JOGO");
        soloSprite.velocityX = -3;

        if(trexSprite.isTouching(grupoCactos)){
            //muda o estado de jogo para FIM
            estadoJogo = FIM;
        }
    }
    //verifica se o estado de jogo é fim
    if(estadoJogo === FIM){
        //condição acima for cumprida, lê os comandos a seguir
        soloSprite.velocityX = 0;
        console.log("FIM DE JOGO");

    }
    //verifica se o solo saiu da tela
    if(soloSprite.x < 0 ){
        //caso a condição seja cumprida, o solo volta ao meio
        soloSprite.x = 300;
    }
    //vê se a pessoa aperte espaço
    if(keyDown("space")){
        //caso a condição seja cumprida, o trex pula
        trexSprite.velocityY = -10;
    }
    
    //dá gravidade para o trex
    trexSprite.velocityY += 0.8;

    //manda o trex colidir com o solo
    trexSprite.collide(soloSprite);

    //cria as sprites de cactos e nuvens
    gerarCactos();
    criarNuvens();

    drawSprites();
}

function criarNuvens(){
    if(frameCount % 30 == 0){
        aleatorio = Math.round(random(0,100));
        nuvemSprite = createSprite(600,aleatorio);
        nuvemSprite.addImage(nuvemImagem);
        nuvemSprite.velocityX = -3;
        nuvemSprite.scale = 0.5;
        trexSprite.depth = nuvemSprite.depth + 1;
        nuvemSprite.lifetime = 250;
        grupoNuvens.add(nuvemSprite)

    };
}
var a = 0;
function gerarCactos(){
    if(frameCount % 60 == 0){
        a = Math.round(random(1,6));
        cactoSprite = createSprite(600, 170);
        cactoSprite.velocityX = -3;
        cactoSprite.scale = 0.5;
        
        switch (a) {
            case 1:
                cactoSprite.addImage(o1);
                break;
            case 2:
                cactoSprite.addImage(o2);      
            case 3:
                cactoSprite.addImage(o3);                      
            case 4:
                cactoSprite.addImage(o4);
                break;
            case 5:
                cactoSprite.addImage(o5);      
            case 6:
                cactoSprite.addImage(o6);                    
            default:
                break;
        }
        
        cactoSprite.lifetime = 250;
        //é aqui que adiciona as sprites dos cactos no grupo
        grupoCactos.add(cactoSprite)
    }   
}