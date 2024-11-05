import { Game } from './classes/Game.js';

const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
    gameOverPage: document.getElementById("gameOver"),
}
let game;

document.addEventListener('DOMContentLoaded', function () {
    initializeFuncs();
});

function initializeFuncs() {
    window.gameStart = gameStart;
    window.resetAllData = resetAllData;
    window.backPage = backPage;
    window.displayGameOverPage = displayGameOverPage;
    window.gameOverToInitial = gameOverToInitial;
    window.playAgain = playAgain;
    window.startPause = startPause;
    initializeRankingCheckbox();
    initializeRankingBtn();

}



function gameStart() {
    game = new Game();
    game.start();
    initializeKeydown(game);
    switchPage(config.initialPage, config.mainPage);

}

function startPause() {
    game.startStop();
}

function displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

function switchPage(page1, page2) {
    displayNone(page1);
    displayBlock(page2);
}


const restartPauseBtn = document.getElementById("restartPauseBtn");

function moveInitialPage() {
    switchPage(config.mainPage, config.initialPage);
}




const resetBtn = document.getElementById("resetBtn");
function resetAllData() {
    if (!game.doPause) startPause();
    resetBtn.disabled = true;
    resetBtn.disabled = false;
    if (window.confirm("はじめからやり直す？")) {
        gameStart();
        restartPauseBtn.innerHTML = `ポーズ`;
    }
}

const backBtn = document.getElementById("backBtn");
function backPage() {
    if (!game.doPause) startPause();
    backBtn.disabled = true;
    backBtn.disabled = false;
    if (window.confirm("ホームに戻る?")) {
        moveInitialPage();
        restartPauseBtn.innerHTML = `ポーズ`;
        game.sound.stopBGM();
    }
}



// const volumeSlider = document.getElementById('volumeSlider');
// volumeSlider.addEventListener('input', function () {
//     volumeSlider.disabled = true;
//     volumeSlider.disabled = false;
//     game.sound.soundLevel = this.value;
//     game.sound.BGMSound.volume = this.value * 0.1;
// }, false);

function displayGameOverPage() {
    displayBlock(config.gameOverPage);
}

function gameOverToInitial() {
    moveInitialPage();
    displayNone(config.gameOverPage);
}

function playAgain() {
    gameStart();
    displayNone(config.gameOverPage);
}

function initializeKeydown(game) {
    document.onkeydown = function (e) {
        if (game.isGameOver) return;
        if (game.doPause) return;
        switch (e.key) {
            case "ArrowLeft":
                if (game.canMove(-1, 0)) game.currentTetromino.x--;
                break;
            case "ArrowRight":
                if (game.canMove(1, 0)) game.currentTetromino.x++;
                break;
            case "ArrowDown":
                if (game.canMove(0, 1)) game.currentTetromino.y++;
                break;
            case "ArrowUp":
                let newTetro = game.currentTetromino.rotate();
                if (game.canMove(0, 0, newTetro)) game.currentTetromino.shape = newTetro;
                game.sound.rotate();
                break;
            case " ":
                if (!game.currentTetromino.doHardDrop) return;
                game.currentTetromino.doHardDrop = false;
                while (game.canMove(0, 1)) game.currentTetromino.y++;
                // 1テトロに一回だけ足す
                game.scoreManager.incrementScore();
                game.sound.hardDrop();
                break;
            case "Shift":
                game.changeTetromino();
                break;
        }
        game.renderer.clear();
        game.renderer.drawField(game.field);
        game.renderer.drawShadow(game.currentTetromino);
        game.renderer.drawTetromino(game.currentTetromino);
    }
}




function initializeRankingCheckbox() {
    // checkbox クリック処理
    document.getElementById('ranking-checkbox').addEventListener('change', function () {
        const usernameInput = document.getElementById('username');

        // チェックボックスがチェックされている場合
        if (this.checked) {
            usernameInput.disabled = false; // 入力を有効にする
            usernameInput.placeholder = "名前を入力してランキングに参加！";
        } else {
            usernameInput.disabled = true; // 入力を無効にする
            usernameInput.placeholder = "";
        }
    });
}

// ランキング表示ボタン
function initializeRankingBtn() {
    // btnが押されたときに、ランキング情報を取得して、要素に格納する
    document.getElementById("pop-up3").addEventListener('change', function () {

        fetch('http://localhost:8000/get-ranking')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // ランキングの要素にデータを追加する
                let rankingTable = document.getElementById("ranking-table");
                rankingTable.innerHTML = "";
                let rankings = data.ranking;
                for (let i = 0; i < rankings.length; i++) {
                    rankingTable.innerHTML += `
                        <tr>
                            <th scope="row">${i + 1}</th>
                            <td>${rankings[i].username}</td>
                            <td>${rankings[i].score}</td>
                        </tr>
                    `;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
}

