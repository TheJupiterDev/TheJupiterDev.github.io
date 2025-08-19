document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  function showSection(hash) {
    sections.forEach(sec => {
      if (hash === "#" + sec.id || (hash === "" && sec.id === "home")) {
        sec.style.display = "block";
        sec.style.opacity = "0";
        setTimeout(() => {
          sec.style.transition = "opacity 0.3s ease";
          sec.style.opacity = "1";
        }, 10);
      } else {
        sec.style.display = "none";
      }
    });
    updateActiveNav(hash);
  }

  showSection(window.location.hash);

  window.addEventListener("hashchange", () => {
    showSection(window.location.hash);
  });

  const projectTiles = document.querySelectorAll('.project-tile');
  projectTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      tile.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tile.style.transform = 'translateY(-3px)';
      }, 100);
    });
  });

  // Initialize Spotify widget
  initSpotifyWidget();
});

function updateActiveNav(hash) {
  document.querySelectorAll('.navbar a').forEach(link => {
    link.classList.remove('active');
  });

  const currentHash = hash || '#home';
  const activeLink = document.querySelector(`.navbar a[href="${currentHash}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

function toggleProject(projectId) {
  const content = document.getElementById(projectId + '-content');
  content.classList.toggle('active');
}

function showTab(event, projectId, tabName) {
  const tabContents = document.querySelectorAll(`#${projectId}-content .tab-content`);
  tabContents.forEach(content => content.classList.remove('active'));

  const tabButtons = document.querySelectorAll(`#${projectId}-content .tab-button`);
  tabButtons.forEach(button => button.classList.remove('active'));

  document.getElementById(`${projectId}-${tabName}`).classList.add('active');
  event.target.classList.add('active');
}

/* ------------------ Spotify Widget ------------------ */
function initSpotifyWidget() {
  async function updateSpotify() {
    try {
      const res = await fetch("https://api.joelalexander.dev/spotify/current");
      const data = await res.json();

      const albumImg = document.getElementById("spotify-album");
      const trackText = document.getElementById("spotify-track");
      const artistText = document.getElementById("spotify-artist");
      const progressBar = document.getElementById("spotify-progress");

      if (data && data.track) {
        // Update album art
        if (albumImg) {
          albumImg.src = data.albumArt || "default-cover.png";
          albumImg.alt = `${data.album} by ${data.artist}`;
        }

        // Update track name
        if (trackText) {
          trackText.textContent = data.track;
        }

        // Update artist name
        if (artistText) {
          artistText.textContent = data.artist;
        }

        // Update progress bar
        if (progressBar) {
          const progressPercent = (data.progress_ms / data.duration_ms) * 100;
          progressBar.style.width = progressPercent + "%";
        }
      } else {
        // Handle no music playing
        if (trackText) trackText.textContent = "Nothing Playing";
        if (artistText) artistText.textContent = "";
        if (albumImg) {
          albumImg.src = "default-cover.png";
          albumImg.alt = "No music playing";
        }
        if (progressBar) progressBar.style.width = "0%";
      }
    } catch (err) {
      console.error("Spotify fetch error:", err);
      // Handle error state
      const trackText = document.getElementById("spotify-track");
      const artistText = document.getElementById("spotify-artist");
      const albumImg = document.getElementById("spotify-album");
      const progressBar = document.getElementById("spotify-progress");

      if (trackText) trackText.textContent = "Unable to load";
      if (artistText) artistText.textContent = "";
      if (albumImg) {
        albumImg.src = "default-cover.png";
        albumImg.alt = "Unable to load music";
      }
      if (progressBar) progressBar.style.width = "0%";
    }
  }

  // Update every 10 seconds
  updateSpotify();
  setInterval(updateSpotify, 10000);
}