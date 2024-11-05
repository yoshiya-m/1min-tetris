
import { Field } from './Field.js';
import { Renderer } from './Renderer.js';
import { ScoreManager } from './ScoreManager.js';
import { Sound } from './Sound.js';
import { Tetromino } from './Tetromino.js';

export class Game {
    constructor() {
        this.field = new Field(20, 10, this);
        this.currentTetromino = this.generateNewTetromino();
        this.nextTetros = this.generateNextTetros();
        this.holdTetromino = null;
        this.doHold = true;
        this.isGameOver = false;
        this.renderer = null;
        this.doPause = false;
        this.startTime = Date.now();
        this.scoreManager = new ScoreManager(this);
        this.stopTime = 0;
        this.updateInterval = 870;
        this.sound = new Sound();
        this.gameInterval = null;
        this.username = "";

        this.time = document.getElementById('time');
        this.TIME_LIMIT_SEC = 60;
    }
    start() {
        this.initializeRender();
        this.update();
        this.setUsername();
        this.isGameOver = false;
        this.sound.startBGM();
        this.gameInterval = setInterval(() => this.update(), this.updateInterval);
    }

    initializeRender() {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const nextCanvas = document.getElementById("nextTetro");
        const nextContext = nextCanvas.getContext("2d");
        const next3Canvas = document.getElementById("next3Tetro");
        const next3Context = next3Canvas.getContext("2d");
        const holdCanvas = document.getElementById("holdTetro");
        const holdContext = holdCanvas.getContext("2d");
        this.renderer = new Renderer(canvas, context, nextCanvas, nextContext, next3Canvas, next3Context, holdCanvas, holdContext, this);
    }

    generateNextTetros() {
        let nextTetros = [];
        for (let i = 0; i < 4; i++) {
            let newTetro = this.generateNewTetromino();
            nextTetros.push(newTetro);
        }
        return nextTetros
    }

    generateNewTetromino() {
        return new Tetromino();
    }

    changeTetromino() {

        if (!this.doHold) {
            return;
        }
        let currentX = this.currentTetromino.x;
        let currentY = this.currentTetromino.y;
        if (this.holdTetromino == null) {
            if (!this.canMove(0, 0, this.nextTetros[0].shape)) return;
            this.currentTetromino.initializeShape();
            this.holdTetromino = this.currentTetromino;
            this.currentTetromino = this.nextTetros.shift(0);
            this.currentTetromino.x = currentX;
            this.currentTetromino.y = currentY;
            this.nextTetros.push(this.generateNewTetromino());
            this.doHold = false;
            this.sound.changeTetro();
            return;
        }

        if (!this.canMove(0, 0, this.holdTetromino.shape)) {
            return;
        }
        this.currentTetromino.initializeShape();
        let tmp = this.currentTetromino;
        this.currentTetromino = this.holdTetromino;
        this.holdTetromino = tmp;
        this.currentTetromino.x = currentX;
        this.currentTetromino.y = currentY;
        this.doHold = false;
        this.sound.changeTetro();
    }


    update() {
        this.displayTime();

        this.checkGameOver();
        if (this.isGameOver) {
            clearInterval(this.gameInterval);
            return;
        }


        this.renderer.clear();
        this.renderer.drawField(this.field);
        this.renderer.drawShadow(this.currentTetromino);
        this.renderer.drawNextTetros(this.nextTetros);
        this.renderer.drawHoldTetro(this.holdTetromino);
        this.renderer.drawTetromino(this.currentTetromino);

        this.moveTetro();

        let linesCleared = this.field.clearLines();
        if (linesCleared > 0) {
            this.scoreManager.incrementLinesCleared(linesCleared);
            this.scoreManager.updateLevel();
            this.scoreManager.incrementCombo();
            if (this.field.isClear()) {
                this.scoreManager.perfectClear(linesCleared);
            }
        } else {
            this.scoreManager.initCombo();
        }
    }

