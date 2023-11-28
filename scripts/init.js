const gameField = new GameField();
gameField.fieldInit();
gameField.getColumns();
gameField.getGroops();
//gameField.getPotentialThree();

const gab = 60;

const scorePoints = {
  points: [],
  onDestroy: [],
  pieses: [],
  // red: { items: [] },
  // blue: { items: [] },
  // green: { items: [] },
  init: function () {
    const newTypes = JSON.parse(JSON.stringify(types));
    while (newTypes.length > 3) {
      newTypes.splice(Math.floor(Math.random() * newTypes.length), 1);
    }

    newTypes.forEach((type) => {
      this[type] = { items: [] };
      this.points.push(this[type]);
    });
    const pieseStep = 20;
    for (let i = 0; i < pieseStep; i++) {
      this.pieses.push([]);
      for (let k = 0; k < pieseStep; k++) {
        this.pieses[i].push({
          animX: k * (200 / pieseStep),
          animY: i * (200 / pieseStep),
          step: 200 / pieseStep,
        });
      }
    }
    // console.log(this.pieses);
  },
  drawPieses: function () {
    for (let i = 0; i < this.onDestroy.length; i++) {
      const item = this.onDestroy[i];
      const image = imagesItems[item.type];
      item.outGab += 5;
      item.outY += item.outSpeed;
      item.outSpeed += 0.2;
      item.outTik >= 5 ? (item.pieseKoof += 0.8) : false;
      item.height += 3;
      item.width += 3;
      item.outTik++;

      this.pieses.forEach((el, i) => {
        el.forEach((piese, k) => {
          const { animX, animY, step } = piese;
          const pWidth =
            ((item.width + item.outGab) / this.pieses.length) * mas;
          const pHeight =
            ((item.height + item.outGab) / this.pieses.length) * mas;
          image &&
            ctx.drawImage(
              image,
              animX,
              animY,
              step,
              step,
              (item.cell.cX - (item.width + item.outGab) / 2) * mas +
                offsetX +
                pWidth * k,
              (item.cell.cY + item.outY - item.height / 2) * mas +
                offsetY +
                pHeight * i,
              pWidth - item.pieseKoof,
              pHeight - item.pieseKoof
            );
        });
      });
      if (item.outTik >= 17) {
        this.onDestroy.splice(i, 1);
        // console.log(item.outTik)
        i--;
      }
    }
  },
  drawOrder: function () {
    this.points[0].x = width / 2 - (gab * mas) / 2 - (width / 4) * mas;
    this.points[0].y =
      height - (height - gameField.height * mas) / 4 - (gab / 2) * mas;

    this.points[1].x = width / 2 - (gab * mas) / 2;
    this.points[1].y =
      height - (height - gameField.height * mas) / 4 - (gab / 2) * mas;

    this.points[2].x = width / 2 - (gab * mas) / 2 + (width / 4) * mas;
    this.points[2].y =
      height - (height - gameField.height * mas) / 4 - (gab / 2) * mas;
  },
  draw: function () {
    types.forEach((type) => {
      const point = this[type];
      if (point) {
        if (type === "blue") {
          ctx.drawImage(
            itemsArt,
            30,
            55,
            110,
            100,
            point.x,
            point.y,
            gab * mas,
            gab * mas
          );
        } else if (type === "red") {
          ctx.drawImage(
            itemsArt,
            157,
            50,
            110,
            100,
            point.x,
            point.y,
            gab * mas,
            gab * mas
          );
        } else if (type === "violet") {
          ctx.drawImage(
            itemsArt,
            535,
            50,
            110,
            100,
            point.x,
            point.y,
            gab * mas,
            gab * mas
          );
        } else if (type === "green") {
          ctx.drawImage(
            itemsArt,
            410,
            50,
            110,
            100,
            point.x,
            point.y,
            gab * mas,
            gab * mas
          );
        } else if (type === "yellow") {
          ctx.drawImage(
            itemsArt,
            660,
            50,
            110,
            100,
            point.x,
            point.y,
            gab * mas,
            gab * mas
          );
        } else {
          ctx.fillStyle = type;
          ctx.fillRect(point.x, point.y, gab * mas, gab * mas);
        }

        for (let i = 0; i < point.items.length; i++) {
          const item = point.items[i];
          if (item.away) {
            if (item.width < gab) {
              item.width += 5;
              item.height += 5;
            }
            // const {deltaY, deltaX, dis} = getDistanse(point, item);
            if (!item.hz) {
              item.hz = true;
              item.awayX = item.x * mas + offsetX;
              item.awayY = item.y * mas + offsetY;
            }

            const deltaX = point.x - item.awayX;
            const deltaY = point.y - item.awayY;
            const conor = Math.atan2(deltaY, deltaX);

            item.awayX += Math.cos(conor) * item.speed;
            item.awayY += Math.sin(conor) * item.speed;
            item.speed += 3;
            // console.log(deltaX)
            if (item.image) {
              ctx.drawImage(
                item.image,
                item.imageX,
                item.imageY,
                item.imageGabX,
                item.imageGabY,
                item.awayX,
                item.awayY,
                item.width * mas,
                item.height * mas
              );
            } else {
              ctx.fillStyle = item.type;
              ctx.fillRect(
                item.awayX,
                item.awayY,
                item.width * mas,
                item.height * mas
              );
            }
          }
          // item.draw();
          if (
            !(
              item.awayX > point.x + gab * mas ||
              item.awayX + item.width * mas < point.x ||
              item.awayY > point.y + gab * mas ||
              item.awayY + item.height * mas < point.y
            )
          ) {
            point.items.splice(i, 1);
            i--;
          }
        }
      }
    });
  },
};

scorePoints.init();
