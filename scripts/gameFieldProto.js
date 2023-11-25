GameField.prototype.rocketsOrder = function () {
  for (let i = 0; i < this.rocketsOnDraw.length; i++) {
    const rocket = this.rocketsOnDraw[i];
    if (rocket.type === "left" || rocket.type === "up") {
      rocket.speed -= 1.5;
      rocket.type === "left"
        ? (rocket.x += rocket.speed)
        : (rocket.y += rocket.speed);
    } else if (rocket.type === "right" || rocket.type === "down") {
      rocket.speed += 1.5;
      rocket.type === "right"
        ? (rocket.x += rocket.speed)
        : (rocket.y += rocket.speed);
    }
    const x = rocket.x * mas + offsetX;
    const y = rocket.y * mas + offsetY;
    if (x < 0 || x > width || y < 0 || y > height) {
      this.rocketsOnDraw.splice(i, 1);
      i--;
    }
    rocket.width++;
    rocket.height++;
  }
  for (let i = 0; i < this.rockets.length; i++) {
    const rocket = this.rockets[i];
    if (rocket.type === "left") {
      for (let k = 0; k < this.cells[rocket.i].length; k++) {
        const cell = this.cells[rocket.i][k];
        if (cell.k < rocket.k && cell.item && rocket.x < cell.x) {
          this.addAndingItem(cell);
        }
      }
    } else if (rocket.type === "right") {
      for (let k = 0; k < this.cells[rocket.i].length; k++) {
        const cell = this.cells[rocket.i][k];
        if (cell.k > rocket.k && cell.item && rocket.x > cell.x) {
          this.addAndingItem(cell);
        }
      }
    } else if (rocket.type === "up") {
      for (let i = rocket.i; i >= 0; i--) {
        const cell = gameField.cells[i][rocket.k];
        if (cell.item && rocket.y < cell.y) {
          this.addAndingItem(cell);
        }
      }
    } else if (rocket.type === "down") {
      for (let i = rocket.i; i < gameField.cells.length; i++) {
        const cell = gameField.cells[i][rocket.k];
        if (cell.item && rocket.y > cell.y) {
          this.addAndingItem(cell);
        }
      }
    }

    if (
      rocket.x + rocket.width < this.x ||
      rocket.x > this.x + this.width ||
      rocket.y + rocket.height < this.y ||
      rocket.y > this.y + this.height
    ) {
      this.rockets.splice(i, 1);
      i--;
    }
  }
};

GameField.prototype.drawRockets = function () {
  for (let i = 0; i < this.rocketsOnDraw.length; i++) {
    const rocketData = this.rocketsOnDraw[i];
    ctx.save();
    ctx.translate(
      (rocketData.x + rocketData.width / 2) * (mas + booMas) + offsetX,
      (rocketData.y + rocketData.height / 2) * (mas + booMas) + offsetY
    );

    if (rocketData.type === "left" || rocketData.type === "up") {
      rocket.x += rocket.speed;
      rocketData.type === "left" && ctx.rotate(-(90 * Math.PI) / 180);
      ctx.drawImage(
        rocketGo,
        rocketData.aX,
        0,
        100,
        200,
        -(rocketData.width / 2) * (mas + booMas),
        -(rocketData.height / 2) * (mas + booMas),
        rocketData.width * (mas + booMas),
        rocketData.height * (mas + booMas)
      );
    }

    if (rocketData.type === "right" || rocketData.type === "down") {
      rocketData.type === "right"
        ? ctx.rotate((90 * Math.PI) / 180)
        : ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(
        rocketGo,
        rocketData.aX,
        0,
        100,
        200,
        -(rocketData.width / 1.9) * (mas + booMas),
        -(rocketData.height / 2) * (mas + booMas),
        rocketData.width * (mas + booMas),
        rocketData.height * (mas + booMas)
      );
    }

    ctx.restore();
    rocketData.aX += 100;
    rocketData.aX === 1600 ? (rocketData.aX = 0) : false;
  }
};
