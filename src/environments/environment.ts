export const environment = {
  production: false,
  backEndUrl: "http://localhost:3000",
  auth: {
    login: "auth/login",
    register: "auth/register"
  },
  playlist: {
    getByUser: "playlist/getPlaylistsByUser",
    add: "playlist/createPlaylist",
    songs: {
      updatePriority: "playlist/updateSongsPriority"
    }
  }
};
