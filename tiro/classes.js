// --------------------------------- Comportamento do Jogador ---------------------------
class Player {
  constructor({
    width,
    height,
    position,
    speed,
    direction,
    arma,
    atirando,
    life,
    delayTiro,
    imagemSrc,
    maxFrame,
    atualSprite,
    offset,
    delayFrame,
    scale,
    inverter,
  }) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.speed = speed;
    this.direction = direction;
    this.atirando = atirando;
    this.arma = arma;
    this.life = life;
    this.delayTiro = delayTiro;

    this.imagemIdle = imagens("jogador", "player", "Idle");
    this.imagemWalk = imagens("jogador", "player", "Walk");
    this.spriteImage = this.imagemIdle;

    this.maxFrame = maxFrame;
    this.atualSprite = atualSprite;
    this.offset = offset;
    this.delayFrame = delayFrame;
    this.scale = scale;

    this.arma.imagem = new Image();
    this.arma.imagem.src = this.arma.imagemSrc;

    this.arma.mira.imagem = new Image();
    this.arma.mira.imagem.src = this.arma.mira.img;

    this.inverter = inverter;
  }
  update() {
    // movimentação
    if (this.direction.cima) {
      this.spriteImage = this.imagemWalk;
      this.position.y -= this.speed;
    }
    if (this.direction.baixo) {
      this.spriteImage = this.imagemWalk;
      this.position.y += this.speed;
    }
    if (this.direction.esquerda) {
      this.spriteImage = this.imagemWalk;
      this.position.x -= this.speed;
    }
    if (this.direction.direita) {
      this.spriteImage = this.imagemWalk;
      this.position.x += this.speed;
    }
    if (
      !(
        this.direction.cima ||
        this.direction.baixo ||
        this.direction.esquerda ||
        this.direction.direita
      )
    ) {
      this.spriteImage = this.imagemIdle;
    }

    // colisao paredes
    if (this.position.x < 80) {
      this.position.x = 80;
    }
    if (this.position.x + this.width > mapa.width - 80) {
      this.position.x = mapa.width - 80 - this.width;
    }
    if (this.position.y + this.height > mapa.height - 80) {
      this.position.y = mapa.height - 80 - this.height;
    }
    if (this.position.y + this.height < 220) {
      this.position.y = 220 - this.height;
    }

    // inverter personagem
    if (
      this.arma.mira.x <
      player.arma.x - player.arma.width - camera.position.x
    ) {
      this.inverter = true;
    } else {
      this.inverter = false;
    }

    // movimentação da arma
    this.arma.x = this.position.x + this.width / 2;
    this.arma.y = this.position.y + this.height / 2.5;
    //  atirar
    if (player.atirando) {
      if (this.delayTiro >= 10) {
        const audioTiro = new Audio(audios.arma.tiro);
        audioTiro.play();
        audioTiro.volume = 0.1;

        if (!this.inverter) {
          municao.push(
            new Tiro({
              width: 10,
              position: {
                x: player.arma.x + player.arma.width,
                y: player.arma.y,
              },
              from: {
                x: player.arma.x + player.arma.width,
                y: player.arma.y,
              },
              to: {
                x: this.arma.mira.x + camera.position.x,
                y: this.arma.mira.y + camera.position.y,
              },
              speed: {
                x: 10,
                y: 10,
              },
              ativo: true,
              dano: 20,
            })
          );
          this.delayTiro = 0;
        } else {
          municao.push(
            new Tiro({
              width: 10,
              position: {
                x: player.arma.x - player.arma.width,
                y: player.arma.y,
              },
              from: {
                x: player.arma.x - player.arma.width,
                y: player.arma.y,
              },
              to: {
                x: this.arma.mira.x + camera.position.x,
                y: this.arma.mira.y + camera.position.y,
              },
              speed: {
                x: 10,
                y: 5,
              },
              ativo: true,
              dano: 20,
            })
          );
          this.delayTiro = 0;
        }
      } else {
        this.delayTiro++;
      }
    }

    // Atualizando frames
    if (this.delayFrame > 10) {
      if (this.atualSprite < this.maxFrame - 1) {
        this.atualSprite++;

        // audio de corrida
        if (
          this.imagemSrc == "imagens/player/run.png" &&
          (this.atualSprite == 1 || this.atualSprite == 5)
        ) {
          const audioGrama = new Audio(audios.ambiente.grama);
          audioGrama.play();
          audioGrama.volume = 0.5;
        }
      } else {
        this.atualSprite = 0;
      }
      this.delayFrame = 0;
    } else {
      this.delayFrame++;
    }
  }
  draw() {
    //ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    if (!this.inverter) {
      ctx.drawImage(
        this.spriteImage,
        this.atualSprite * (this.spriteImage.width / this.maxFrame),
        0,
        this.spriteImage.width / this.maxFrame,
        this.spriteImage.height,
        this.position.x - this.offset.x * this.scale,
        this.position.y - this.offset.y * this.scale,
        (this.spriteImage.width / this.maxFrame) * this.scale,
        this.spriteImage.height * this.scale
      );
    } else {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(
        this.spriteImage,
        this.atualSprite * (this.spriteImage.width / this.maxFrame),
        0,
        this.spriteImage.width / this.maxFrame,
        this.spriteImage.height,
        canvas.width -
          (this.position.x + this.offset.x * this.scale + this.width),
        this.position.y - this.offset.y * this.scale,
        (this.spriteImage.width / this.maxFrame) * this.scale,
        this.spriteImage.height * this.scale
      );
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }

    // desenhando a arma
    if (!this.inverter) {
      ctx.drawImage(
        this.arma.imagem,
        this.arma.x,
        this.arma.y,
        this.arma.width,
        this.arma.height
      );
    } else {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);

      ctx.drawImage(
        this.arma.imagem,
        canvas.width - this.arma.x,
        this.arma.y,
        this.arma.width,
        this.arma.height
      );

      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }

    // desenhando a mira
    ctx.drawImage(
      this.arma.mira.imagem,
      this.arma.mira.x - 15 + camera.position.x,
      this.arma.mira.y - 15 + camera.position.y,
      30,
      30
    );
  }
}

