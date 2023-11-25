const types = ["violet", "green", "red", "blue", "yellow"];
const busters = [
  "hor",
  "ver",
  "around",
  // "cross"
];
const around = ["left", "right", "up", "down"];
let mas = 1;
let booMas = 0;
let offsetX = 0;
let offsetY = 0;

const stars = [];
let baseFoneAlpha = 0;

class Item {
  constructor(cell, types, type) {
    this.cell = cell;
    this.x = this.cell.x;
    this.y = this.cell.y;
    this.width = this.cell.width;
    this.height = this.cell.height;
    this.type = type ? type : types[Math.floor(Math.random() * types.length)];
    this.deltaX = 0;
    this.deltaY = 0;
    this.moveAccum = 0;
    this.booAnimX = 0;
    this.booAnimY = 0;
    this.animX = 0;
    this.animY = 0;
    this.aX = 0;
    this.aY = 0;
    this.speed = 0;
    this.awayX = this.x;
    this.awayY = this.y;
    this.speed = 0;
    this.outY = 0;
    this.outSpeed = 0;
    this.pieseKoof = 0;
    this.outGab = 0;
    this.outTik = 0;
  }

  booDraw() {
    this.away = true;
    let koof = 4;
    let bugKoofX = -6;
    let bugKoofY = -6;
    ctx.globalAlpha = 0.9;
    if (this.special) {
      koof = 10;
      bugKoofX = -30;
      bugKoofY = -25;
      ctx.globalAlpha = 1;
    }
    ctx.drawImage(
      images[this.type],
      this.booAnimX,
      this.booAnimY,
      this.animStepX,
      this.animStepY,
      (this.cell.x + bugKoofX + this.width / 2 - (this.width * koof) / 2) *
        (mas + booMas) +
        offsetX,
      (this.cell.y + bugKoofY + this.height / 2 - (this.height * koof) / 2) *
        (mas + booMas) +
        offsetY,
      this.width * koof * (mas + booMas),
      this.height * koof * (mas + booMas)
    );
    ctx.globalAlpha = 1;
    this.booDrawOrder();
  }

  booDrawOrder() {
    if (!this.special) {
      this.animWidth = 800;
      this.animHeight = 800;
      this.animStepX = this.animWidth / 4;
      this.animStepY = this.animHeight / 4;
    } else if (this.type === "around") {
      this.animWidth = 960;
      this.animHeight = 480;
      this.animStepX = this.animWidth / 10;
      this.animStepY = this.animHeight / 5;
    }
    this.booAnimX += this.animStepX;
    if (
      this.booAnimX >= this.animWidth - this.animStepX &&
      this.booAnimY >= this.animHeight
    ) {
      this.booOut = true;
      this.finishOut = true;
    } else if (this.booAnimX >= this.animWidth) {
      this.booAnimX = 0;
      this.booAnimY += this.animStepY;
    }
  }
  draw() {
    if (this.type === "blue") {
      this.image = itemsArt;
      this.imageGabX = 110;
      this.imageGabY = 100;
      this.imageX = 30;
      this.imageY = 55;
    } else if (this.type === "yellow") {
      this.image = itemsArt;
      this.imageGabX = 110;
      this.imageGabY = 100;
      this.imageX = 660;
      this.imageY = 50;
    } else if (this.type === "red") {
      this.image = itemsArt;
      this.imageGabX = 110;
      this.imageGabY = 100;
      this.imageX = 157;
      this.imageY = 50;
    } else if (this.type === "green") {
      this.image = itemsArt;
      this.imageGabX = 110;
      this.imageGabY = 100;
      this.imageX = 410;
      this.imageY = 50;
    } else if (this.type === "violet") {
      this.image = itemsArt;
      this.imageGabX = 110;
      this.imageGabY = 100;
      this.imageX = 535;
      this.imageY = 50;
    } else if (this.type === "around") {
    }
    if (this.newAnim && this.y + this.height * 2 > gameField.y) {
      baseFoneAlpha = 0.3;
      this.newAnim = false;
      const steps = [1, 2, 3, 4, 5, 6, 7, 8];
      gameField.cells[0][this.cell.k].newAnim = {
        animX: 0,
        animY: 0,
        steps: [],
      };
      while (steps.length) {
        gameField.cells[0][this.cell.k].newAnim.steps.push(
          ...steps.splice([Math.floor(Math.random() * steps.length)], 1)
        );
      }
    }
    if (this.y + gameField.gabsrit / 2 > gameField.y) {
      if (this.image) {
        ctx.drawImage(
          this.image,
          this.imageX,
          this.imageY,
          this.imageGabX,
          this.imageGabY,
          this.x * (mas + booMas) + offsetX,
          this.y * (mas + booMas) + offsetY,
          this.width * (mas + booMas),
          this.height * (mas + booMas)
        );
      } else if (this.type === "around") {
        ctx.drawImage(
          aroundAnimItem,
          this.aX,
          this.aY,
          199,
          200,
          (this.x + 5) * (mas + booMas) + offsetX,
          (this.y - 4) * (mas + booMas) + offsetY,
          this.width * (mas + booMas),
          this.height * (mas + booMas)
        );
        this.aX += 200;
        this.aX === 1000 ? (this.aX = 0) : false;
      } else if (this.type === "hor" || this.type === "ver") {
        ctx.save();
        ctx.translate(
          (this.x + this.width / 2) * (mas + booMas) + offsetX,
          (this.y + this.height / 2) * (mas + booMas) + offsetY
        );
        this.type === "hor" && ctx.rotate(-(90 * Math.PI) / 180);
        ctx.drawImage(
          rocket,
          this.aX,
          0,
          100,
          200,
          -(this.width / 2) * (mas + booMas),
          -(this.height / 2) * (mas + booMas),
          this.width * (mas + booMas),
          this.height * (mas + booMas)
        );
        ctx.rotate((180 * Math.PI) / 180);
        ctx.drawImage(
          rocket,
          this.aX,
          0,
          100,
          200,
          -(this.width / 1.9) * (mas + booMas),
          -(this.height / 2) * (mas + booMas),
          this.width * (mas + booMas),
          this.height * (mas + booMas)
        );

        ctx.restore();
        gameField.ticker % 2 === 0 ? (this.aX += 100) : false;
        this.aX === 1600 ? (this.aX = 0) : false;
      }
      this.cell.focus = false;
      if (
        !this.special &&
        (!this.star || this.star.out) &&
        !Math.floor(Math.random() * 200)
      ) {
        this.star = {
          offsetX: Math.floor(Math.random() * 3) + 1.1,
          offsetY: Math.floor(Math.random() * 3) + 1.1,
          gab: 50,
          item: this,
          conor: 0,
          conorKoof: Math.floor(Math.random() * 2) ? 0.1 : -0.1,
        };
        stars.push(this.star);
      }
    }
  }
}
