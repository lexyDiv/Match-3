let ok = false;

class GameField {
  constructor() {
    this.lines = 9;
    this.columns = 8;
    this.koof = this.lines / this.columns;
    this.cells = [];
    this.click = null;
    this.cellsOnMove = [];
    this.width = 320;
    this.height = 360;
    this.x = 0;
    this.y = 0;
    this.moveKoof = 15;
    this.gabsrit = 40;
    this.speed = this.gabsrit / this.moveKoof;
    this.onDestroy = [];
    this.cellsArrey = [];
    this.onBooDraw = [];
    this.drawAreaA = [];
    this.drawAreaB = [];
    this.drawAreaC = [];
    this.itemsOnMove = [];
    this.crash = 0;
    this.update = true;
    this.checkStatus = "";
    this.booMas = [];
    this.ticker = 0;
    this.rockets = [];
    this.rocketsOnDraw = [];
    this.userMove = false;
    this.columnCellsOnMove = [];
    this.threeInLine = [];
    this.userStop = 0;
  }

  controller() { // old ok
    if (!this.case && !this.rockets.length) {
      if (
        this.checkStatus === "getThreeInLine" &&
        //this.threeInLine.length &&
        !this.itemsOnMove.length
      ) {
        this.getGroops();
        this.getThreeInLine();
        this.threeInLine.forEach((obj) => {
          const arg = !this.userMove ? obj.cells[0] : this.targetCell;
          obj.cells.forEach((cell) => {
            this.addAndingItem(cell, arg);
          });
        });
        this.userMove = false;
        this.checkStatus = "columnsComplite";
      }  if (
        this.checkStatus === "columnsComplite" &&
        !this.onDestroy.length &&
        !this.drawAreaA.length
      ) {
        this.columnsUpdate();
        this.checkStatus = "getThreeInLine";
      }   if (
        !this.threeInLine.length &&
        !this.itemsOnMove.length &&
        !this.onDestroy.length &&
        !this.drawAreaA.length &&
        this.checkStatus
      ) {
        this.checkStatus = "checkLR"
         //this.leftRightUpdate();
        // this.columnCellsOnMove.length ? this.checkStatus = "checkLR" : this.checkStatus = ''

      } 
    }
  }

  // controller() { // old ok
  //   if (!this.case && !this.rockets.length) {
  //     if (
  //       this.checkStatus === "getThreeInLine" &&
  //       this.threeInLine.length &&
  //       !this.itemsOnMove.length
  //     ) {
  //       this.getGroops();
  //       this.getThreeInLine();
  //       this.threeInLine.forEach((obj) => {
  //         const arg = !this.userMove ? obj.cells[0] : this.targetCell;
  //         obj.cells.forEach((cell) => {
  //           this.addAndingItem(cell, arg);
  //         });
  //       });
  //       this.userMove = false;
  //       this.checkStatus = "columnsComplite";
  //     }  if (
  //       this.checkStatus === "columnsComplite" &&
  //       !this.onDestroy.length &&
  //       !this.drawAreaA.length
  //     ) {
  //       this.columnsUpdate();
  //       this.checkStatus = "getThreeInLine";
  //     }  if (
  //       !this.threeInLine.length &&
  //       !this.itemsOnMove.length &&
  //       !this.onDestroy.length &&
  //       !this.drawAreaA.length &&
  //       this.checkStatus
  //     ) {
  //       console.log('here update')
  //       this.checkStatus = "";
  //     }
  //   }
  // }

  itemsMove() {
    // let go = false;
    // this.cellsArrey.forEach((cell) => {
    //   if (cell.item && cell.item.y < cell.y) {
    //     go = true;
    //   }
    // });
    //   if (go) {
    for (let i = 0; i < this.itemsOnMove.length; i++) {
      const item = this.itemsOnMove[i];
      if(item.x === item.cell.x) {
        const cell = item.cell;
        item.awatMove--;
        if (item.awatMove <= 0) {
          item.y += this.gabsrit / 3;
          if (item.y >= cell.y) {
            item.y = cell.y;
            this.itemsOnMove.splice(i, 1);
            item.cell.column.itemsOnMove.splice(item.cell.column.itemsOnMove.indexOf(item), 1)
            i--;
          }
        }
      }
    }
    //  }
    //  else {
    //   this.itemsOnMove = []
    // }
  }

