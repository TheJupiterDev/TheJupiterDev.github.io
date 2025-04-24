// JavaScript file with dark mode toggle and section navigation

console.log("%cWelcome, curious coder 👀", "color: #85d693; font-size: 16px;");
console.log("%cYou've found the Echoverse console secret.", "color: #aaa;");


function setProgress(circleId, percentage, goal) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const circle = document.querySelector(`#${circleId} .progress`);
    const text = document.querySelector(`#${circleId} .progress-text`);
    const offset = circumference - (circumference * percentage / 100);
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}% of ${goal}`;
    text.style.textAlign = 'center';
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("project-name").textContent = "Bloodstained Honor";
    document.getElementById("word-count").textContent = "14,150";

    
    setProgress('book1', 14, "100,000 words");
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
    const phrases = ["Writer. Dreamer. Worldbuilder.", "Coding by day, plotting by night."];
    const el = document.querySelector(".typing-text");
    let index = 0;
  
    function typeNext() {
      el.style.width = "0"; // Reset
      el.textContent = phrases[index];
      index = (index + 1) % phrases.length;
    }
  
    typeNext();
    setInterval(typeNext, 5000);
  });
  