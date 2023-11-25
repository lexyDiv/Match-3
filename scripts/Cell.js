const canvas = document.getElementById("canvas");
let clientWidth = window.innerWidth;
let clientHeight = window.innerHeight;
canvas.width = clientWidth;
canvas.height = clientHeight;
let width = canvas.width;
let height = canvas.height;
const ctx = canvas.getContext("2d");

window.addEventListener("resize", () => {
  clientWidth = window.innerWidth;
  clientHeight = window.innerHeight;
  canvas.width = clientWidth;
  canvas.height = clientHeight;
  width = canvas.width;
  height = canvas.height;
});

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.item = null;
    this.width = 40;
    this.height = 40;
    this.newAnim = null;
    this.cX = this.x + this.width / 2;
    this.cY = this.y + this.height / 2;
  }
  drawOrder(gameField) {
    //this.width = gameField.width / 7;
    //this.height = gameField.height / 8;

    if (this.item) {
      this.item.drawOrder();
    }
  }
  draw() {
    if (this.hole) {
      const { gab, alpha, conor, alphaKoof } = this.hole;
      this.hole.alpha -= alphaKoof;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(
        this.x * (mas + booMas) + offsetX + (this.width * (mas + booMas)) / 2,
        this.y * (mas + booMas) + offsetY + (this.height * (mas + booMas)) / 2
      );
      ctx.rotate(conor);
      ctx.drawImage(
        hole,
        200,
        0,
        1000,
        799,
        -(this.width * (mas + booMas + gab)) / 2,
        -(this.height * (mas + booMas + gab)) / 2,
        // this.x * (mas + booMas) + offsetX,
        // this.y * (mas + booMas) + offsetY,
        this.width * (mas + booMas + gab),
        this.height * (mas + booMas + gab)
      );
      ctx.globalAlpha = 1;
      ctx.restore();
      if (this.hole.alpha <= 0) {
        this.hole = null;
      }
    }

    // ctx.drawImage(
    //   star,
    //   0,
    //   0,
    //   80,
    //   120,
    //   0,
    //   0
    //   //this.x * (mas + booMas) + offsetX,
    //   //this.y * (mas + booMas) + offsetY
    // );

    // ctx.strokeStyle = "blue";
    // ctx.strokeRect(
    //   this.x * (mas + booMas) + offsetX,
    //   this.y * (mas + booMas) + offsetY,
    //   this.width * (mas + booMas),
    //   this.height * (mas + booMas)
    // );
    if (this.item) {
      this.item.draw();
    }
    if (
      this.newAnim
    // !this.i && !this.k
      ) {

        // this.newAnim = {
        //   animX: 0,
        //   animY: 0,
        //   step : 9
        // }
        const step = this.newAnim.steps[this.newAnim.steps.length - 1]
     
        let xStep = 52;
     if(step === 1) {
      this.newAnim.animX = 0
    } else if(step === 2) {
      this.newAnim.animX = 65
    } else if(step === 3) {
      this.newAnim.animX = 120
    } else if(step === 4) {
      this.newAnim.animX = 183
    } else if(step === 5) {
      this.newAnim.animX = 240
    } else if(step === 6) {
      this.newAnim.animX = 300
    } else if(step === 7) {
      this.newAnim.animX = 358
    } else if(step === 8) {
      this.newAnim.animX = 422
    } 
   
      //const yStep = 536 / 7;
      const gabX = 40;
      const gabY = 250;

   // ctx.globalAlpha = 0.3;
   const animX = this.newAnim.animX;
  setTimeout(() => {
    ctx.drawImage(
      elektro,
      animX,
      0,
      xStep,
      237,
     ((this.x + this.width / 2) - gabX / 2) * (mas + booMas) + offsetX,
     (((this.y - this.width / 2) + this.height / 2) - gabY / 2) * (mas + booMas) + offsetY,
        gabX * (mas + booMas),
        gabY * (mas + booMas)
    );
  }, 0)


    this.newAnim.steps.pop();

  if(!this.newAnim.steps.length) {
    this.newAnim = null;
  }

  //  ctx.globalAlpha = 1

    // this.newAnim.animX += xStep;
    // if(this.newAnim.animX >= 474) {this.newAnim = null;}

    // if (this.newAnim.animX >= 467 && this.newAnim.animY >= 536) {
    //   this.newAnim = null;
    // } else if (this.newAnim.animX >= 467) {
    //   this.newAnim.animX = 0;
    //   this.newAnim.animY += yStep;
    // }

     }
  }
}
