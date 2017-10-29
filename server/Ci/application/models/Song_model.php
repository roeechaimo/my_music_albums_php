<?php

class Song_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function getAllSongs() {
        $query = $this->db->get('playlists');
        return $query->result();
    }

    public function getPlaylist($albumId) {
        $query = $this->db->get_where('playlists', ['album_id' => $albumId]);
        return $query->result();
    }

    public function getSpecificSong($songId) {
        $query = $this->db->get_where('playlists', ['song_id' => $songId]);
        return $query->result();
    }

    public function addSong($data) {
        $query = $this->db->insert('playlists', $data);
        return $query;
    }

    public function updateSong($songId, $data) {
        $query = $this->db->update('playlists', $data, ['song_id' => $songId]);
        return $query;
    }

    public function deleteSong($songId) {
        $query = $this->db->delete('playlists', ['song_id' => $songId]);
        return $query;
    }

}
