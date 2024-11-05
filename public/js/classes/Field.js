
export class Field {
    constructor(rows, cols, game) {
        this.rows = rows;
        this.cols = cols;
        this.colorType = {0: [64, 64, 64], 1: [191, 127, 255], 2: [255,191,127], 3: [127,255,255], 4: [255,255,127], 5: [127,255,127], 6: [127,191,255], 7:[255,127,127], 8:[255, 255, 255]};
        this.grid = this.initializeGrid(rows, cols);
        this.game = game;
    }

    initializeGrid(rows, cols) {
        let grid = [];
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }

    addTetromino(tetro) {
        for (let y = 0; y < tetro.shape.length; y++) {
            for (let x = 0; x < tetro.shape[y].length; x++) {
                let colorCode = tetro.shape[y][x];
                if (colorCode != 0) {
                    this.grid[tetro.y+y][tetro.x+x] = colorCode;
                }
            }
        }
        this.game.doHold = true;
    }

    isClear() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x] != 0) return false;
            }
        }

        return true;
    }

    clearLines() {
        let linesCleared = 0;
        let arrY = [];
        for (let y = this.rows - 1; y >= 0; y--) {
            let isFull = true;
    
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x] === 0) {
                    isFull = false;
                    break;
                }
            }
    
            if (isFull) {
                arrY.push(y);
            }
        }

        
        if (arrY.length) {
            for (let i = 0; i < arrY.length; i++) {
                let y = arrY[i];
                for (let x = 0; x < this.cols; x++) {
                    this.grid[y][x] = 8;
                }
            }
            this.game.renderer.drawField(this.game.field);
            
            let increment = 0;
            for (let i = 0; i < arrY.length; i++) {
                let y = arrY[i] + increment;
                this.grid.splice(y, 1);
                this.grid.unshift(new Array(this.cols).fill(0));
                this.game.sound.clearLines();
                increment++;
                linesCleared++;
            }
        }
        
        
        return linesCleared;
    }


}