// ------------------------------------ comportamento dos tiros -----------------------------------
class Tiro {
  constructor({ width, position, from, to, speed, ativo, dano }) {
    this.width = width;
    this.position = position;
    this.from = from;
    this.to = to;
    this.speed = speed;
    this.ativo = ativo;
    this.dano = dano;
  }
  update() {
    if (Math.abs(this.from.x - this.to.x) > Math.abs(this.from.y - this.to.y)) {
      this.speed.x = 10;
      this.speed.y =
        (Math.abs(this.from.y - this.to.y) * this.speed.x) /
        Math.abs(this.from.x - this.to.x);
    } else if (
      Math.abs(this.from.x - this.to.x) < Math.abs(this.from.y - this.to.y)
    ) {
      this.speed.x =
        (Math.abs(this.from.x - this.to.x) * this.speed.y) /
        Math.abs(this.from.y - this.to.y);
      this.speed.y = 10;
    } else {
      this.speed.x = 10;
      this.speed.y = 10;
    }

    if (this.to.x >= this.from.x) {
      this.speed.x = Math.abs(this.speed.x);
    }
    if (this.to.x < this.from.x) {
      this.speed.x = Math.abs(this.speed.x) * -1;
    }
    if (this.to.y >= this.from.y) {
      this.speed.y = Math.abs(this.speed.y);
    }
    if (this.to.y < this.from.y) {
      this.speed.y = Math.abs(this.speed.y) * -1;
    }

    if (this.ativo) {
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }

    for (let i = 0; i < monsters.length; i++) {
      if (
        this.position.x + this.width >= monsters[i].position.x &&
        this.position.x <= monsters[i].position.x + monsters[i].width &&
        this.position.y + this.width >= monsters[i].position.y &&
        this.position.y <= monsters[i].position.y + monsters[i].height
      ) {
        let positionArray = municao.indexOf(this);
        municao.splice(positionArray, 1);

        monsters[i].vida -= this.dano;
      }
    }

    if (
      this.position.x >= mapa.width ||
      this.position.x <= 0 ||
      this.position.y <= 0 ||
      this.position.y >= mapa.height
    ) {
      let positionArray = municao.indexOf(this);
      municao.splice(positionArray, 1);
    }
  }
  draw() {
    ctx.fillStyle = "#888";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.width);
  }
}

// ---------------------------------------- Movimentação da camera ----------------------

