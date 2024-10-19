/*------------------------------------------- COLISÃO  -------------------------------------------*/

function rectangularCollisian({ rectangule1, rectangule2 }) {
  return (
    rectangule1.attackBox.position.x + rectangule1.attackBox.width >=
      rectangule2.position.x &&
    rectangule1.attackBox.position.x <=
      rectangule2.position.x + rectangule2.width &&
    rectangule1.attackBox.position.y + rectangule1.attackBox.height >=
      rectangule2.position.y &&
    rectangule1.attackBox.position.y <=
      rectangule2.position.y + rectangule2.height
  );
}

/*------------------------------------ DETERMINANDO O VENCEDOR  ----------------------------------*/
function determineWinnner({ j1, j2, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#displayText").style.display = "flex";
  if (j1.vida == j2.vida) {
    document.querySelector("#displayText > h3").innerHTML = "Empate";
  } else if (j2.death && j1.death) {
    document.querySelector("#displayText > h3").innerHTML = "Empate";
  } else if (j2.death) {
    document.querySelector("#displayText > h3").innerHTML = "player 1 Wins";
  } else if (j1.death) {
    document.querySelector("#displayText > h3").innerHTML = "player 2 Wins";
  } else if (j1.vida > j2.vida) {
    document.querySelector("#displayText > h3").innerHTML = "player 1 Wins";
  } else if (j1.vida < j2.vida) {
    document.querySelector("#displayText > h3").innerHTML = "player 2 Wins";
  }
}

let timerId;

/*---------------------------------------------- TIMER  -------------------------------------------*/
function decreaseTimer() {
  if (timer > 0 && !j2.death && !j1.death) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer == 0) {
    determineWinnner({ j1, j2, timerId });
  }
}
