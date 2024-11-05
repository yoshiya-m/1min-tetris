<div id="initialPage">
    <div class="vh-100 d-flex flex-column justify-content-center align-items-center">
        <div>
            <!-- title -->
            <div class="col-12 d-flex justify-content-center align-items-center">
                <img id="title" class="img-fluid" src="/images/tetris-title.jpg">
            </div>
            <!-- チェックボックス -->
            <div class="d-flex justify-content-center mt-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="ranking-checkbox">
                    <label class="form-check-label" for="ranking-checkbox">
                        ランキングに参加
                    </label>
                </div>
            </div>
            <!-- username 入力 -->
            <div class="mx-5 my-3 d-flex justify-content-center">
                <input type="text" class="form-control form-control-sm col-sm-8" id="username"
                    required disabled>
            </div>
            <!-- gameStart button -->
            <div class="col-12 d-flex justify-content-center mt-3">
                <button id="startBtn" class="btn btn-primary btn-lg" onclick="gameStart();">START</button>
            </div>
            <div class="col-4 offset-4 pt-3">
                <!-- 操作方法 -->
                <label class="d-flex open justify-content-center btn-primary" for="pop-up1">操作方法</label>
                <input type="checkbox" id="pop-up1">
                <div class="overlay">
                    <div class="window">
                        <label class="close" for="pop-up1">×</label>
                        <h3 class="pb-3"><strong>操作方法</strong></h3>
                        <table class="table">
                            <thead>
                                <tr class="table-warning">
                                    <th scope="col">キー</th>
                                    <th scope="col">動作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">←</th>
                                    <td>左に動く</td>
                                </tr>
                                <tr>
                                    <th scope="row">→</th>
                                    <td>右に動く</td>
                                </tr>
                                <tr>
                                    <th scope="row">↑</th>
                                    <td colspan="2">回転</td>
                                </tr>
                                <tr>
                                    <th scope="row">↓</th>
                                    <td colspan="2">ソフトドロップ</td>
                                </tr>
                                <tr>
                                    <th scope="row">SPACE</th>
                                    <td colspan="2">ハードドロップ</td>
                                </tr>
                                <tr>
                                    <th scope="row">SHIFT</th>
                                    <td colspan="2">ホールド</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- ルール -->
                <label class="d-flex open justify-content-center btn-primary" for="pop-up2">ルール</label>
                <input type="checkbox" id="pop-up2">
                <div class="overlay">
                    <div class="window2 d-flex">
                        <label class="close" for="pop-up2">×</label>
                        <h3>ルール</h3>
                        <h5>★制限時間1分で高得点を目指せ！</h5>
                        <div class="d-flex w-100">
                            <table class="table col-6 mr-2">
                                <thead>
                                    <tr class="table-warning">
                                        <th space="col">動作</th>
                                        <th space="col">点数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">ソフトドロップ</th>
                                        <th colspan="1">1</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">ハードドロップ</th>
                                        <th colspan="1">2</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">１ライン消去</th>
                                        <th colspan="1">100</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">２ライン消去</th>
                                        <th colspan="1">300</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">３ライン消去</th>
                                        <th colspan="1">500</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">４ライン消去</th>
                                        <th colspan="1">800</th>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table col-6">
                                <tbody>
                                    <tr>
                                        <th scope="row">1ライン消去+全消し</th>
                                        <th colspan="1">900</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">2ライン消去 + 全消し</th>
                                        <th colspan="1">1500</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">3ライン消去 + 全消し</th>
                                        <th colspan="1">2300</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">4ライン消去 + 全消し</th>
                                        <th colspan="1">2800</th>
                                    </tr>
                                    <tr>
                                        <th scope="row">コンボ数</th>
                                        <th colspan="1">コンボ数 x 50</th>
                                    </tr>
                                    <tr>
                                        <th scope="row"> </th>
                                        <th colspan="1"> </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- ランキング -->
                <label class="d-flex open justify-content-center btn-primary" for="pop-up3">ランキング</label>
                <input type="checkbox" id="pop-up3">
                <div class="overlay">
                    <div class="window d-flex">
                        <label class="close" for="pop-up3">×</label>
                        <h3 class="mb-5">ランキング</h3>
                        <div class="d-flex w-100 table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">順位</th>
                                        <th scope="col">名前</th>
                                        <th scope="col">スコア</th>
      
                                    </tr>
                                </thead>
                                <tbody id="ranking-table">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>