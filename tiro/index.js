const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// colocando tamnho da tela do jogo

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function size() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.width = canvas.width;
  camera.height = canvas.height;
}

//--------------------------------- adicionando informações --------------------------------

const info = {
  record: 0,
  point: 0,
  kills: 0,
};

// recuperando o recorde
function recuperarRecord() {
  const storageRecord = localStorage.getItem("info");

  if (storageRecord) {
    info.record = JSON.parse(storageRecord);
    console.log(info.record);
  }
}
recuperarRecord();

const background = new Image();
background.src = "imagens/elementos/fundo.png";

const audios = {
  musica: [
    "audios/musicas/Dark Atmosphere to Synth.wav",
    "audios/musicas/Dystopian.wav",
    "audios/musicas/Empty Streets.wav",
    "audios/musicas/Mystery Unsolved.wav",
    "audios/musicas/Surveillance.wav",
    "audios/musicas/The Protagonist.wav",
    "audios/musicas/The Story Continues.wav",
  ],
  arma: {
    tiro: "audios/audioArmas/tiro/22LR/MP3/22LR Single Isolated MP3.mp3",
  },
  ambiente: {
    grama: "audios/somAmbiente/04_step_grass_1.wav",
  },
};

const mapa = {
  img: background,
  x: 0,
  y: 0,
  width: 3508,
  height: 2480,
};

const player = new Player({
  width: 56,
  height: 182,
  position: {
    x: mapa.width / 2,
    y: mapa.height / 2,
  },
  speed: 5,
  direction: {
    cima: false,
    esquerda: false,
    direita: false,
    baixo: false,
  },
  arma: {
    width: 100,
    height: 30,
    imagemSrc: "imagens/armas/PNG/shotgun.png",
    dano: 20,
    mira: {
      img: "imagens/armas/mira.png",
      x: 0,
      y: 0,
    },
  },
  life: 200,
  atirando: false,
  delayTiro: 0,
  imagemSrc: "imagens/player/Idle.png",
  maxFrame: 8,
  atualSprite: 0,
  offset: {
    x: 75,
    y: 54,
  },
  delayFrame: 0,
  scale: 3.5,
  inverter: false,
});

const municao = [];

const camera = new Camera({
  position: {
    x: 0,
    y: 0,
  },
  width: canvas.width,
  height: canvas.height,
  border: {
    cima: 0 + canvas.height * 0.25,
    esquerda: 0 + canvas.width * 0.25,
    direita: 0 + canvas.width * 0.75,
    baixo: 0 + canvas.height * 0.75,
  },
});

const monsters = [skeleton(), skeleton(), goblin()];

// cirando imagens

function imagens(tipo, personagem, status) {
  const imageSrc = `imagens/${tipo}/${personagem}/${status}.png`;
  const sprite = new Image();
  sprite.src = imageSrc;
  return sprite;
}
//--------------------------------------------- Executando o jogo -----------------------------------

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00f";

  camera.update();
  camera.draw();

  if (player.life <= 0) {
    document.querySelector("#gameOver").classList.remove("hidden");

    //game over card
    if (info.point > info.record) {
      info.record = info.point;
      localStorage.setItem("info", JSON.stringify(info.record));
    }

    document.querySelector("#pontuacao").innerHTML = info.point;
    document.querySelector("#recorde").innerHTML = info.record;
    document.querySelector("#kills").innerHTML = info.kills;

    return;
  }

  requestAnimationFrame(game);
}

//--------------------------------------------- iniciar Jogo ---------------------------------------------
function play() {
  document.querySelector("#homePage").style.display = "none";
  game();
  musica();
}

//--------------------------------------------- musica de fundo --------------------------------------------

function musica() {
  const musicRandom = Math.floor(Math.random() * audios.musica.length);
  const music = new Audio(audios.musica[musicRandom]);
  music.volume = 0.3;
  music.play();
  music.addEventListener("ended", () => {
    music.remove();
    musica();
  });
}

// --------------------------------------------   eventos ----------------------------------------------------
// mouse
window.addEventListener("mousemove", (event) => {
  player.arma.mira.x = event.clientX;
  player.arma.mira.y = event.clientY;
});
window.addEventListener("mousedown", () => {
  player.atirando = true;
});
window.addEventListener("mouseup", () => {
  player.atirando = false;
});

// teclado
window.addEventListener("keydown", (key) => {
  switch (key.code) {
    case "KeyW":
      player.direction.cima = true;
      break;
    case "KeyA":
      player.direction.esquerda = true;
      break;
    case "KeyS":
      player.direction.baixo = true;
      break;
    case "KeyD":
      player.direction.direita = true;
      break;
    case "ArrowUp":
      player.direction.cima = true;
      break;
    case "ArrowLeft":
      player.direction.esquerda = true;
      break;
    case "ArrowDown":
      player.direction.baixo = true;
      break;
    case "ArrowRight":
      player.direction.direita = true;
      break;
  }
});
window.addEventListener("keyup", (key) => {
  switch (key.code) {
    case "KeyW":
      player.direction.cima = false;
      break;
    case "KeyA":
      player.direction.esquerda = false;
      break;
    case "KeyS":
      player.direction.baixo = false;
      break;
    case "KeyD":
      player.direction.direita = false;
      break;
      case "ArrowUp":
        player.direction.cima = false;
        break;
      case "ArrowLeft":
        player.direction.esquerda = false;
        break;
      case "ArrowDown":
        player.direction.baixo = false;
        break;
      case "ArrowRight":
        player.direction.direita = false;
        break;
  }

});

// vinheta
