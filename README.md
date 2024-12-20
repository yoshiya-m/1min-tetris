# 1min-tetris

# tetris
チーム開発で三名で作成したテトリスを、追加で機能開発した作品です。

## 目次
- [作成期間](#作成期間)
- [demo](#demo)
- [概要](#概要)
- [遊び方](#遊び方)
- [URL](#url)
- [使用技術](#使用技術)

## 作成期間
 2週間 (2024/4/7 ～ 2024/4/21) + 個人追加開発 1週間

## demo
<img width="400" alt="スクリーンショット_20230130_131653" src="https://github.com/teamdev-Cteam/tetris/assets/166124956/31ef78a5-1ffd-48f6-90aa-eb03db2edc85">
<img width="400" alt="スクリーンショット_20230130_131653" src="https://github.com/teamdev-Cteam/tetris/assets/166124956/c1fed7e8-c809-4740-bd5e-6558accc9754">
<img width="400" alt="スクリーンショット_20230130_131653" src="https://github.com/teamdev-Cteam/tetris/assets/166124956/f2518c63-41cb-4240-ad2a-560e0e1af0ff">
<img width="400" alt="image" src="https://github.com/teamdev-Cteam/tetris/assets/166124956/6b8d3c8b-1bdc-48fb-b9a8-f0bcb222f2a1">


## 概要
 消したライン数によってテトロの落下スピードと得られるスコアが変わります。  
 ゲーム画面の右上には次に落ちてくるテトロを表示しています。テトロのホールド機能も実装し、左上に現在ホールドしているテトロを表示しています。テトロのハードドロップや着地点にテトロの薄い影を表示することで快適にプレイして頂けるようにしました。効果音、BGMもついています。

## 遊び方
スタートを押して頂くとゲームがスタートします。左右の矢印キーで移動、上矢印キーで回転、下矢印キーはソフトドロップ、スペースキーでテトロを下まで落とします（ハードドロップ）。シフトキーでテトロのホールドができます。リセットボタンを押して頂くか、
ゲームオーバーになるとポップアップが表示され、もう1度プレイすることができます。

## URL
https://github.com/yoshiya-m/1min-tetris.git

## 使用技術
### フロント
・HTML  
・CSS  
・JavaScript  

### バックエンド
・PHP

### データベース
・MySQL

### インフラ
・AWS EC2