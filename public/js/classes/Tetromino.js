
export class Tetromino {
    constructor() {
        this.tetrominoShapes = {
            'T': {
                shape: [
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ],
                color: [191, 127, 255],
                startX: 4,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'L': {
                shape: [
                    [0, 0, 2],
                    [2, 2, 2],
                    [0, 0, 0],
                ],
                color: [255, 191, 127],
                startX: 4,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'I': {
                shape: [
                    [0, 0, 0, 0],
                    [3, 3, 3, 3],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ],
                color: [127, 255, 255],
                startX: 3,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'O': {
                shape: [
                    [4, 4],
                    [4, 4]
                ],
                color: [255, 255, 127],
                startX: 4,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'S': {
                shape: [
                    [0, 5, 5],
                    [5, 5, 0],
                    [0, 0, 0]
                ],
                color: [127, 255, 127],
                startX: 3,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'J': {
                shape: [
                    [6, 0, 0],
                    [6, 6, 6],
                    [0, 0, 0]
                ],
                color: [127, 191, 255],
                startX: 3,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'Z': {
                shape: [
                    [7, 7, 0],
                    [0, 7, 7],
                    [0, 0, 0]
                ],
                color: [255, 127, 127],
                startX: 3,
                isSpecial: false,
                specialName: '',
                scoreRate: 1
            },
            'BOX 50x': {
                shape: [
                    [4, 4],
                    [4, 4]
                ],
                color: [255, 255, 127],
                startX: 3,
                isSpecial: true,
                specialName: '50x',
                scoreRate: 50
            },
            'BOX 100x': {
                shape: [
                    [4, 4],
                    [4, 4]
                ],
                color: [255, 255, 127],
                startX: 3,
                isSpecial: true,
                specialName: '100x',
                scoreRate: 100
            },
            'BOX BOMB': {
                shape: [
                    [4, 4],
                    [4, 4]
                ],
                color: [255, 255, 127],
                startX: 3,
                isSpecial: true,
                specialName: '爆弾',
                scoreRate: 0.001
            }
        };
        const tetroInfo = this.getRandomTetrominoShape();
        this.shape = tetroInfo.shape;
        this.originalShape = this.shape;
        this.color = tetroInfo.color;
        this.x = tetroInfo.startX;
        this.y = 0;
        this.doHardDrop = true;
        this.isSpecial = tetroInfo.isSpecial;
        this.specialName = tetroInfo.specialName;
        this.scoreRate = tetroInfo.scoreRate;
    }

    getRandomTetrominoShape() {
        const shapes = Object.keys(this.tetrominoShapes);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        return this.tetrominoShapes[randomShape];
    }

    initializeShape() {
        this.shape = this.originalShape;
    }

    rotate() {
        let newTetro = [];
        for (let y = 0; y < this.shape.length; y++) {
            newTetro[y] = [];
            for (let x = 0; x < this.shape[y].length; x++) {
                newTetro[y][x] = this.shape[this.shape.length - x - 1][y];
            }
        }
        return newTetro;
    }
}