GameField.prototype.itemsColumsMove = function () {
  for (let i = 0; i < this.columnCellsOnMove.length; i++) {
    const item = this.columnCellsOnMove[i];
    if (item.columnVector === "left") {
      item.x -= this.gabsrit / 3;
      if (item.x <= item.cell.x) {
        item.x = item.cell.x;
       // this.itemsOnMove.push(item);
        item.awatMove = 3;
        //console.log(item.oldCell)
        item.oldCell.left.hold = false;
        item.oldCell.column.needUpdate = false;
        // this.itemsMove();
        //this.columnsUpdate(item.cell.column)
        this.columnsUpdate(item.oldCell.column);

        this.columnCellsOnMove.splice(i, 1);
        i--;
      }
    } else if (item.columnVector === "right") {
      item.x += this.gabsrit / 3;
      if (item.x >= item.cell.x) {
        item.x = item.cell.x;
      //  this.itemsOnMove.push(item);
        item.awatMove = 3;
        
        item.oldCell.column.needUpdate = false;
        item.oldCell.right.hold = false;
      //  this.columnsUpdate(item.cell.column)
        this.columnsUpdate(item.oldCell.column);
        this.columnCellsOnMove.splice(i, 1);
        i--;
      }
    }
  }
};

GameField.prototype.leftRightUpdate = function () {
  if (
        this.checkStatus === 'checkLR' 
      //  && !this.itemsOnMove.length
  ) {

    this.columnsArr.forEach((column, index) => {
      let ok = true;
      let ok2 = true;
     
      for (let i = 0; i < column.cells.length; i++) {
        const cell = column.cells[i];
        if (cell.item && cell.item.y !== cell.y) {
          ok = false;
          break;
        }
      }


      if (!column.needUpdate && ok) {
        for (let i = column.cells.length - 1; i >= 0; i--) {
          const cell = column.cells[i];
          const item = cell.item;
          const leftCell = cell.left;
          if (
            !cell.block &&
            item &&
            //  item.y === cell.y &&
            leftCell &&
            !leftCell.block &&
            !leftCell.column.needUpdate &&
           !leftCell.column.itemsOnMove.length &&
            !leftCell.item &&
            leftCell.down &&
            !leftCell.down.block &&
            !leftCell.down.item &&
            !leftCell.hold
          ) {
            let targetCell;
            for (let k = leftCell.column.cells.length - 1; k >= 0; k--) {
              const cellData = leftCell.column.cells[k];
              //  console.log(cellData)
              if (!cellData.block && !cellData.item) {
                targetCell = cellData;
                break;
              }
            }

            this.columnCellsOnMove.push(cell.item);
            cell.item = null;
            item.cell = targetCell;
            item.columnVector = "left";
            targetCell.item = item;
            item.oldCell = cell;
            leftCell.hold = true;
            column.needUpdate = true;
            this.itemsOnMove.push(item);
            leftCell.column.itemsOnMove.push(item)
            break;
          }
        }
      }
    });

    this.columnsArr.forEach((column) => {
      let ok = true;
      let ok2 = true;

      for (let i = 0; i < column.cells.length; i++) {
        const cell = column.cells[i];
        if (cell.item && cell.item.y !== cell.y) {
          ok = false;
          break;
        }
      }



      if (!column.needUpdate && ok) {
        for (let i = column.cells.length - 1; i >= 0; i--) {
          const cell = column.cells[i];
          const item = cell.item;
          const rightCell = cell.right;
          if (
            !cell.block &&
            item &&
            //  item.y === cell.y &&
            rightCell &&
            !rightCell.block &&
            !rightCell.column.needUpdate &&
             !rightCell.column.itemsOnMove.length &&
            !rightCell.item &&
            rightCell.down &&
            !rightCell.down.block &&
            !rightCell.down.item &&
            !rightCell.hold
          ) {
            let targetCell;
            for (let k = rightCell.column.cells.length - 1; k >= 0; k--) {
              const cellData = rightCell.column.cells[k];
              if (!cellData.block && !cellData.item) {
                targetCell = cellData;
                break;
              }
            }

            this.columnCellsOnMove.push(cell.item);
            cell.item = null;
            item.cell = targetCell;
            item.columnVector = "right";
            targetCell.item = item;
            rightCell.hold = true;
            item.oldCell = cell;
            column.needUpdate = true;
            this.itemsOnMove.push(item);
            rightCell.column.itemsOnMove.push(item)
            break;
          }
        }
      }
    });
    if (
      !this.threeInLine.length &&
      !this.itemsOnMove.length &&
      !this.onDestroy.length &&
      !this.drawAreaA.length &&
     // !this.checkStatus &&
      !this.columnCellsOnMove.length &&
      !this.case
    ) {
       console.log('HERE')
      this.checkStatus = 'getThreeInLine'
      this.userStop = false;
    }
  }

 // console.log(this.userStop);
};

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
