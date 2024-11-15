<div id="mainPage" class="d-none">
    <!-- game over 表示 -->
    <div id="gameOver" class="d-none">
        <div class="vh-100 vw-100 d-flex justify-content-center align-items-center">
            <div>
                <div>
                    <h1>RESULT</h1>
                </div>
                <!-- スコアとランキングの表示 -->
                <div>
                    <h2>Score: <span id="score-result"></span></h2>
                    <h2>Ranking: <span id="ranking"></span> / <span id="competitor-count"></span></h2>
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-secondary" onclick="gameOverToInitial();">CLOSE</button>
                    <button type="button" class="btn btn-primary" onclick="playAgain();">PLAY AGAIN</button>
                </div>
            </div>
        </div>
    </div>
    <div class="vh-100 pt-5">
        <!-- 表示類 -->
        <div class="d-flex justify-content-center">
            <!-- Time -->
            <div class="mx-2">
                <h4 class="info">残り時間</h4>
                <h4 id="time" class="info-main px-1">00:00:00</h4>
            </div>
            <!-- Level -->
            <div class="mx-2">
                <h4 class="info">レベル</h4>
                <h4 id="level" class="info-main">1</h4>
            </div>
            <!-- Score -->
            <div class="mx-2">
                <h4 class="info">スコア</h4>
                <h4 id="score" class="info-main">0</h4>
            </div>
            <div class="mx-2">
                <h4 class="info">スコア倍率</h4>
                <h4 id="score-rate" class="info-main">1</h4>
            </div>
            <!-- volume -->
            <!-- <div class="d-flex flex-column justify-content-center bg-secondary p-5">
                <h3 class="text-warning text-center pt-2"><strong>VOLUME</strong></h3>
                <input type="range" min="0" max="0.2" step="0.1" value="0.1" id="volumeSlider" class="mx-3">
            </div> -->
        </div>
        <div class=" d-flex justify-content-center ">
            <!-- Restart/Pause -->
            <div class="btn-group mb-3">
                <button id="restartPauseBtn" class="btn btn-warning" onclick="startPause();">ポーズ</button>
                <button id="resetBtn" class="btn btn-danger" onclick="resetAllData();">リセット</button>
                <button id="backBtn" class="btn btn-secondary" onclick="backPage();">ホーム画面へ</button>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <!-- holdTetro -->
            <div class="hold-container">
                <div class="bg-dark text-white text-center mb-0">
                    <p>HOLD</p>
                </div>
                <canvas id="holdTetro"></canvas>
            </div>
            <!-- gameScreen -->
            <div class="d-flex justify-content-center col-6">
                <canvas id="canvas"></canvas>
            </div>
            <!-- nextTetro -->
            <div id="next-container">
                <div class="bg-dark text-white text-center mb-0">
                    <p>NEXT</p>
                </div>
                <div class="mt-0">
                    <canvas id="nextTetro"></canvas>
                </div>
                <div>
                    <canvas id="next3Tetro"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>