    moveTetro() {
        if (!this.canMove(0, 1)) {
            this.scoreManager.incrementScore();
            // 落ちたテトロが特殊ブロックの場合
            if (this.currentTetromino.isSpecial) {
                this.scoreManager.updateScoreRate(this.currentTetromino.scoreRate);
            }
            this.field.addTetromino(this.currentTetromino);
            this.currentTetromino = this.nextTetros.shift(0);
            this.nextTetros.push(this.generateNewTetromino());
            return;
        }
        this.currentTetromino.y += 1;
    }

    checkGameOver() {
        let shape = this.currentTetromino.shape
        for (let x = 0; x < shape.length; x++) {
            for (let y = 0; y < shape.length; y++) {

                if ((shape[y][x] && this.field.grid[y + this.currentTetromino.y][x + this.currentTetromino.x]) || this.isTimeUp()) {
                    displayGameOverPage();
                    this.sound.stopBGM();
                    this.sound.gameOver();
                    this.isGameOver = true;
                    this.setScore();
                    this.sendResult();
                    return;
                }
            }
        }
    }

    canMove(movementX, movementY, newTetro = this.currentTetromino.shape) {
        for (let y = 0; y < newTetro.length; y++) {
            for (let x = 0; x < newTetro[y].length; x++) {
                if (newTetro[y][x]) {
                    let newX = this.currentTetromino.x + movementX + x;
                    let newY = this.currentTetromino.y + movementY + y;
                    if (newY < 0 || newY >= this.field.rows || newX < 0 || newX >= this.field.cols || this.field.grid[newY][newX]) return false;
                }
            }
        }
        return true;
    }

    startStop() {
        if (!this.doPause) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
            this.stopTime += (Date.now() - this.startTime);
            this.doPause = true;
            restartPauseBtn.innerHTML = `再開`;
            restartPauseBtn.disabled = true;
            restartPauseBtn.disabled = false;
            this.sound.stopBGM();
        } else {
            this.doPause = false;
            restartPauseBtn.innerHTML = `ポーズ`;
            restartPauseBtn.disabled = true;
            restartPauseBtn.disabled = false;
            this.startTime = Date.now();
            this.gameInterval = setInterval(() => this.update(), this.updateInterval);
            this.sound.startBGM();
        }
    }

    getPassedTimeSec() {
        let passedTime = new Date((Date.now() - this.startTime + this.stopTime))
        return (passedTime.getMinutes() * 60) + passedTime.getSeconds();
    }
    displayTime() {
        const passedTimeSec = this.getPassedTimeSec();
        let leftTime = this.TIME_LIMIT_SEC - passedTimeSec;

        const m = String(Math.floor(leftTime / 60)).padStart(2, '0');
        const s = String(leftTime % 60).padStart(2, '0');
        this.time.textContent = `${m}:${s}`;
    }

    // タイムアップ確認
    isTimeUp() {
        const passedTimeSec = this.getPassedTimeSec();
        return passedTimeSec >= this.TIME_LIMIT_SEC;
    }

    // 結果をサーバに送信
    sendResult() {
        const username = this.getUsername().replace(/[\s　]+/g, '');
        const score = this.scoreManager.getScore();
        // ランキングに参加にチェックない場合と名前が空白の場合はランキング順位取得だけする
        if (!document.getElementById('ranking-checkbox').checked || username === "") {
            fetch('http://localhost:8000/get-ranking-by-score?score=' + score.toString())
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.setRankingData(data.ranking, data.competitorCount);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            return;
        }



        fetch('http://localhost:8000/save-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                score: score,
                username: username
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // ランキングのデータを設定
                this.setRankingData(data.ranking, data.competitorCount);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // usernameをセット
    setUsername() {
        const usernameInput = document.getElementById("username");
        this.username = usernameInput.value;
    }

    getUsername() {
        return this.username;
    }

    setScore() {
        const scoreEle = document.getElementById("score-result");
        scoreEle.innerHTML = this.scoreManager.getScore();
    }
    setRankingData(ranking, competitorCount) {
        const rankingEle = document.getElementById("ranking");
        const competitorCountEle = document.getElementById("competitor-count");

        rankingEle.innerHTML = ranking + "位";
        competitorCountEle.innerHTML = competitorCount + "人";

    }
}