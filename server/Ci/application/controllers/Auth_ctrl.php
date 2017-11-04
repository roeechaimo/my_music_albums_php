<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST");

class Auth_ctrl extends CI_Controller {

    const SALT = "This is a password salt !@#$%^^123423ASDASDAS";

    private $_data;

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST");
        header('content-type: application/json; charset=UTF-8');
        $this->load->model('User_model');
        $json = file_get_contents('php://input');
        $this->_data = json_decode($json);
    }

    public function login() {
        $userObj = $this->_data;
        $userObj->user_pass = sha1($userObj->user_pass . self::SALT);
        $dbAnswer = $this->User_model->getUserByCredencials($userObj);
        if ($dbAnswer) {
            $_SESSION['logged_in'] = true;
            $_SESSION['user_id'] = $dbAnswer[0]->user_id;
            $_SESSION['user_role'] = $dbAnswer[0]->user_role;
            echo json_encode([
                "successs" => $_SESSION['logged_in'],
                "user_id" => $_SESSION['user_id']
                    ]
                    , JSON_PRETTY_PRINT
            );
        } else {
            http_response_code(401 /* unauthorized */);
            echo json_encode([
                'success' => false
                    ], JSON_PRETTY_PRINT);
        }
    }

    public function logout() {
        echo json_encode([
            'success' => true
                ], JSON_PRETTY_PRINT);
        $this->session->sess_destroy();
    }

    public function checkIfLoggedIn() {
        if (@!$_SESSION['logged_in']) {
            echo json_encode([
                "loggedIn" => false,
                    ]
                    , JSON_PRETTY_PRINT
            );
        } else {
            echo json_encode([
                "loggedIn" => true,
                "user_id" => $_SESSION['user_id']
                    ]
                    , JSON_PRETTY_PRINT
            );
        }
    }

}
