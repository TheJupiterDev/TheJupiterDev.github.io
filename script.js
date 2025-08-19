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

function showTab(projectId, tabName) {
  const tabContents = document.querySelectorAll(`#${projectId}-content .tab-content`);
  tabContents.forEach(content => content.classList.remove('active'));

  const tabButtons = document.querySelectorAll(`#${projectId}-content .tab-button`);
  tabButtons.forEach(button => button.classList.remove('active'));

  document.getElementById(`${projectId}-${tabName}`).classList.add('active');

  event.target.classList.add('active');
}