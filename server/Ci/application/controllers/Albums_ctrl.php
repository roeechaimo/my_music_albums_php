<?php

class Albums_ctrl extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        header('content-type: application/json; charset=UTF-8');
        $this->load->model('Album_model');
    }

    public function show($id = null) {
        if (!$id) {
            $dbAnswer = $this->Album_model->getAllAlbums();
        } else {
            $dbAnswer = $this->Album_model->getSpecificAlbum($id);
        }
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    public function showUserAlbums($userId) {
        $dbAnswer = $this->Album_model->getUserAlbums($userId);
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    public function post() {
        $json = file_get_contents('php://input');
        $jsonAsStr = json_decode($json);
        if (@!$_SESSION['logged_in']) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->Album_model->addAlbum($jsonAsStr);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function put($id) {
        $json = file_get_contents('php://input');
        $jsonAsStr = json_decode($json);
        if (@!$_SESSION['logged_in'] || ($jsonAsStr->user_id != $_SESSION['user_id'] && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->Album_model->updateAlbum($id, $jsonAsStr);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function delete($id) {
        $album = $this->Album_model->getSpecificAlbum($id);
        if (@!$_SESSION['logged_in'] || ($album[0]->user_id != @$_SESSION['user_id'] && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->Album_model->deleteAlbum($id);
            echo json_encode([
                "successs" => "true",
                "songs_deleted" => $dbAnswer
                    ]
                    , JSON_PRETTY_PRINT
            );
        }
    }

}

/**
 * @todo Description: validations for image file extentions
 */






