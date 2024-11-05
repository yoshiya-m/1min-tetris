
export class Sound{
    constructor(){
        this.soundLevel = 0.1
        this.BGMSound = new Audio('sounds/BGM.mp3');
        this.BGMSound.volume = 0.05;
        this.BGMSound.loop = true;
    }

    hardDrop(){
        let hardDropSound = new Audio('sounds/hardDrop.mp3');
        hardDropSound.volume = this.soundLevel;
        hardDropSound.play();
    }

    rotate(){
        let rotateSound = new Audio('sounds/rotate.mp3');
        rotateSound.volume = this.soundLevel;
        rotateSound.play();
    }

    clearLines(){
        let clearLinesSound = new Audio('sounds/clearLines.mp3');
        clearLinesSound.volume = this.soundLevel;
        clearLinesSound.play();
    }

    fixTetro(){
        let fixTetroSound = new Audio('sounds/fixTetro.mp3');
        fixTetroSound.volume = this.soundLevel;
        fixTetroSound.play();
    }

    changeTetro(){
        let changeTetroSound = new Audio('sounds/changeTetro.mp3');
        changeTetroSound.volume = this.soundLevel;
        changeTetroSound.play();
    }

    levelUp(){
        let levelUpSound = new Audio('sounds/levelUp.mp3');
        levelUpSound.volume = this.soundLevel;
        levelUpSound.play();
    }

    gameOver(){
        let gameOverSound = new Audio('sounds/gameOver.mp3');
        gameOverSound.volume = this.soundLevel * 0.5;
        gameOverSound.play();
    }

    startBGM(){
        this.BGMSound.play();
    }

    stopBGM(){
        this.BGMSound.pause();
    }

    scoreRateDown() {
        let scoreRateDownSound = new Audio('sounds/scoreRateDown.mp3');
        scoreRateDownSound.volume = this.soundLevel * 1.5;
        scoreRateDownSound.play();
    }
}