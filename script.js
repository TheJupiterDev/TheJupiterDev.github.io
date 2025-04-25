console.log("%cWelcome, stranger from distant lands. 👀", "color: #85d693; font-size: 16px;");
console.log("%cYou've found a secret.", "color: #aaa;");


function setProgress(circleId, percentage) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const circle = document.querySelector(`#${circleId} .progress`);
    const text = document.querySelector(`#${circleId} .progress-text`);
    const offset = circumference - (circumference * percentage / 100);
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}%`;
    text.style.textAlign = 'center';
}

document.addEventListener("DOMContentLoaded", () => {
    setProgress('book1', 14);
    showPage("about");

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const pageId = this.getAttribute("href").substring(1);
            showPage(pageId);
        });
    });

    const toggleButton = document.getElementById("toggle-dark");
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});

function showPage(pageId) {
    const sections = document.querySelectorAll(".content section");
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(pageId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const phrases = ["Writer. Programmer. Reader.", "Coding by day, plotting by night. Drinking coffee throughout."];
    const el = document.querySelector(".typing-text");
    let index = 0;
  
    function typeNext() {
      el.style.width = "0";
      el.textContent = phrases[index];
      index = (index + 1) % phrases.length;
    }
  
    typeNext();
    setInterval(typeNext, 5000);
  });
  