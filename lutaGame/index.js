const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

let timer = 60;


/*--------------------------------------------- iNFORMAÇÕES -------------------------------------------*/
//informações do fundo
const backgrond = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  inverter: false,
  imageSrc: `imagens/background${Math.floor(Math.random() * 3 + 1)}.png`,
});

//informações da loja
const shop = new Sprite({
  position: {
    x: 600,
    y: 128,
  },
  inverter: false,
  imageSrc: "imagens/shop.png",
  scale: 2.75,
  frameMax: 6,
});

//informações do jogador 1
const j1 = new Fighter({
  position: {
    x: 100,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  inverter: false,
  imageSrc: "./imagens/samuraiMack/Idle.png",
  frameMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./imagens/samuraiMack/Idle.png",
      frameMax: 8,
      image: new Image(),
    },
    run: {
      imageSrc: "./imagens/samuraiMack/Run.png",
      frameMax: 8,
    },
    jump: {
      imageSrc: "./imagens/samuraiMack/Jump.png",
      frameMax: 2,
    },
    fall: {
      imageSrc: "./imagens/samuraiMack/Fall.png",
      frameMax: 2,
    },
    attack1: {
      imageSrc: "./imagens/samuraiMack/Attack1.png",
      frameMax: 4,
    },
    takeHit: {
      imageSrc: "./imagens/samuraiMack/Take Hit - white silhouette.png",
      frameMax: 4,
    },
    death: {
      imageSrc: "./imagens/samuraiMack/Death.png",
      frameMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 91,
      y: 50,
    },
    width: 160,
    height: 50,
    dano: 10,
  },
});

