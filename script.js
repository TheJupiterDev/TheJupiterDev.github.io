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

function showPage(pageId) {
    const sections = document.querySelectorAll(".content section");
    sections.forEach(section => section.style.display = "none");

    const active = document.getElementById(pageId);
    if (active) {
        active.style.display = "block";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}


function loadDailyContent() {
    fetch('daily.json')
        .then(res => res.json())
        .then(data => {

            const quoteDiv = document.getElementById('quote-content');
            quoteDiv.innerHTML =
                data.quote.text.map(line => `<p>${line}</p>`).join('') +
                `<p>— ${data.quote.source}</p>`;


            const passageDiv = document.getElementById('passage-content');
            passageDiv.innerHTML = `<br><h3>${data.passage.reference}</h3>` +
                data.passage.verses.map(v => `<p>${v}</p>`).join('');
        })
        .catch(err => {
            console.error("Failed to load daily.json", err);
        });
}


function initTypingEffect() {
    const phrases = [
        "Writer. Programmer. Reader.",
        "Coding by day, plotting by night. Drinking coffee throughout."
    ];
    const el = document.querySelector(".typing-text");
    let index = 0;

    function typeNext() {
        el.style.width = "0";
        el.textContent = phrases[index];
        index = (index + 1) % phrases.length;
    }

    typeNext();
    setInterval(typeNext, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    setProgress('book1', 14);

    const initialPage = window.location.hash.substring(1) || "about";
    showPage(initialPage);

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const pageId = this.getAttribute("href").substring(1);
            showPage(pageId);
            window.location.hash = pageId;
        });
    });

    window.addEventListener("hashchange", () => {
        const pageId = window.location.hash.substring(1);
        if (pageId) showPage(pageId);
    });

    const toggleButton = document.getElementById("toggle-dark");
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    loadDailyContent();

    initTypingEffect();
});
