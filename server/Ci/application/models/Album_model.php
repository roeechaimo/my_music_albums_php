<?php

class Album_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function getAllAlbums() {
        $this->db->select('*');
        $this->db->from('albums');
        $this->db->join('users', 'albums.user_id = users.user_id', 'left');
        $query = $this->db->get();
        return $query->result();
    }

    public function getSpecificAlbum($id) {
        $query = $this->db->get_where('albums', ['album_id' => $id]);
        return $query->result();
    }

    public function getUserAlbums($userId) {
        $this->db->select('*');
        $this->db->from('albums');
        $this->db->join('users', 'albums.user_id = users.user_id', 'left');
        $this->db->where('users.user_id', $userId);        
        $query = $this->db->get();
        return $query->result();
    }

    public function addAlbum($data) {
        $query = $this->db->insert('albums', $data);
        return $query;
    }

    public function updateAlbum($id, $data) {
        $query = $this->db->update('albums', $data, ['album_id' => $id]);
        return $query;
    }

    public function deleteAlbum($id) {
        $tables = array('albums', 'playlists');
        $this->db->where('album_id', $id);
        $this->db->delete($tables);
        $numberOfRows = $this->db->affected_rows();
        return $numberOfRows;
    }

}