  getValidTypes(cell, fare) {
    const validTypes = JSON.parse(JSON.stringify(types));
    if (fare) {
      around.forEach((vector) => {
        if (cell[vector] && cell[vector].item && !cell[vector].item.special) {
          validTypes.splice(validTypes.indexOf(cell[vector].item.type), 1);
        }
      });
    }
    return validTypes;
  }

  columnsUpdate(column) {
    // this.getGroops();
    //this.getThreeInLine();
    this.crash++;
    // console.log("columns update : ", this.crash);
    const fare = Math.floor(Math.random() * 4);
    //  if(!fare) {
    //   console.log('fare-ramdom')
    // }
    if (!column) {
      this.columnsArr.forEach((column) => {
        const items = [];
        column.cells.forEach((cell) => {
          if (cell.item) {
            items.push(cell.item);
            cell.item = null;
          }
        });
        let newItemNum = 1;
        let itemNum = 0;
        for (let i = column.cells.length - 1; i >= 0; i--) {
          const cell = column.cells[i];
          const item = items[items.length - 1];
          if (item) {
            item.cell = cell;
            cell.item = item;
            item.awatMove = itemNum * 2;
            itemNum++;
            if (item.y !== item.cell.y) {
              this.itemsOnMove.push(item);
            }
            items.pop();
          } else if (column.bornCell) {
            const newItem = new Item(cell, this.getValidTypes(cell, fare));
            newItem.newAnim = true;
            const ran = Math.floor(Math.random() * 30);
            if (!ran) {
              newItem.special = true;
              newItem.type =
                busters[Math.floor(Math.random() * busters.length)];
            }
            cell.item = newItem;
            newItem.y = -this.gabsrit * newItemNum;
            newItem.awatMove = (newItemNum + itemNum) * 2;
            this.itemsOnMove.push(newItem);
            newItemNum++;
            //cell.item = null;
          }
        }
        //console.log(items[items.length - 1].type)
      });
    } else {
      const items = [];
      column.cells.forEach((cell) => {
        if (cell.item) {
          items.push(cell.item);
          cell.item = null;
        }
      });
      let newItemNum = 1;
      let itemNum = 0;
      for (let i = column.cells.length - 1; i >= 0; i--) {
        const cell = column.cells[i];
        const item = items[items.length - 1];
        if (item) {
          item.cell = cell;
          cell.item = item;
          item.awatMove = 0//itemNum * 2;
          itemNum++;
          if (item.y !== item.cell.y) {
            this.itemsOnMove.push(item);
          }
          items.pop();
        } else if (column.bornCell) {
          const newItem = new Item(cell, this.getValidTypes(cell, fare));
          newItem.newAnim = true;
          const ran = Math.floor(Math.random() * 30);
          if (!ran) {
            newItem.special = true;
            newItem.type = busters[Math.floor(Math.random() * busters.length)];
          }
          cell.item = newItem;
          newItem.y = -this.gabsrit * newItemNum;
          newItem.awatMove = 0//(newItemNum + itemNum) * 2;
          this.itemsOnMove.push(newItem);
          newItemNum++;
          //cell.item = null;
        }
      }
    }
    // console.log(this.itemsOnMove);
  }
  drawBoo() {
    this.drawAreaA.forEach((item) => item.booDraw());
    this.drawAreaC.forEach((item) => item.booDraw());
  }
  booOrder() {
    if (this.onBooDraw.length) {
      this.drawAreaA = [];
      this.drawAreaB = [];
      this.drawAreaC = [];

      for (let i = 0; i < this.onBooDraw.length; i++) {
        const item = this.onBooDraw[i].item;
        // item.booDrawOrder();
        if (item.booOut && item.finishOut) {
          this.onBooDraw.splice(i, 1);
          i--;
        } else if (!item.special) {
          !item.booOut && this.drawAreaA.push(item);
          !item.finishOut && this.drawAreaB.push(item);
        } else {
          this.drawAreaC.push(item);
        }
      }
    }
    // if (
    //   !this.drawAreaA.length &&
    //   this.case &&
    //   this.case.type === "destroy" &&
    //   this.case.check
    // ) {
    //  // console.log('here')
    //   this.columnsUpdate();
    //  // this.case = { type: "updateField", out: true };
    // }
  }
  destroyOrder() {
    if (this.onDestroy.length) {
      for (let i = 0; i < this.onDestroy.length; i++) {
        const desItem = this.onDestroy[i];
        if (!desItem.awaitDestroy) {
          if (
            scorePoints &&
            !desItem.item.special &&
            scorePoints[desItem.item.type]
          ) {
            //console.log('here')
            scorePoints[desItem.item.type].items.push(desItem.item);
          } else if (!desItem.item.special) {
            scorePoints.onDestroy.unshift(desItem.item);
          }

          desItem.item.type !== "hor" && desItem.item.type !== "ver"
            ? (desItem.item.cell.hole = {
                alpha: 1,
                conor: Math.random() * 2,
                gab:
                  desItem.item.type === "around"
                    ? Math.random() + 5
                    : Math.random(),
                alphaKoof: desItem.item.type === "around" ? 0.01 : 0.02,
              })
            : false;
          //desItem.item.readyToGo = true;
          if (desItem.item.special) {
            if (desItem.item.type === "around") {
              this.booMas = [];
              for (let j = 1; j < 20; j++) {
                j % 2 === 0
                  ? this.booMas.unshift(0.3 / j)
                  : this.booMas.unshift(-0.3 / j);
              }
              const aroundCells = this.cellsArrey.filter(
                (cell) => getDistanse(desItem.item, cell).dis <= 113
              );
              aroundCells.forEach((cell) => {
                if (cell.item && !cell.item.destroy) {
                  // const { dis } = getDistanse(desItem.item, cell);
                  // const awaitDestroy = Math.ceil(dis / 10);
                  cell.item.destroy = true;
                  //const endindItem = { item: cell.item, awaitDestroy };
                  this.addAndingItem(cell, desItem.item.cell);
                }
              });
            } else if (desItem.item.type === "hor") {
              const left = {
                x: desItem.item.x,
                y: desItem.item.y,
                width: desItem.item.width,
                height: desItem.item.height,
                aX: 0,
                aY: 0,
                type: "left",
                i: desItem.item.cell.i,
                k: desItem.item.cell.k,
                speed: 0,
              };
              const right = {
                x: desItem.item.x,
                y: desItem.item.y,
                width: desItem.item.width,
                height: desItem.item.height,
                aX: 0,
                aY: 0,
                type: "right",
                i: desItem.item.cell.i,
                k: desItem.item.cell.k,
                speed: 0,
              };
              this.rockets.push(left, right);
              this.rocketsOnDraw.push(left, right);
            } else if (desItem.item.type === "ver") {
              const up = {
                x: desItem.item.x,
                y: desItem.item.y,
                width: desItem.item.width,
                height: desItem.item.height,
                aX: 0,
                aY: 0,
                type: "up",
                i: desItem.item.cell.i,
                k: desItem.item.cell.k,
                speed: 0,
              };
              const down = {
                x: desItem.item.x,
                y: desItem.item.y,
                width: desItem.item.width,
                height: desItem.item.height,
                aX: 0,
                aY: 0,
                type: "down",
                i: desItem.item.cell.i,
                k: desItem.item.cell.k,
                speed: 0,
              };
              this.rockets.push(up, down);
              this.rocketsOnDraw.push(up, down);
            }
          }
          desItem.item.cell.item = null;
          desItem.item.type !== "hor" && desItem.item.type !== "ver"
            ? this.onBooDraw.push(...this.onDestroy.splice(i, 1))
            : this.onDestroy.splice(i, 1);
          i--;
        }
        desItem.awaitDestroy -= 1;
      }
    }
    // console.log(this.onBooDraw)
  }
  cellsItemsMove() {
    // console.log(this.cellsOnMove.length)
    for (let i = 0; i < this.cellsOnMove.length; i++) {
      const item = this.cellsOnMove[i];
      if (!item.moveSteps) {
        item.moveSteps = this.moveKoof;
        item.gSp = item.cell.x - item.x;
        item.vSp = item.cell.y - item.y;
      }
      item.moveSteps--;
      item.x += item.gSp / (this.gabsrit / this.speed);
      item.y += item.vSp / (this.gabsrit / this.speed);
      if (!item.moveSteps) {
        item.x = item.cell.x;
        item.y = item.cell.y;
        this.cellsOnMove.splice(i, 1);
        i--;
      }
    }
    if (!this.cellsOnMove.length && this.case) {
      this.getGroops();
      this.getThreeInLine();
      if (!this.threeInLine.length) {
        const focusCellItemType = this.case.focusCell.item.type;
        const targetCellItemType = this.case.targetCell.item.type;
        this.case.focusCell.item.type = targetCellItemType;
        this.case.targetCell.item.type = focusCellItemType;
        this.focusCell = null;
      }
      this.case = null;
      this.checkStatus = "getThreeInLine";
    }
  }
  addAndingItem(cell, target) {
    // console.log('target : ', target)
    const { dis } = target ? getDistanse(cell, target) : { dis: 0 };
    const awaitDestroy = Math.ceil(dis / 10);
    cell.item.destroy = true;
    const endindItem = { item: cell.item, awaitDestroy };
    cell.item.stopStar = true;

    this.onDestroy.push(endindItem);
  }
  caseOrder() {
    if (this.case) {
      if (this.case.type === "user-move" && !this.case.check) {
        const focusCellItem = this.case.focusCell.item;
        const targetCellItem = this.case.targetCell.item;
        this.case.targetCell.item = focusCellItem;
        this.case.focusCell.item = targetCellItem;
        focusCellItem.cell = this.case.targetCell;
        targetCellItem.cell = this.case.focusCell;
        this.cellsOnMove.push(
          this.case.targetCell.item,
          this.case.focusCell.item
        );
        this.targetCell = this.case.targetCell;
        this.case.check = true;
        this.userMove = true;
      }
    }
  }
  clickOrder() {
    const deltaX = this.click.lastX - this.click.x;
    const deltaY = this.click.lastY - this.click.y;
    const c = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (Math.abs(c) >= this.cells[0][0].width / 5) {
      const rose = Math.abs(deltaX) > Math.abs(deltaY) ? "hor" : "ver";
      if (rose === "hor") {
        this.vector = deltaX > 0 ? "right" : "left";
      } else if (rose === "ver") {
        this.vector = deltaY > 0 ? "down" : "up";
      }
      const focusCell = this.focusCell;
      const targetCell = this.focusCell[this.vector];
      focusCell &&
      targetCell &&
      focusCell.item &&
      !focusCell.item.special &&
      targetCell.item &&
      !targetCell.item.special
        ? (this.case = {
            type: "user-move",
            focusCell,
            targetCell,
          })
        : false;
    }
    this.click = null;
    this.userStop = true;
  }
  getThreeInLine() {
    this.threeInLine = [];
    this.cells.forEach((line) =>
      line.forEach((cell) => {
        if (cell.item && !cell.item.special) {
          if (
            (cell.left &&
              cell.left.item &&
              !cell.left.item.special &&
              cell.left.groop === cell.groop &&
              cell.right &&
              cell.right.item &&
              !cell.right.item.special &&
              cell.right.groop === cell.groop &&
              this.threeInLine.indexOf(cell.groop) === -1) ||
            (cell.up &&
              cell.up.item &&
              !cell.up.item.special &&
              cell.up.groop === cell.groop &&
              cell.down &&
              cell.down.item &&
              !cell.down.item.special &&
              cell.down.groop === cell.groop &&
              this.threeInLine.indexOf(cell.groop) === -1)
          ) {
            this.threeInLine.push(cell.groop);
          }
        }
      })
    );
    // console.log(this.threeInLine); /// !!!!!!!!!!!!!!!
  }

