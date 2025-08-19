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
  
  // Initialize writing progress widget
  initWritingProgress();
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

function initSpotifyWidget() {
  console.log("Spotify widget initializing...");
  
  async function updateSpotify() {
    try {
      console.log("Fetching Spotify data...");
      const res = await fetch("https://api.joelalexander.dev/spotify/current");
      const data = await res.json();
      console.log("Spotify data:", data);

      const albumImg = document.getElementById("spotify-album");
      const trackText = document.getElementById("spotify-track");
      const artistText = document.getElementById("spotify-artist");
      const progressBar = document.getElementById("spotify-progress");

      if (data && data.track) {
        if (albumImg) {
          albumImg.src = data.albumArt || "default-cover.png";
          albumImg.alt = `${data.album} by ${data.artist}`;
        }
        if (trackText) {
          trackText.textContent = data.track;
        }
        if (artistText) {
          artistText.textContent = data.artist;
        }
        if (progressBar) {
          const progressPercent = (data.progress_ms / data.duration_ms) * 100;
          progressBar.style.width = progressPercent + "%";
        }
        console.log("Spotify widget updated successfully");
      } else {
        if (trackText) trackText.textContent = "Nothing Playing";
        if (artistText) artistText.textContent = "";
        if (albumImg) albumImg.src = "default-cover.png";
        if (progressBar) progressBar.style.width = "0%";
      }
    } catch (err) {
      console.error("Spotify fetch error:", err);
    }
  }

  updateSpotify();
  setInterval(updateSpotify, 10000);
}

/* ------------------ Writing Progress Widget ------------------ */
function initWritingProgress() {
  async function updateWritingProgress() {
    try {
      const res = await fetch("https://api.joelalexander.dev/docs/info");
      const data = await res.json();

      if (data) {
        // Update word count in the dedicated word count widget
        const wordCountElement = document.querySelector('.word-count .count');
        if (wordCountElement) {
          wordCountElement.textContent = data.wordCount.toLocaleString();
        }

        // Update word count in project stats
        const projectStatsWordCount = document.querySelector('.project-stats span');
        if (projectStatsWordCount) {
          projectStatsWordCount.innerHTML = `📖 ${data.wordCount.toLocaleString()} words`;
        }

        // Update word count in project title area
        const projectTitleWordCount = document.querySelector('.project-header h2');
        if (projectTitleWordCount && projectTitleWordCount.textContent.includes('30,463')) {
          projectTitleWordCount.innerHTML = projectTitleWordCount.innerHTML.replace('30,463', data.wordCount.toLocaleString());
        }

        // Update current chapter in overview
        const currentChapterElement = document.querySelector('#shadow-archives-overview p:nth-of-type(6)');
        if (currentChapterElement && currentChapterElement.innerHTML.includes('Current Chapter:')) {
          currentChapterElement.innerHTML = `<strong>Current Chapter:</strong> Chapter ${data.chapterNum} - "${data.title}"`;
        }

        // Update progress percentage (assuming 100,000 word goal)
        const progressBar = document.querySelector('#shadow-archives-overview .progress-fill');
        if (progressBar) {
          const progressPercent = Math.round((data.wordCount / 100000) * 100);
          progressBar.style.width = progressPercent + "%";
        }

        // Update progress text
        const progressText = document.querySelector('#shadow-archives-overview p:nth-of-type(2)');
        if (progressText && progressText.innerHTML.includes('Progress:')) {
          const progressPercent = Math.round((data.wordCount / 100000) * 100);
          progressText.innerHTML = `<strong>Progress:</strong> ${progressPercent}% complete (${data.wordCount.toLocaleString()} / 100,000 words)`;
        }

        // Update recent milestone
        const milestoneElement = document.querySelector('#shadow-archives-overview p:nth-of-type(7)');
        if (milestoneElement && milestoneElement.innerHTML.includes('Recent Milestone:')) {
          milestoneElement.innerHTML = `<strong>Recent Milestone:</strong> Completed Chapter ${data.chapterNum - 1}, working on Chapter ${data.chapterWord} - "${data.title}".`;
        }

        console.log('Writing progress updated successfully');
      }
    } catch (err) {
      console.error("Writing progress fetch error:", err);
    }
  }

  // Update immediately and then every 30 seconds (less frequent than Spotify)
  updateWritingProgress();
  setInterval(updateWritingProgress, 30000);
}