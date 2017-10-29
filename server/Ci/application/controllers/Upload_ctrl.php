<?php

class Upload_ctrl extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');
        $this->load->helper(array('form', 'url'));
        $this->load->model('User_image_model');
        header('content-type: application/json; charset=UTF-8');
    }
    
    public function do_upload() {
        if (@!$_SESSION['logged_in'] || ($this->input->post('user_id') !== null && $_SESSION['user_role'] !== 'admin')) {
            echo json_encode([
                'text' => 'unauthorized',
                    ], JSON_PRETTY_PRINT);
            http_response_code(401 /* unauthorized */);
        } else {         
            if ($this->input->post('user_id') !== null) {
                $userId = $this->input->post('user_id');
            } else {
                $userId = $_SESSION['user_id'];
            }

            self::loadOptions();
            
            if (!$this->upload->do_upload()) {
                $error = array('error' => $this->upload->display_errors());
                http_response_code(409 /* conflict */);
                echo json_encode($error, JSON_PRETTY_PRINT);
            } else {
                $data = array('upload_data' => $this->upload->data());
                $arrayForUserImageObj = array('user_id' => $userId, 'file_info' => $data['upload_data']);
                $userImageObj = self::makeUserImageObj($arrayForUserImageObj);
                $isUserIdExist = $this->User_image_model->getUserImageByUserId($userId);
                if ($isUserIdExist) {
                    unlink("./uploads/" . $isUserIdExist[0]->image_name);
                    $objToReturn = self::sendToDb($userImageObj, $isUserIdExist[0]);
                    echo $objToReturn;
                } else {
                    $objToReturn = self::sendToDb($userImageObj);
                    echo $objToReturn;
                }
            }
        }
    }

    private function loadOptions() {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = 100000;
        $config['max_width'] = 1024;
        $config['max_height'] = 768;
        $this->load->library('upload', $config);
    }

    /**
     * updates or adds user image to db
     * @param type $objToSend
     * @param type $user_obj
     */
    private function sendToDb($objToSend, $user_obj = null) {
        if ($user_obj) {
            $dbAnswer = $this->User_image_model->updateUserImage($user_obj->image_id, $objToSend);
            return json_encode([
                'dbAnswer' => $dbAnswer,
                'userImageObj' => $objToSend], JSON_PRETTY_PRINT);
        } else {
            $dbAnswer = $this->User_image_model->addUserImage($objToSend);
            return json_encode([
                'dbAnswer' => $dbAnswer,
                'userImageObj' => $objToSend], JSON_PRETTY_PRINT);
        }
    }

    /**
     * 
     * @param type $userImageArray
     */
    private function makeUserImageObj($userImageArray) {
        $userImageObj = array(
            'user_id' => $userImageArray['user_id'],
            'image_location' => $userImageArray['file_info']['file_path'],
            'image_name' => $userImageArray['file_info']['file_name']);
        return $userImageObj;
    }

}
