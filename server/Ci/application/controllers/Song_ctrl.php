<?php

class Song_ctrl extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        header('content-type: application/json; charset=UTF-8');
        $this->load->model('Song_model');
        $this->load->model('Album_model');
    }

    public function showAllSongs() {
        $dbAnswer = $this->Song_model->getAllSongs();
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    public function showPlaylist($albumId) {
        $dbAnswer = $this->Song_model->getPlaylist($albumId);
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    public function showSong($songId) {
        $dbAnswer = $this->Song_model->getSpecificSong($songId);
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    public function post() {
        $json = file_get_contents('php://input');
        $jsonAsStr = json_decode($json);
        $albumFromDb = $this->Album_model->getSpecificAlbum($jsonAsStr->album_id);
        if (@!$_SESSION['logged_in'] || !$albumFromDb || ($albumFromDb[0]->user_id != $_SESSION['user_id'] && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->Song_model->addSong($jsonAsStr);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function put($songId) {
        $json = file_get_contents('php://input');
        $jsonAsStr = json_decode($json);
        $albumFromDb = $this->Album_model->getSpecificAlbum($jsonAsStr->album_id);
        if (@!$_SESSION['logged_in'] || !$albumFromDb || ($albumFromDb[0]->user_id != $_SESSION['user_id'] && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->Song_model->updateSong($songId, $jsonAsStr);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function delete($songId) {
        $songFromDb = $this->Song_model->getSpecificSong($songId);
        $albumFromDb = $this->Album_model->getSpecificAlbum($songFromDb[0]->album_id);
        if (@!$_SESSION['logged_in'] || !$songFromDb || ($albumFromDb[0]->user_id != $_SESSION['user_id'] && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->Song_model->deleteSong($songId);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

}
