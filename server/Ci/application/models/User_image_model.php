<?php

class User_image_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function getAllUsersImages() {
        $query = $this->db->get('users_images');
        return $query->result();
    }

    public function getSpecificUserImage($id) {
        $query = $this->db->get_where('users_images', ['image_id' => $id]);
        return $query->result();
    }

    public function getUserImageByUserId($userId) {
        $query = $this->db->get_where('users_images', ['user_id' => $userId]);
        return $query->result();
    }

    public function addUserImage($data) {
        $query = $this->db->insert('users_images', $data);
        return $query;
    }

    public function updateUserImage($id, $data) {
        $query = $this->db->update('users_images', $data, ['image_id' => $id]);
        return $query;
    }

    public function deleteUserImage($id) {
        $query = $this->db->delete('users_images', ['image_id' => $id]);
        return $query;
    }

}
