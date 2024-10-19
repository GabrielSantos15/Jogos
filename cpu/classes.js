/*--------------------------------------------- COMPORTAMENTO DOS JOGADORES  -------------------------------------------*/
class Player {
  constructor({
    position,
    direcao,
    height,
    width,
    velocidade,
    sprite,
    inverter,
  }) {
    this.position = position;
    this.direcao = direcao;
    this.height = height;
    this.width = width;
    this.velocidade = velocidade;
    this.sprite = sprite;
    this.inverter = inverter;
    this.scale = 1;
  }
  /*--------------------------------------------- MOVIMENTAÇÃO -------------------------------------------*/

  update() {
    if (this.position.x <= canvas.width - this.width) {
      if (this.direcao.direita == true) {
        this.position.x += this.velocidade.x;
      }
    }
    if (this.position.x >= 0) {
      if (this.direcao.esquerda == true) {
        this.position.x -= this.velocidade.x;
      }
    }

    this.position.y += this.velocidade.y;

    if (
      this.position.y + this.height + this.velocidade.y >=
      canvas.height - altChao
    ) {
      this.velocidade.y = 0;
    } else {
      this.velocidade.y += gravidade;
    }

    // desenhnado o personagem
    this.animacao();
  }

  animacao() {
    const imagem = new Image();
    imagem.src = this.sprite.imagemSrc;

    if (this.sprite.delay == 0) {
      if (this.sprite.spriteAtual < this.sprite.spriteMax - 1) {
        this.sprite.spriteAtual++;
      } else {
        this.sprite.spriteAtual = 0;
      }
      this.sprite.delay = 10;
    } else {
      this.sprite.delay--;
    }

    if (this.inverter === false) {
      ctx.drawImage(
        imagem,
        (imagem.width / this.sprite.spriteMax) * this.sprite.spriteAtual,
        0,
        imagem.width / this.sprite.spriteMax,
        imagem.height,
        this.position.x,
        this.position.y,
        this.width * this.scale,
        this.height * this.scale
      );
    } else {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      ctx.drawImage(
        imagem,
        (imagem.width / this.sprite.spriteMax) * this.sprite.spriteAtual,
        0,
        imagem.width / this.sprite.spriteMax,
        imagem.height,
        canvas.width - (this.position.x + this.width),
        this.position.y,
        this.width * this.scale,
        this.height * this.scale
      );
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }
  }
}
/*--------------------------------------------- COMPORTAMENTO DS BOLA -------------------------------------------*/
class Bola {
  constructor({ position, direcao, raio, velocidade, color }) {
    this.position = position;
    this.direcao = direcao;
    this.raio = raio;
    this.velocidade = velocidade;
    this.color = color;
  }

  update() {
    this.position.y += this.velocidade.y;

    // gravidade
    if (
      this.position.y + this.raio + this.velocidade.y >=
      canvas.height - altChao
    ) {
      this.velocidade.y = 0;
    } else {
      this.velocidade.y += gravidade;
    }

    this.position.x += this.velocidade.x;

    // Diminuindo a velocidade
    if (this.velocidade.x > 0) {
      this.velocidade.x -= 0.15
    } else if (this.velocidade.x < 0) {
      this.velocidade.x += 0.15;
    }

    // Chutando a bola

    if (
      this.position.x - this.raio <= j1.position.x + j1.width &&
      this.position.x + this.raio >= j1.position.x + j1.width / 2 &&
      this.position.y + this.raio > j1.position.y &&
      this.position.y < j1.position.y + j1.height
    ) {
      this.velocidade.x = 10;
      this.velocidade.y -= 5;
    }

    if (
      this.position.x + this.raio >= j1.position.x &&
      this.position.x + this.raio <= j1.position.x + j1.width / 2 &&
      this.position.y + this.raio > j1.position.y &&
      this.position.y < j1.position.y + j1.height
    ) {
      this.position.x = j1.position.x + j1.width;
    }
    if (
      this.position.x - this.raio <= j2.position.x + j2.width / 2 &&
      this.position.x + this.raio >= j2.position.x &&
      this.position.y + this.raio > j2.position.y &&
      this.position.y < j2.position.y + j2.height
    ) {
      this.velocidade.x = -10;
      this.velocidade.y -= 5;
    }
    if (
      this.position.x - this.raio >= j2.position.x + j2.width / 2 &&
      this.position.x - this.raio <= j2.position.x + j2.width &&
      this.position.y + this.raio > j2.position.y &&
      this.position.y < j2.position.y + j2.height
    ) {
      this.position.x = j2.position.x;
    }

    // Colisao com a parede

    if (
      this.position.x + this.raio >= canvas.width &&
      this.position.y - this.raio < j2Gol.position.y
    ) {
      this.position.x = canvas.width - 1 - this.raio;
      this.velocidade.x *= -1;
    }
    if (
      this.position.x - this.raio <= 0 &&
      this.position.y < j1Gol.position.y
    ) {
      this.position.x = 1 + this.raio;
      this.velocidade.x *= -1;
    }

    // desenhando
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.raio, 0, 2 * Math.PI, true);
    ctx.fill();
  }
}
/*--------------------------------------------- COMPORTAMENTO DO PLACAR -------------------------------------------*/
class Placar {
  constructor({ point1, point2 }) {
    this.point1 = point1;
    this.point2 = point2;
  }
  update() {
    const placar1 = document.querySelector("#placar1")
    const placar2 = document.querySelector("#placar2")

    placar1.textContent = this.point1;
    placar2.textContent = this.point2;
  }
  win(jogador) {
    const gameOverContainer = document.querySelector("#gameOver")
    const gameOverText = document.querySelector("#gameOver h3")

    gameOverContainer.classList.remove("hidden")
    gameOverText.textContent = `${jogador} Wins`
    jogo.gameOver = true
  }
}
