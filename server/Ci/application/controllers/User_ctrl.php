<?php

class User_ctrl extends CI_Controller {

    const SALT = "This is a password salt !@#$%^^123423ASDASDAS";

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        header('content-type: application/json; charset=UTF-8');
        $this->load->model('User_model');
    }
    
    /**
     * 
     * @todo add possibilaty for every user to upload profile picture - jpeg not more than 100k
     * and save its location  in the file system on db
     * @todo build fileuploader ctrl + model
     */

    public function show($id = null) {
        if (@!$_SESSION['logged_in']) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            if (!$id && @$_SESSION['user_role'] == "admin") {
                $dbAnswer = $this->User_model->getUsers();
            } else if (!$id && @$_SESSION['user_role'] != "admin") {
                $dbAnswer = $this->User_model->getSpecificUser(@$_SESSION['user_id']);
            } else {
                $dbAnswer = $this->User_model->getSpecificUser($id);
            }
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function post() {
        if (@$_SESSION['logged_in'] && @$_SESSION['user_role'] != "admin") {
            echo json_encode([
                'text' => 'allready logged in',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $json = file_get_contents('php://input');
            $jsonAsStr = json_decode($json);
            $jsonAsStr->user_pass = sha1($jsonAsStr->user_pass . self::SALT);
            $dbAnswer = $this->User_model->addUser($jsonAsStr);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function put($id) {
        if ((@!$_SESSION['logged_in'] || @$_SESSION['user_id'] != $id) && @$_SESSION['user_role'] != "admin") {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $json = file_get_contents('php://input');
            $jsonAsStr = json_decode($json);
            $jsonAsStr->user_pass = sha1($jsonAsStr->user_pass . self::SALT);
            $dbAnswer = $this->User_model->updateUser($id, $jsonAsStr);
            echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
        }
    }

    public function delete($id) {
        if (((@!$_SESSION['logged_in'] || @$_SESSION['user_id'] != $id) && @$_SESSION['user_role'] != "admin") || (@$_SESSION['user_id'] == $id && @$_SESSION['user_role'] == "admin")) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            $dbAnswer = $this->User_model->deleteUser($id);
            if(@$_SESSION['user_role'] != "admin"){
                $this->session->sess_destroy();
            }            
            echo json_encode([
                'dbAnswer' => $dbAnswer,
                'currentUserRole' => $_SESSION['user_role'],
                    ], JSON_PRETTY_PRINT);
        }
    }

}
