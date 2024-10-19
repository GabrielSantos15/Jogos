let velocity = 2

setInterval(()=>{
  if (velocity < 5) velocity+=0.3
},30000)

const skeleton = () => {
  return new Monster({
    width: 60,
    height: 150,
    position: {
      x: Math.random() * mapa.width,
      y: Math.random() * mapa.height,
    },
    speed: 0.5 * velocity,
    vida: 100,
    dano: 20,
    delayDano: 0,
    mob: "Skeleton",
    maxFrame: 4,
    atualSprite: 0,
    offset: {
      x: 72,
      y: 50,
    },
    delayFrame: 0,
    scale: 3,
    inverter: false,
  });
};

const goblin = () => {
  return new Monster({
    width: 75,
    height: 105,
    position: {
      x: Math.random() * mapa.width,
      y: Math.random() * mapa.height,
    },
    speed: 0.7  * velocity,
    vida: 90,
    dano: 20,
    delayDano: 0,
    mob: "Goblin",
    maxFrame: 8,
    atualSprite: 0,
    offset: {
      x: 65,
      y: 66,
    },
    delayFrame: 0,
    scale: 3,
    inverter: false,
  });
};

const eye = () => {
  return new Monster({
    width: 60,
    height: 60,
    position: {
      x: Math.random() * mapa.width,
      y: Math.random() * mapa.height,
    },
    speed: 1.3  * velocity,
    vida: 100,
    dano: 25,
    delayDano: 0,
    mob: "Eye",
    maxFrame: 8,
    atualSprite: 0,
    offset: {
      x: 70,
      y: 65,
    },
    delayFrame: 0,
    scale: 3,
    inverter: false,
  });
};

const mushroom = () => {
  return new Monster({
    width: 60,
    height: 114,
    position: {
      x: Math.random() * mapa.width,
      y: Math.random() * mapa.height,
    },
    speed: 0.3  * velocity,
    vida: 150,
    dano: 100,
    delayDano: 0,
    mob: "Mushroom",
    maxFrame: 8,
    atualSprite: 0,
    offset: {
      x: 65,
      y: 64,
    },
    delayFrame: 0,
    scale: 3,
    inverter: false,
  });
};

const dog = () => {
  return new Monster({
    width: 108,
    height: 69,
    position: {
      x: Math.random() * mapa.width,
      y: Math.random() * mapa.height,
    },
    speed: 2.3  * velocity,
    vida: 60,
    dano: 40,
    delayDano: 0,
    mob: "Dog",
    maxFrame: 12,
    atualSprite: 0,
    offset: {
      x: 20,
      y: 9,
    },
    delayFrame: 0,
    scale: 3,
    inverter: false,
  });
};

function imagens(mob,tipo){
  const imageSrc =  `imagens/mobs/${mob}/${tipo}.png`
  const sprite = new Image()
  sprite.src = imageSrc
  return(sprite)
}