class Camera {
  constructor({ position, width, height, border }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.border = border;
  }
  update() {
    // camera
    if (player.position.x < this.position.x + this.border.esquerda) {
      this.position.x = player.position.x - this.width * 0.25;
    }
    if (
      player.position.x + player.width >
      this.position.x + this.border.direita
    ) {
      this.position.x = player.position.x + player.width - this.width * 0.75;
    }
    if (player.position.y < this.position.y + this.border.cima) {
      this.position.y = player.position.y - this.height * 0.25;
    }
    if (
      player.position.y + player.height >
      this.position.y + this.border.baixo
    ) {
      this.position.y = player.position.y + player.height - this.height * 0.75;
    }

    // limite camera
    if (camera.position.x < 0) {
      camera.position.x = 0;
    }
    if (camera.position.x + camera.width > mapa.width) {
      camera.position.x = mapa.width - camera.width;
    }
    if (camera.position.y < 0) {
      camera.position.y = 0;
    }
    if (camera.position.y + camera.height > mapa.height) {
      camera.position.y = mapa.height - camera.height;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(-camera.position.x, -camera.position.y);

    ctx.drawImage(background, mapa.x, mapa.y, mapa.width, mapa.height);

    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    ctx.shadowBlur = 10;

    player.update();
    player.draw();

    for (let i = 0; i < monsters.length; i++) {
      monsters[i].draw();
      monsters[i].update();
    }
    for (let i = 0; i < municao.length; i++) {
      municao[i].draw();
      municao[i].update(this);
    }
    ctx.restore();
  }
}

// ------------------------------------ comportamento dos Mobs -----------------------------------
class Monster {
  constructor({
    width,
    height,
    position,
    speed,
    vida,
    dano,
    delayDano,
    mob,
    maxFrame,
    atualSprite,
    offset,
    delayFrame,
    scale,
    inverter,
  }) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.speed = speed;
    this.vida = vida;
    this.dano = dano;
    this.delayDano = delayDano;
    this.mob = mob;
    this.imagemIdle = imagens("mobs", mob, "Idle");
    this.imagemWalk = imagens("mobs", mob, "Walk");
    this.spriteImage = this.imagemIdle;
    this.maxFrame = maxFrame;
    this.atualSprite = atualSprite;
    this.offset = offset;
    this.delayFrame = delayFrame;
    this.scale = scale;
    this.inverter = inverter;
  }
  update() {
    // Movimento
    if (this.position.x > player.position.x) {
      this.spriteImage = this.imagemWalk;
      this.position.x -= this.speed;
    }
    if (this.position.x < player.position.x) {
      this.spriteImage = this.imagemWalk;
      this.position.x += this.speed;
    }

    if (this.mob == "Eye") {
      if (this.position.y > player.position.y) {
        this.spriteImage = this.imagemWalk;
        this.position.y -= this.speed;
      }
      if (this.position.y < player.position.y) {
        this.spriteImage = this.imagemWalk;
        this.position.y += this.speed;
      }
    } else {
      if (this.position.y + this.height > player.position.y + player.height) {
        this.spriteImage = this.imagemWalk;
        this.position.y -= this.speed;
      }
      if (this.position.y + this.height < player.position.y + player.height) {
        this.spriteImage = this.imagemWalk;
        this.position.y += this.speed;
      }
    }

    if (
      this.position.x + this.width >= player.position.x &&
      this.position.x <= player.position.x + player.width &&
      this.position.y + this.height >= player.position.y &&
      this.position.y <= player.position.y + player.height
    ) {
      if (this.delayDano >= 50) {
        player.life -= this.dano;
        this.delayDano = 0;
      } else {
        this.delayDano++;
      }
    }
    document.querySelector("#life div").style.width = player.life / 2 + "%";

    // invertendo mob
    this.position.x > player.position.x
      ? (this.inverter = true)
      : (this.inverter = false);

    // atulizando frame
    if (this.delayFrame > 10) {
      if (this.atualSprite < this.maxFrame - 1) {
        this.atualSprite++;
      } else {
        this.atualSprite = 0;
      }
      this.delayFrame = 0;
    } else {
      this.delayFrame++;
    }

    // mob morrendo
    if (this.vida <= 0) {
      let positionArray = monsters.indexOf(this);
      monsters.splice(positionArray, 1);
      info.kills++;

      info.point += 50;
      document.querySelector("output#point").innerHTML = info.point;

      // criando mobs
      const mobRandom = Math.random() * 100;

      if (monsters.length <= 30) {
        if (mobRandom <= 25) {
          // 25% de chance de criar 1 esqueleto
          monsters.push(skeleton());
        } else if (mobRandom <= 50) {
          // 25% de chance de criar 1 esqueleto e 1 goblin
          monsters.push(skeleton());
          monsters.push(goblin());
        } else if (mobRandom <= 65) {
          // 15% de chance de criar um goblin sozinho
          monsters.push(goblin());
        } else if (mobRandom <= 85) {
          // 20% de chance de criar um olho (aumentado)
          monsters.push(eye());
        } else if (mobRandom <= 92) {
          // 7% de chance de criar um cogumelo
          monsters.push(mushroom());
        } else if (mobRandom <= 100) {
          // 8% de chance de criar um cachorro
          monsters.push(dog());
        }
      }
    }
  }
  draw() {
    //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (!this.inverter) {
      ctx.drawImage(
        this.spriteImage,
        this.atualSprite * (this.spriteImage.width / this.maxFrame),
        0,
        this.spriteImage.width / this.maxFrame,
        this.spriteImage.height,
        this.position.x - this.offset.x * this.scale,
        this.position.y - this.offset.y * this.scale,
        (this.spriteImage.width / this.maxFrame) * this.scale,
        this.spriteImage.height * this.scale
      );
    } else {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(
        this.spriteImage,
        this.atualSprite * (this.spriteImage.width / this.maxFrame),
        0,
        this.spriteImage.width / this.maxFrame,
        this.spriteImage.height,
        canvas.width -
          (this.position.x + this.offset.x * this.scale + this.width),
        this.position.y - this.offset.y * this.scale,
        (this.spriteImage.width / this.maxFrame) * this.scale,
        this.spriteImage.height * this.scale
      );
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }
  }
}
