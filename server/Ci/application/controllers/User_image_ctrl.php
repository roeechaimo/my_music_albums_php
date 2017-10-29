<?php

class User_image_ctrl extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        header('content-type: application/json; charset=UTF-8');
        $this->load->model('User_image_model');
    }

    /**
     * show all user images or specific
     * @param type $id
     */    
    public function show($id = null) {
        if (!$id) {
            $dbAnswer = $this->User_image_model->getAllUsersImages();
        } else {
            $dbAnswer = $this->User_image_model->getSpecificUserImage($id);
        }
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    /**
     * show user image by his user id
     * @param type $userId
     */
    public function showUserImage($userId) {
        $dbAnswer = $this->User_image_model->getUserImageByUserId($userId);
        echo json_encode($dbAnswer, JSON_PRETTY_PRINT);
    }

    /**
     * 
     * @param type $user_id
     */
    public function delete($user_id) {
        $userImage = $this->User_image_model->getSpecificUserImage($user_id);
        if (@!$_SESSION['logged_in'] || ($userImage[0]->user_id != @$_SESSION['user_id'] && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {
            unlink("./uploads/" . $userImage[0]->image_name);
            $dbAnswer = $this->User_image_model->deleteUserImage($userImage[0]->image_id);
            echo json_encode([
                "successs" => $dbAnswer,               
                    ]
                    , JSON_PRETTY_PRINT
            );
        }
    }

}








