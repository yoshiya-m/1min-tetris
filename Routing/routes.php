<?php

use Database\DataAccess\Implementations\EmailDAOImpl;
use Database\DataAccess\Implementations\PostDAOImpl;
use Helpers\DatabaseHelper;
use Helpers\ValidationHelper;
use Response\HTTPRenderer;
use Response\Render\HTMLRenderer;
use Response\Render\JSONRenderer;
use Response\Render\MediaRenderer;
use Database\DataAccess\DAOFactory;
use Types\ValueType;
use Models\ComputerPart;
use Models\Post;
use Helpers\Authenticate;
use Models\Score;
use Response\FlashData;
use Response\Render\RedirectRenderer;
use Models\User;
use Routing\Route;

return [

    '' => Route::create('component/title-page', function (): HTTPRenderer {

        return new HTMLRenderer('component/title-page');
    }),
    // ゲーム終了時のスコア保存
    'save-result' => Route::create('save-result', function (): HTTPRenderer {
        if ($_SERVER['REQUEST_METHOD'] !== "POST") return new JSONRenderer(['status' => 'error', 'message' => 'Invalid request method']);
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Failed to decode json data.');
        }

        if (!isset($data['username']) || !isset($data['score'])) return new JSONRenderer(['status' => 'error', 'message' => 'Data not found.']);
        

        $data = [
            'id' => null,
            'username' => $data['username'],
            'score' => $data['score']
        ];
        
        // スコアデータ保存
        Score::create($data);
       
        // ランキングの合計人数取得
        $competitorCount = Score::getRowsCount();
        // $ranking = Score::getRankByScore((int)$data['score']);
        $ranking = Score::getRankByScore($data['score']);
        // $ranking = 100;

        return new JSONRenderer(['status' => 'success', 'ranking' => (string)$ranking, 'competitorCount' => (string)$competitorCount]);
    }),
    'get-ranking-by-score' => Route::create('get-ranking-by-score', function(): HTTPRenderer {
        if ($_SERVER['REQUEST_METHOD'] !== "GET") return new JSONRenderer(['status' => 'error', 'message' => 'Invalid request method']);
        $competitorCount = Score::getRowsCount();
        $ranking = Score::getRankByScore($_GET['score']);

        

        return new JSONRenderer(['status' => 'success', 'ranking' => (string)$ranking, 'competitorCount' => (string)$competitorCount]);
    }),
    'get-ranking' => Route::create('get-ranking', function(): HTTPRenderer {
        if ($_SERVER['REQUEST_METHOD'] !== "GET") return new JSONRenderer(['status' => 'error', 'message' => 'Invalid request method']);
        $data = Score::getRanking();
        return new JSONRenderer(['status' => 'success', 'ranking' => $data]);
    })
];