  rec(cell) {
    for (let i = 0; i < around.length; i++) {
      if (
        cell[around[i]] &&
        cell[around[i]].item &&
        (cell[around[i]].item.type === cell.item.type ||
          cell[around[i]].item.special) &&
        cell.groop.cells.indexOf(cell[around[i]]) === -1
      ) {
        cell[around[i]].groop = cell.groop;
        cell.groop.cells.push(cell[around[i]]);
        !cell[around[i]].item.special && this.rec(cell[around[i]]);
      }
    }
  }

  getGroops() {
    this.groops = [];
    this.cells.forEach((line) =>
      line.forEach((cell) => {
        cell.groop = null;
      })
    );
    this.cells.forEach((lines) =>
      lines.forEach((cell) => {
        if (!cell.groop && cell.item && !cell.item.special) {
          const groop = { cells: [cell] };
          cell.groop = groop;
          this.groops.push(groop);
        }
        cell.item && !cell.item.special && this.rec(cell);
      })
    );
   // console.log(this.groops)
   
  }

  getColumns() {
    this.columnsArr = [];
    for (let i = 0; i < this.columns; i++) {
      this.columnsArr.push({ cells: [], itemsOnMove: [] });
      for (let k = 0; k < this.lines; k++) {
        if (this.cells[k][i].block) {
          if (this.cells[k][i].down && !this.cells[k][i].down.block) {
            this.columnsArr.push({ cells: [], itemsOnMove: []  });
          }
        } else {
          const cell = this.cells[k][i];
          cell.column = this.columnsArr[this.columnsArr.length - 1];
          cell.canBorn
            ? (this.columnsArr[this.columnsArr.length - 1].bornCell = cell)
            : false;
          this.columnsArr[this.columnsArr.length - 1].cells.push(cell);
        }
      }
    }
    this.columnsArr = this.columnsArr.filter((column) => column.cells.length);
   // console.log(this.columnsArr);
  }

