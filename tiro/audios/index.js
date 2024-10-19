const canvas = document.querySelector("#tela");
const ctx = canvas.getContext("2d");

let GameOverStatus = false

/*----------------------------------------- AJUSTANDO NA TELA  -------------------------------------*/

canvas.width = 1024;
canvas.height = 576;

function tela() {
  j1.position.x = 0;
  j1.position.y = 0;
  j1Gol.position.x = 0;
  j1Gol.position.y = canvas.height - j1Gol.height;
  j2.position.x = canvas.width - j2.width;
  j2.position.y = 0;
  j2Gol.position.x = canvas.width - j2Gol.width;
  j2Gol.position.y = canvas.height - j2Gol.height;
  bola.position.y = 0;
  fundo.width = canvas.width;
  fundo.height = canvas.height;
}

//gravidade
const gravidade = 0.5;

const altChao = canvas.height / 17;

/*--------------------------------------------- iNFORMAÇÕES -------------------------------------------*/
const jogo = {
  gameOver: false,
  darkMode: false,
};

//jogador 1

const j1 = new Player({
  height: 70,
  width: 70,
  position: {
    x: 0,
    y: 0,
  },
  direcao: {
    direita: false,
    esquerda: false,
  },
  velocidade: {
    x: 2.5,
    y: 0,
  },
  sprite: {
    imagemSrc: "dogArt/1 Dog/Idle.png",
    spriteMax: 4,
    spriteAtual: 0,
    delay: 0,
  },
  inverter: false,
});

//CPU

const j2 = new Player({
  height: 70,
  width: 70,
  position: {
    x: canvas.width - 93,
    y: 0,
  },
  direcao: {
    direita: false,
    esquerda: false,
  },
  velocidade: {
    x: 1.7,
    y: 0,
  },
  sprite: {
    imagemSrc: "dogArt/2 Dog 2/Idle.png",
    spriteMax: 4,
    spriteAtual: 0,
    delay: 0,
  },
  inverter: true,
});

//Bola

const bola = new Bola({
  raio: 12,
  vel: 3,
  color: "#fff",
  position: {
    x: canvas.width / 2,
    y: 50,
  },
  direcao: {
    direita: false,
    esquerda: false,
  },
  velocidade: {
    x: 0,
    y: 0,
  },
});

//Gol 1

const j1Gol = {
  height: 200,
  width: 10,
  position: {
    x: 0,
    y: canvas.height - 200,
  },
};

//Gol 2

const j2Gol = {
  height: 200,
  width: 10,
  position: {
    x: canvas.width - 10,
    y: canvas.height - 200,
  },
};

//Placar

const placar = new Placar({
  point1: 0,
  point2: 0,
});

const background = new Image();

// mapa 1
background.src = "fundo/PREVIEWS/padrao.png";

// mapa 2
// background.src = "fundo/PREVIEWS/gelo.png";
const grama = new Image();
grama.src = "fundo/PNG/Hills Layer 05.png";

/*------------------------------------------ ANIMANDO o JOGO -------------------------------------------*/

