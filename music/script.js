// List of songs (with paths and names)
const songs = [
    { name: "Song 1", path: "music/song1.mp3" },
    { name: "Song 2", path: "music/song2.mp3" },
    { name: "Song 3", path: "music/song3.mp3" },
    { name: "Song 4", path: "music/song4.mp3" },
    { name: "Song 5", path: "music/song5.mp3" },
    { name: "Song 6", path: "music/song6.mp3" }
  ];
  
  let currentIndex = 0;
  let audio = document.getElementById("audio-player");
  let playPauseButton = document.getElementById("play-pause");
  let skipBackButton = document.getElementById("skip-back");
  let skipForwardButton = document.getElementById("skip-forward");
  let volumeControl = document.getElementById("volume-control");
  let searchInput = document.getElementById("search");
  let playlist = document.getElementById("playlist");
  
  // Load the first song into the player
  function loadSong(index) {
    audio.src = songs[index].path;
    document.getElementById("audio-source").src = songs[index].path;
    audio.load();
    playPauseButton.textContent = "Play";
  }
  
  // Populate the playlist
  function populatePlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
      let li = document.createElement("li");
      li.textContent = song.name;
      li.onclick = () => playSong(index);
      playlist.appendChild(li);
    });
  }
  
  // Play or Pause the current song
  function togglePlayPause() {
    if (audio.paused) {
      audio.play();
      playPauseButton.textContent = "Pause";
    } else {
      audio.pause();
      playPauseButton.textContent = "Play";
    }
  }
  
  // Skip to previous song
  function skipBack() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseButton.textContent = "Pause";
  }
  
  // Skip to next song
  function skipForward() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    playPauseButton.textContent = "Pause";
  }
  
  // Change volume
  function changeVolume() {
    audio.volume = volumeControl.value;
  }
  
  // Filter playlist based on search input
  function filterPlaylist() {
    const query = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(query));
    
    playlist.innerHTML = '';
    filteredSongs.forEach((song, index) => {
      let li = document.createElement("li");
      li.textContent = song.name;
      li.onclick = () => playSong(index);
      playlist.appendChild(li);
    });
  }
  
  // Play a selected song
  function playSong(index) {
    currentIndex = index;
    loadSong(currentIndex);
    audio.play();
    playPauseButton.textContent = "Pause";
  }
  
  document.getElementById("play-pause").onclick = togglePlayPause;
  skipBackButton.onclick = skipBack;
  skipForwardButton.onclick = skipForward;
  volumeControl.oninput = changeVolume;
  searchInput.oninput = filterPlaylist;
  
  // Initialize the player
  populatePlaylist();
  loadSong(currentIndex);
  