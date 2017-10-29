<?php

class User_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function getUsers() {
        $query = $this->db->get('users');
        return $query->result();
    }

    public function getSpecificUser($userId) {
        $query = $this->db->get_where('users', ['user_id' => $userId]);
        return $query->result();
    }

    public function getUserByCredencials($data) {
        $query = $this->db->get_where('users', ['user_email' => $data->user_email, 'user_pass' => $data->user_pass]);
        return $query->result();
    }

    public function addUser($data) {
        $query = $this->db->insert('users', $data);
        return $query;
    }

    public function updateUser($userId, $data) {
        $query = $this->db->update('users', $data, ['user_id' => $userId]);
        return $query;
    }

    public function deleteUser($userId) {
        $query = $this->db->delete('users', ['user_id' => $userId]);
        return $query;
    }

}