  // getColumns() { // ok!!!!
  //   this.columnsArr = [];
  //   for (let i = 0; i < this.columns; i++) {
  //     this.columnsArr.push({ cells: [] });
  //     for (let k = 0; k < this.lines; k++) {
  //       if (this.cells[k][i].block) {
  //         break;
  //       }
  //       const cell = this.cells[k][i];
  //       cell.canBorn ? (this.columnsArr[i].bornCell = cell) : false;
  //       this.columnsArr[i].cells.push(cell);
  //     }
  //   }
  //   // console.log(this.columnsArr)
  // }

  fieldCollision(cursor) {
    const x = this.x * (mas + booMas) + offsetX;
    const y = this.y * (mas + booMas) + offsetY;
    if (
      !(
        cursor.x < x ||
        cursor.x > x + this.width * (mas + booMas) ||
        cursor.y < y ||
        cursor.y > y + this.height * (mas + booMas)
      )
    ) {
      const cellData = this.cells[0][0];
      const i = Math.floor((cursor.y - y) / (cellData.height * (mas + booMas)));
      const k = Math.floor((cursor.x - x) / (cellData.width * (mas + booMas)));
      this.cells[i][k].focus = true;
      this.focusCell = this.cells[i][k];
    }
  }
  draw() {
    // ctx.strokeStyle = "green";
    // ctx.strokeRect(
    //   this.x * (mas + booMas) + offsetX,
    //   this.y * (mas + booMas) + offsetY,
    //   this.width * (mas + booMas),
    //   this.height * (mas + booMas)
    // );
    ctx.drawImage(
      fon2,
      50,
      20,
      310,
      730,
      (this.x - 10) * (mas + booMas) + offsetX,
      (this.y - 10) * (mas + booMas) + offsetY,
      (this.width + 20) * (mas + booMas),
      (this.height + 20) * (mas + booMas)
    );
    this.cells.forEach((line) => {
      line.forEach((cell) => cell.draw());
    });
  }


