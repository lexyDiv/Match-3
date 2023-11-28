const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;
  if (gameField.click) {
    gameField.click.lastX = cursor.x;
    gameField.click.lastY = cursor.y;
  }
});

window.addEventListener("mousedown", (e) => {
  if ( !gameField.userStop) {
    gameField.fieldCollision(cursor);
    gameField.focusCell
      ? (gameField.click = {
          check: false,
          x: e.offsetX,
          y: e.offsetY,
          timer: setTimeout(() => {
            gameField.click && gameField.clickOrder();
          }, 600),
        })
      : false;
  }
});

window.addEventListener("mouseup", (e) => {
  if (gameField.click) {
    gameField.clickOrder();
  }
});



function updateMas() {
  mas = clientHeight / 600 - hh;
  mas > 0 && hhK ? (hh += 0.05) : mas < 0 ? (mas = 0) : false;

  booMas = 0;
  if (gameField.booMas.length) {
    booMas = gameField.booMas[gameField.booMas.length - 1];
    gameField.booMas.pop();
  }
  if (gameField.width * mas > width) {
    mas = clientHeight / 750;
  }

  offsetY = (height - gameField.height * (mas + booMas)) / 2;
  offsetX = (width - gameField.width * (mas + booMas)) / 2;
}

function starsDraw() {
  for (let i = 0; i < stars.length; i++) {
    const starData = stars[i];
    const x =
      starData.item.x * mas +
      offsetX +
      (starData.item.width * mas) / starData.offsetX;
    const y =
      starData.item.y * mas +
      offsetY +
      (starData.item.height * mas) / starData.offsetY;
    starData.conor += starData.conorKoof;
    starData.gab--;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(starData.conor);
    ctx.drawImage(
      star,
      0,
      0,
      600,
      400,
      -(starData.gab * mas) / 2,
      -(starData.gab * mas) / 2,
      starData.gab * mas,
      starData.gab * mas
    );
    ctx.restore();
    if (starData.gab <= 0 || starData.item.stopStar) {
      starData.out = true;
      stars.splice(i, 1);
      i--;
    }
  }
}

function baseFoneDraw() {
  const iWidth = (width * 1281) / 1600;
  const iHeight = (height * 720) / 900;

  const animX = (1281 - iWidth) / 2;

  const animY = (720 - iHeight) / 2;
  const animWidth = iWidth;
  const animHeight = iHeight;

  ctx.drawImage(
    baseFone2,
    animX,
    animY,
    animWidth,
    animHeight,
    0,
    0,
    width,
    height
  );

  baseFoneAlpha > 0 ? (baseFoneAlpha -= 0.01) : false;
  baseFoneAlpha < 0 ? (baseFoneAlpha = 0) : false;

  ctx.globalAlpha = baseFoneAlpha;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;
}

let pausa = false;
let hh = 0;
let hhK = false;
window.addEventListener("keydown", () => {
  //  hhK = true
  pausa = !pausa
});


setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  baseFoneDraw();
  updateMas();

if(!pausa) {
  gameField.caseOrder();
  gameField.cellsItemsMove();
  gameField.destroyOrder();
  gameField.booOrder();
 // gameField.leftRightUpdate();
  gameField.controller();
  gameField.itemsColumsMove();
 gameField.itemsMove();
 gameField.leftRightUpdate();
  gameField.rocketsOrder();
}

  
  gameField.draw();

  gameField.drawBoo();
  scorePoints.drawOrder();
  scorePoints.draw();
  scorePoints.drawPieses();
  starsDraw();
  gameField.drawRockets();

  gameField.ticker++;
  gameField.ticker === 1000 ? (gameField.ticker = 0) : false;
}, 30);