function draw() {
  if(GameOverStatus)return
  // fundo
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  if (jogo.darkMode) {
    ctx.fillStyle = "rgba(0,0,0,.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Jogador 1
  j1.update();

  // Jogador 2
  cpu();// define a movimentação da cpu
  j2.update();

  // bola
  bola.update();
  // gol
  ctx.fillStyle = "#b5b5b5";
  ctx.fillRect(j1Gol.position.x, j1Gol.position.y, j1Gol.width, j1Gol.height);
  ctx.fillRect(j2Gol.position.x, j2Gol.position.y, j2Gol.width, j2Gol.height);

  // Gerenciando sprite
  if (
    j1.direcao.esquerda ||
    j1.direcao.direita ||
    j1.position.y + j1.height < canvas.height - altChao
  ) {
    j1.sprite.imagemSrc = "dogArt/1 Dog/Walk.png";
    j1.sprite.spriteMax = 6;
  } else {
    j1.sprite.imagemSrc = "dogArt/1 Dog/Idle.png";
    j1.sprite.spriteMax = 4;
  }

  if (
    j2.direcao.esquerda ||
    j2.direcao.direita ||
    j2.position.y + j2.height < canvas.height - altChao
  ) {
    j2.sprite.imagemSrc = "dogArt/2 Dog 2/Walk.png";
    j2.sprite.spriteMax = 6;
  } else {
    j2.sprite.imagemSrc = "dogArt/2 Dog 2/Idle.png";
    j2.sprite.spriteMax = 4;
  }

  // grama
  ctx.drawImage(grama, 0, 0, canvas.width, canvas.height);

  /*------------------------------------------- PONTUAÇÃO -----------------------------------------------*/
  if (
    bola.position.x + bola.raio <= 0 &&
    bola.position.y - bola.raio >= j1Gol.position.y
  ) {
    placar.point2 += 1;
    j1.position.x = 0;
    j1.position.y = 0;
    j2.position.x = canvas.width - j2.width;
    j2.position.y = 0;
    bola.position.y = 0;
    bola.position.x = canvas.width / 2;
    bola.velocidade.x = 0;
  }
  if (
    bola.position.x - bola.raio >= canvas.width &&
    bola.position.y - bola.raio >= j2Gol.position.y
  ) {
    placar.point1 += 1;
    j1.position.x = 0;
    j1.position.y = 0;
    j2.position.x = canvas.width - j2.width;
    j2.position.y = 0;
    bola.position.y = 0;
    bola.position.x = canvas.width / 2;
    bola.velocidade.x = 0;
  }
  placar.update();

  if (placar.point1 >= 5) {
    placar.win("Player 1");
  }
  if (placar.point2 >= 5) {
    placar.win("CPU");
  }

  requestAnimationFrame(draw);
}
draw();

/*--------------------------------------------- MODO ESCURO -------------------------------------------*/
function darkMode() {
  if (jogo.darkMode) {
    jogo.darkMode = false;
    document.querySelector("button span").style.marginLeft = "0";
    document.querySelector("button span").style.background = "#ffdc40";
    document.querySelector("button ").style.background = "#fff";
  } else {
    jogo.darkMode = true;
    document.querySelector("button span").style.marginLeft = "calc(100%/2)";
    document.querySelector("button span").style.background = "#f5f5f5";
    document.querySelector("button ").style.background = "#333";
  }
}

/*----------------------------------------------- TECLADO  -------------------------------------------*/

window.addEventListener("keydown", (key) => {
  console.log(key.code)
  if (
    (key.code == "KeyW" || key.code == "ArrowUp") &&
    j1.position.y + j1.height >= canvas.height - altChao
  ) {
    j1.velocidade.y -= 10;
  }
  if (key.code == "KeyA" || key.code == "ArrowLeft") {
    j1.direcao.esquerda = true;
    j1.inverter = true;
  }
  if (key.code == "KeyD" || key.code == "ArrowRight") {
    j1.direcao.direita = true;
    j1.inverter = false;
  }

  /*
  if(key.code == 'ArrowUp' && j2.position.y+j2.height >=canvas.height-altChao){j2.velocidade.y-= 15;}
    if(key.code == 'ArrowLeft'){j2.direcao.esquerda = true; j2.inverter = true}
    if(key.code == 'ArrowRight'){j2.direcao.direita = true; j2.inverter = false}
*/

  if (key.code == "ShiftLeft" || key.code == "ShiftRight") darkMode();
});
window.addEventListener("keyup", (key) => {
  if (key.code == "KeyA" || key.code == "ArrowLeft") {
    j1.direcao.esquerda = false;
  }
  if (key.code == "KeyD" || key.code == "ArrowRight") {
    j1.direcao.direita = false;
  }

  /*
    if(key.code == 'ArrowLeft'){j2.direcao.esquerda = false}
    if(key.code == 'ArrowRight'){j2.direcao.direita = false}
  */
});

/*---------------------------------------------  CPU  -------------------------------------------*/

function cpu() {
  if (bola.position.x == j2.position.x) {
    j2.direcao.direita = false;
    j2.direcao.esquerda = false;
  } else if (bola.position.x <= j2.position.x) {
    j2.direcao.direita = false;
    j2.direcao.esquerda = true;
    j2.inverter = true;
  } else if (bola.position.x >= j2.position.x) {
    j2.direcao.direita = true;
    j2.direcao.esquerda = false;
    j2.inverter = false;
  }
  if (
    bola.position.y < j2.position.y &&
    bola.position.y > j2.position.y - 200 &&
    j2.position.y + j2.height >= canvas.height - altChao
  ) {
    j2.velocidade.y -= 10;
  }
}