  fieldInit() {
    this.cells = [];
    for (let i = 0; i < this.lines; i++) {
      this.cells.push([]);
      for (let k = 0; k < this.columns; k++) {
        const cell = new Cell(
          this.x + k * (this.width / this.columns),
          this.y + i * (this.height / this.lines)
        );
        cell.i = i;
        cell.k = k;
        if (
          //  (i === 0 &&
          //   k === 3
          //  )
          //  ||
          (i === 0 && k === 0) ||
          (i === 0 && k === 1) ||
          (i === 0 && k === 2) ||
          (i === 0 && k === 3) ||
          (i === 0 && k === 5) ||
          (i === 1 && k === 0) ||
          (i === 0 && k === 7) ||
          (i === 0 && k === 6) ||
          (i === 1 && k === 7)
        ) {
          cell.block = true;
        }
        !i && !cell.block ? (cell.canBorn = true) : false;
        this.cells[i].push(cell);
        this.cellsArrey.push(cell);
      }
    }

    // this.cells.forEach((line, i) =>
    //   line.forEach((cell, k) => {
    //     if (userField[i][k] === "w") {
    //       cell.block = true;
    //     } else {
    //       let type = colorsData[userField[i][k]];
    //       if (type) {
    //       //  console.log(type);
    //         if (type && type !== "z") {
    //           const item = new Item(cell, types, type);
    //           cell.item = item;
    //         } else if (type === "z") {
    //           const buster = new Item(cell, busters);
    //           buster.special = true;
    //           cell.item = buster;
    //           // console.log(buster)
    //         }
    //       }
    //     }
    //     if (this.cells[i][k - 1]) {
    //       cell.left = this.cells[i][k - 1];
    //     }
    //     if (this.cells[i][k + 1]) {
    //       cell.right = this.cells[i][k + 1];
    //     }
    //     if (this.cells[i - 1] && this.cells[i - 1][k]) {
    //       cell.up = this.cells[i - 1][k];
    //     }
    //     if (this.cells[i + 1] && this.cells[i + 1][k]) {
    //       cell.down = this.cells[i + 1][k];
    //     }
    //   })
    // );
    ////////////////////////////////////////////////////////////////////////
    for (let i = 0; i < 1; i++) {
      const bI = Math.floor(Math.random() * this.lines);
      const bK = Math.floor(Math.random() * this.columns);
      const bCell = this.cells[bI][bK];
     if(!bCell.block) {
      const buster = new Item(bCell, busters);
      buster.special = true;
      bCell.item = buster;
     }
    }
    // console.log(buster.type);
    this.cells.forEach((line, i) => {
      line.forEach((cell, k) => {
        if (this.cells[i][k - 1]) {
          cell.left = this.cells[i][k - 1];
        }
        if (this.cells[i][k + 1]) {
          cell.right = this.cells[i][k + 1];
        }
        if (this.cells[i - 1] && this.cells[i - 1][k]) {
          cell.up = this.cells[i - 1][k];
        }
        if (this.cells[i + 1] && this.cells[i + 1][k]) {
          cell.down = this.cells[i + 1][k];
        }
        if (!cell.block) {
          const validTypes = [...types];
          if (
            this.cells[i][k - 1] &&
            !this.cells[i][k - 1].block &&
            this.cells[i][k - 2] &&
            this.cells[i][k - 2].item &&
            this.cells[i][k - 1].item &&
            !this.cells[i][k - 2].block &&
            this.cells[i][k - 1].item.type === this.cells[i][k - 2].item.type
          ) {
            const index = validTypes.indexOf(this.cells[i][k - 2].item.type);
            index !== -1 && validTypes.splice(index, 1);
          }
          if (
            this.cells[i - 1] &&
            this.cells[i - 2] &&
            this.cells[i - 1][k] &&
            this.cells[i - 2][k] &&
            !this.cells[i - 1][k].block &&
            !this.cells[i - 2][k].block &&
            this.cells[i - 1][k].item &&
            this.cells[i - 2][k].item &&
            this.cells[i - 1][k].item.type === this.cells[i - 1][k].item.type
          ) {
            const index = validTypes.indexOf(this.cells[i - 2][k].item.type);
            index !== -1 && validTypes.splice(index, 1);
          }

          const item = new Item(cell, validTypes);

          !cell.item ? (cell.item = item) : false;
        }
      });
    });
    //
  }
  getPotentialThree() {
    let variants = [];
    for (let i = 0; i < this.lines; i++) {
      for (let k = 0; k < this.columns; k++) {
        const cell = this.cells[i][k];
        const item = cell.item;
        item &&
          !item.special &&
          around.forEach((vector) => {
            const targetCell = cell[vector];
            const type = cell.item.type;
            const targetType =
              targetCell &&
              targetCell.item &&
              !targetCell.item.special &&
              targetCell.item.type;
            if (type && targetType) {
              cell.item.type = targetType;
              targetCell.item.type = type;
              this.getGroops();
              this.getThreeInLine();
              const variant = {
                vector,
                cell: { i: cell.i, k: cell.k },
                cellsLength: 0,
              };
              this.threeInLine.forEach((el) => {
                variant.cellsLength += el.cells.length;
              });
              if (variant.cellsLength) {
                variants.push(variant);
              }
              cell.item.type = type;
              targetCell.item.type = targetType;
            }
          });
      }
    }
    // console.log(variants);
  }
}
