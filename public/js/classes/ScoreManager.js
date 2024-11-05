
export class ScoreManager {
    constructor(game) {
        this.score = 0;
        this.scoreRate = 1;
        this.level = 1;
        this.linesCleared = 0;
        this.combo = 0;
        this.currentLevelEle = document.getElementById("level");
        this.currentScoreEle = document.getElementById("score");
        this.scoreRateEle = document.getElementById("score-rate");
        this.game = game;
        this.initialize();
    }

    initialize() {
        this.currentLevelEle.innerHTML = this.level;
        this.currentScoreEle.innerHTML = this.score;
        this.scoreRateEle.innerHTML = this.scoreRate;
    }

    // perfect Clear;
    perfectClear(linesCleared) {
        if (linesCleared == 1) this.score += 900;
        if (linesCleared == 2) this.score += 1500;
        if (linesCleared == 3) this.score += 2300;
        if (linesCleared == 4) {
            this.score += 2800;
        }
        
    }

    updateScoreRate(scoreRate) {
        this.scoreRate *= scoreRate;
        this.scoreRateEle.innerHTML = this.scoreRate.toFixed(4);
        const sounds = {
            50: this.game.sound.levelUp.bind(this.game.sound),
            100: this.game.sound.levelUp.bind(this.game.sound),
            0.001: this.game.sound.scoreRateDown.bind(this.game.sound)
        }
        // scoreの表示更新
        this.currentScoreEle.innerHTML = this.score;
        let rateType;
        if (scoreRate >= 1) rateType = "up"
        else rateType = "down";
        this.highlightScoreRate(rateType);
        sounds[scoreRate]();
    }

    highlightScoreRate(type) {
        
        let style;
        if (type === "up") {
            style = "highlight-up";
        } else if (type === "down") {
            style = "highlight-down";
        }
        this.scoreRateEle.classList.add(style);
        setTimeout(() => {
            this.scoreRateEle.classList.remove(style);
        }, 1000)
    }

    incrementScore() {
        const INCREMENT_VALUE = 1;
        this.updateScore(INCREMENT_VALUE);
    }

    // スコアの計算処理
    updateScore(score) {
        this.score += Math.floor(score * this.scoreRate);
        this.currentScoreEle.innerHTML = this.score;
        this.highlightScore();
    }

    highlightScore() {
        this.currentScoreEle.classList.add("highlight-score");
        setTimeout(() => {
            this.currentScoreEle.classList.remove("highlight-score");
        }, 1000)
    }
    // ライン消ししたときのスコア
    // clearLines
    clearLines(linesCleared) {
        const scores = {1: 100, 2: 300, 3: 500, 4 : 800};
        this.updateScore(scores[linesCleared]);
    }

    addLevel() {
        if (this.level < 20) this.game.updateInterval -= 35;
        this.level++;
        this.game.sound.levelUp();
        clearInterval(game.gameInterval);
        this.game.gameInterval = setInterval(() => this.game.update(), this.game.updateInterval);
    }

    updateLevel() {
        const linesPerLevel = 10;
        if (this.level <= 10) {
            if (this.linesCleared >= linesPerLevel * this.level) {
                this.addLevel();
                this.linesCleared = 0;
            }
        } else {
            if  (this.linesCleared >= 100) {
                this.addLevel();
                this.linesCleared = 0;
            }
        }
        this.currentLevelEle.innerHTML = this.level;
        
    }

    incrementLinesCleared(count) {
        this.linesCleared += count;
        this.clearLines(count);
    }

    getScore() {
        return this.score;
    }

    getLevel() {
        return this.level;
    }

    initCombo() {
        this.combo = 0;
    }

    incrementCombo() {
        this.combo += 1;
        this.score += this.combo * 50;
    }
}