//informações do jogador 2
const j2 = new Fighter({
  position: {
    x: canvas.width - 150,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  inverter: false,
  imageSrc: "./imagens/Kenji/Idle.png",
  frameMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imageSrc: "./imagens/Kenji/Idle.png",
      frameMax: 4,
    },
    run: {
      imageSrc: "./imagens/Kenji/Run.png",
      frameMax: 8,
    },
    jump: {
      imageSrc: "./imagens/Kenji/Jump.png",
      frameMax: 2,
    },
    fall: {
      imageSrc: "./imagens/Kenji/Fall.png",
      frameMax: 2,
    },
    attack1: {
      imageSrc: "./imagens/Kenji/Attack1.png",
      frameMax: 4,
    },
    takeHit: {
      imageSrc: "./imagens/Kenji/Take hit.png",
      frameMax: 3,
    },
    death: {
      imageSrc: "./imagens/Kenji/Death.png",
      frameMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -175,
      y: 50,
    },
    width: 160,
    height: 50,
    dano: 10,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

decreaseTimer();

/*--------------------------------------------- ANIMANDO o JOGO -------------------------------------------*/

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  backgrond.update();
  shop.update();
  ctx.fillStyle = "rgba(255,255,255,.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  j1.update();
  j2.update();
  j1.velocity.x = 0;
  j2.velocity.x = 0;

  // movimentação jogador 1
  if (
    keys.a.pressed &&
    j1.lastkey == "a" &&
    j1.position.x >= 0 &&
    (j1.position.x + j1.width <= j2.position.x ||
      (!j1.inverter && j1.position.x + j1.width >= j2.position.x) ||
      j1.position.x >= j2.position.x + j2.width ||
      j1.position.y + j1.height <= j2.position.y ||
      j1.position.y >= j2.position.y + j2.height)
  ) {
    j1.velocity.x = -5;
    j1.switchSprite("run");
  } else if (
    keys.d.pressed &&
    j1.lastkey == "d" &&
    j1.position.x + j2.width <= canvas.width &&
    (j1.position.x + j1.width < j2.position.x ||
      (j1.inverter && j1.position.x + j1.width >= j2.position.x) ||
      j1.position.x > j2.position.x + j2.width ||
      j1.position.y + j1.height < j2.position.y ||
      j1.position.y > j2.position.y + j2.height)
  ) {
    j1.velocity.x = 5;
    j1.switchSprite("run");
  } else {
    j1.switchSprite("idle");
  }
  if (j1.velocity.y < 0) {
    j1.switchSprite("jump");
  } else if (j1.velocity.y > 0) {
    j1.switchSprite("fall");
  }

  /*--------------------------------------------- MOVIMENTAÇÃO -------------------------------------------*/
  // movimentação jogador 2
  if (
    keys.ArrowLeft.pressed &&
    j2.lastkey == "ArrowLeft" &&
    j2.position.x >= 0 &&
    !(j2.death || j1.death)  &&
    (j2.position.x + j2.width <= j1.position.x ||
      (j2.inverter && j2.position.x + j2.width >= j1.position.x) ||
      j2.position.x >= j1.position.x + j1.width ||
      j2.position.y + j2.height <= j1.position.y ||
      j2.position.y >= j1.position.y + j1.height)
  ) {
    j2.velocity.x = -5;
    j2.switchSprite("run");
  } else if (
    keys.ArrowRight.pressed &&
    j2.lastkey == "ArrowRight" &&
    j2.position.x + j2.width <= canvas.width &&
    (j2.position.x + j2.width <= j1.position.x ||
      (!j2.inverter && j2.position.x + j2.width >= j1.position.x) ||
      j2.position.x >= j1.position.x + j1.width ||
      j2.position.y + j2.height <= j1.position.y ||
      j2.position.y >= j1.position.y + j1.height)
  ) {
    j2.velocity.x = 5;
    j2.switchSprite("run");
  } else {
    j2.switchSprite("idle");
  }

  if (j2.velocity.y < 0) {
    j2.switchSprite("jump");
  } else if (j2.velocity.y > 0) {
    j2.switchSprite("fall");
  }

  // inverter personagens
  if (j1.position.x >= j2.position.x) {
    j1.inverter = true;
    j2.inverter = true;
  } else {
    j1.inverter = false;
    j2.inverter = false;
  }

  /*--------------------------------------------- DETECTANDO ATAQUE -------------------------------------------*/
  //   jogador 1
  if (
    rectangularCollisian({
      rectangule1: j1,
      rectangule2: j2,
    }) &&
    j1.atacando &&
    j1.frameCurrent == 2
  ) {
    j2.takeHit();
    j1.atacando = false;
    document.querySelector("#j2-life").style.width = j2.vida + "%";
  }

  if (j1.atacando && j1.frameCurrent == 2) {
    j1.atacando = false;
  }
  //   jogador 2
  if (
    rectangularCollisian({
      rectangule1: j2,
      rectangule2: j1,
    }) &&
    j2.atacando &&
    j2.frameCurrent == 2
  ) {
    j1.takeHit();
    j2.atacando = false;
    document.querySelector("#j1-life").style.width = j1.vida + "%";
  }
  // id j2 misses
  if (j2.atacando && j2.frameCurrent == 2) {
    j2.atacando = false;
  }
  // vitoria
  if (j2.death || j1.death) {
    determineWinnner({ j1, j2 });
  }
}

animate();

/*--------------------------------------------- TECLADO  -------------------------------------------*/

window.addEventListener("keydown", (event) => {
  if (!(j2.death || j1.death || timer <=0)) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        j1.lastkey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        j1.lastkey = "a";
        break;
      case "w":
        if (j1.velocity.y == 0) {
          j1.velocity.y = -20;
        }
        break;
      case "s":
        j1.attack();
        break;
      case "D":
        keys.d.pressed = true;
        j1.lastkey = "d";
        break;
      case "A":
        keys.a.pressed = true;
        j1.lastkey = "a";
        break;
      case "W":
        if (j1.velocity.y == 0) {
          j1.velocity.y = -20;
        }
        break;
      case "S":
        j1.attack();
        break;
    }
  }
  if (!(j2.death || j1.death || timer <=0)) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        j2.lastkey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        j2.lastkey = "ArrowLeft";
        break;
      case "ArrowUp":
        if (j2.velocity.y == 0) {
          j2.velocity.y = -20;
        }
        break;
      case "ArrowDown":
        j2.attack();
        break;
    }
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "D":
      keys.d.pressed = false;
      break;
    case "A":
      keys.a.pressed = false;
      break;
  }
  // j2
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});

/*--------------------------------------------- REINICIAR  -------------------------------------------*/
function recarregar() {
  window.location.reload();
}
window.addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    if (document.querySelector("#displayText").style.display == "flex")
      recarregar();
});
