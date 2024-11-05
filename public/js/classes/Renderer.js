
export class Renderer {
    constructor(canvas, context, nextCanvas, nextContext, next3Canvas, next3Context, holdCanvas, holdContext, game) {
        this.canvas = canvas;
        this.context = context;
        this.blockSize = 27;
        this.canvas.width = this.blockSize * 10;
        this.canvas.height = this.blockSize * 20;

        this.canvas.style.backgroundColor = "gray";

        this.miniWidth = 5;

        this.nextCanvas = nextCanvas;
        this.nextContext = nextContext;
        this.nextCanvas.width = this.blockSize * this.miniWidth;
        this.nextCanvas.height = this.blockSize * 4;
        this.nextCanvas.style.backgroundColor = `rgb(64, 64, 64)`;

        this.next3Canvas = next3Canvas;
        this.next3Context = next3Context;
        this.next3Canvas.width = this.blockSize * this.miniWidth;
        this.next3Canvas.height = this.blockSize * 10;
        this.next3Canvas.style.backgroundColor = `rgb(64, 64, 64)`;

        this.holdCanvas = holdCanvas;
        this.holdContext = holdContext;
        this.holdCanvas.width = this.blockSize * this.miniWidth;
        this.holdCanvas.height = this.blockSize * 4;
        this.holdCanvas.style.backgroundColor = `rgb(64, 64, 64)`;

        this.game = game;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawBlock(x, y, drawShadow = true, drawBorder = true) {
        let blockEdge = this.blockSize;

        // ブロックの本体
        this.context.fillRect(x * blockEdge, y * blockEdge, blockEdge, blockEdge);
        if (drawBorder) this.context.strokeRect(x * blockEdge, y * blockEdge, blockEdge, blockEdge);

        // 影不要の場合書かない
        if (!drawShadow) return;
        // 影の描画
        this.context.fillStyle = `rgba(0, 0, 0, 0.2)`;
        this.context.fillRect(x * blockEdge + 5, y * blockEdge + 5, blockEdge, blockEdge);
    }

    drawField(field) {
        for (let y = 0; y < field.rows; y++) {
            for (let x = 0; x < field.cols; x++) {
                let colorCode = field.grid[y][x];
                let [r, g, b] = field.colorType[colorCode];
                this.context.fillStyle = `rgb(${r}, ${g}, ${b})`
                this.context.strokeStyle = `rgba(0, 0, 0, 1)`;
                this.drawBlock(x, y, r, g, b);
            }
        }
    }


    drawTetromino(tetro) {
        let [r, g, b] = tetro.color;
        for (let y = 0; y < tetro.shape.length; y++) {
            for (let x = 0; x < tetro.shape[y].length; x++) {
                if (tetro.shape[y][x] != 0) {
                    this.context.fillStyle = `rgb(${r}, ${g}, ${b})`
                    this.context.strokeStyle = `rgba(0, 0, 0, 1)`;
                    this.drawBlock(tetro.x + x, tetro.y + y, r, g, b);
                }
            }

        }
        // スペシャルテトロの場合は、追加で描画する
        if (tetro.isSpecial) {
            this.drawSpecialTetromino(tetro)
        }
    }
    drawSpecialTetromino(tetro) {
        // スペシャルテトロごとに描画する
        const specialDrawers = {
            '50x': {
                tapeColor: [255, 255, 255],
                text: '50 倍'
            },
            '100x': {
                tapeColor: [255, 255, 255],
                text: '100倍'
            },
            '爆弾': {
                tapeColor: [255, 255, 255],
                text: '💣💣'
            }
        }
        const style = specialDrawers[tetro.specialName];
        let [r, g, b] = style.tapeColor;
        // 上からブロック半分の位置
        // y方向は1、x方向は全て
        // tapeを描画
        for (let y = 0; y < 1; y++) {
            for (let x = 0; x < tetro.shape[y].length; x++) {
                if (tetro.shape[y][x] != 0) {
                    this.context.fillStyle = `rgb(${r}, ${g}, ${b})`
                    // this.context.strokeStyle = `rgba(0, 0, 0, 1)`;
                    this.drawBlock(tetro.x + x, tetro.y + 0.5, false, true );
                }
            }
        }


        this.context.font = 'bold 20px Arial'; // フォントサイズとフォントを指定
        this.context.fillStyle = 'red';   // 文字の色を指定
        this.context.fillText(style.text, (tetro.x ) * this.blockSize, (tetro.y + 1.3) * this.blockSize);


    }


    // テトロミノの影を描写
    drawShadow(tetro) {
        let [r, g, b] = tetro.color;
        this.context.fillStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
        this.context.strokeStyle = `rgba(0, 0, 0, 0.1)`;
        let shadowY = 0;
        while (this.game.canMove(0, shadowY + 1)) shadowY += 1;
        for (let y = 0; y < tetro.shape.length; y++) {
            for (let x = 0; x < tetro.shape[y].length; x++) {
                if (tetro.shape[y][x] != 0) {
                    this.context.fillRect((tetro.x + x) * this.blockSize, (tetro.y + shadowY + y) * this.blockSize, this.blockSize, this.blockSize);
                    this.context.strokeRect((tetro.x + x) * this.blockSize, (tetro.y + shadowY + y) * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }

    drawNextTetros(nextTetros) {
        let h = 0;
        for (let y = 0; y < nextTetros[0].shape.length; y++) {
            for (let x = 0; x < nextTetros[0].shape[y].length; x++) {
                if (nextTetros[0].shape[y][x] != 0) {
                    h++;
                    break;
                }
            }
        }
        h = 2 - (h / 2);
        // nextのテトロ１つのエリア
        this.nextContext.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height)
        let [r, g, b] = nextTetros[0].color;
        for (let y = 0; y < nextTetros[0].shape.length; y++) {
            let flag = false;
            for (let x = 0; x < nextTetros[0].shape[y].length; x++) {
                if (nextTetros[0].shape[y][x] != 0) {
                    this.nextContext.fillStyle = `rgba(${r}, ${g}, ${b})`;
                    this.nextContext.fillRect((x + (this.miniWidth - nextTetros[0].shape[y].length) / 2) * this.blockSize, h * this.blockSize, this.blockSize, this.blockSize);
                    this.nextContext.strokeRect((x + (this.miniWidth - nextTetros[0].shape[y].length) / 2) * this.blockSize, h * this.blockSize, this.blockSize, this.blockSize);
                    this.nextContext.fillStyle = `rgba(0, 0, 0, 0.2)`;
                    this.nextContext.fillRect((x + (this.miniWidth - nextTetros[0].shape[y].length) / 2) * this.blockSize + 5, h * this.blockSize + 5, this.blockSize, this.blockSize);
                    flag = true;
                }
            }
            if (flag) h++;
        }
        // nextのテトロ３つ描写のエリア
        this.next3Context.clearRect(0, 0, this.next3Canvas.width, this.next3Canvas.height);
        for (let i = 1; i <= 3; i++) {
            [r, g, b] = nextTetros[i].color;
            for (let y = 0; y < nextTetros[i].shape.length; y++) {
                for (let x = 0; x < nextTetros[i].shape[y].length; x++) {
                    if (nextTetros[i].shape[y][x] != 0) {
                        this.next3Context.fillStyle = `rgba(${r}, ${g}, ${b})`;
                        this.next3Context.fillRect((x + (this.miniWidth - nextTetros[i].shape[y].length) / 2) * this.blockSize, (y + (i - 1) * 3 + 1) * this.blockSize, this.blockSize, this.blockSize);
                        this.next3Context.strokeRect((x + (this.miniWidth - nextTetros[i].shape[y].length) / 2) * this.blockSize, (y + (i - 1) * 3 + 1) * this.blockSize, this.blockSize, this.blockSize);
                        this.next3Context.fillStyle = `rgba(0, 0, 0, 0.2)`;
                        this.next3Context.fillRect((x + (this.miniWidth - nextTetros[i].shape[y].length) / 2) * this.blockSize + 5, (y + (i - 1) * 3 + 1) * this.blockSize + 5, this.blockSize, this.blockSize);
                    }
                }
            }
        }
    }

    drawHoldTetro(holdTetro) {

        if (this.game.holdTetromino == null) return;
        let h = 0;
        for (let y = 0; y < holdTetro.shape.length; y++) {
            for (let x = 0; x < holdTetro.shape[y].length; x++) {
                if (holdTetro.shape[y][x] != 0) {
                    h++;
                    break;
                }
            }
        }
        h = 2 - (h / 2);

        this.holdContext.clearRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);
        let [r, g, b] = holdTetro.color;
        for (let y = 0; y < holdTetro.shape.length; y++) {
            let flag = false;
            for (let x = 0; x < holdTetro.shape[y].length; x++) {
                if (holdTetro.shape[y][x] != 0) {
                    this.holdContext.fillStyle = `rgba(${r}, ${g}, ${b})`;
                    this.holdContext.fillRect((x + (this.miniWidth - holdTetro.shape[y].length) / 2) * this.blockSize, h * this.blockSize, this.blockSize, this.blockSize);
                    this.holdContext.strokeRect((x + (this.miniWidth - holdTetro.shape[y].length) / 2) * this.blockSize, h * this.blockSize, this.blockSize, this.blockSize);
                    this.holdContext.fillStyle = `rgba(0, 0, 0, 0.2)`;
                    this.holdContext.fillRect((x + (this.miniWidth - holdTetro.shape[y].length) / 2) * this.blockSize + 5, h * this.blockSize + 5, this.blockSize, this.blockSize);
                    flag = true;
                }
            }
            if (flag) h++;
        }
    }
}