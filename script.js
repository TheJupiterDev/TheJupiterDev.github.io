console.log("%cWelcome, stranger from distant lands. 👀", "color: #85d693; font-size: 16px;");
console.log("%cYou've found a secret.", "color: #aaa;");

function setProgress(circleId, percentage) {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const circleContainer = document.querySelector(`#${circleId}`);
    if (!circleContainer) return;

    const circle = circleContainer.querySelector('.progress');
    const text = circleContainer.querySelector('.progress-text');
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

function loadBlogPosts(posts) {
    const blogContainer = document.getElementById('blog-posts');
    blogContainer.innerHTML = '';
    posts.forEach(post => {
        const postTile = document.createElement('div');
        postTile.classList.add('project-tile', 'blog-post');

        postTile.innerHTML = `
            <h3><a href="${post.link}">${post.title}</a></h3>
            <p class="date">${post.date}</p>
            <p>${post.summary}</p>
            <a href="${post.link}">Read more →</a>
        `;
        blogContainer.appendChild(postTile);
    });
}


function loadDailyContent() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            // Load Quote of the Day
            const quoteDiv = document.getElementById('quote-content');
            quoteDiv.innerHTML = data.quote.text.map(line => `<p>${line}</p>`).join('') +
                `<p>— ${data.quote.source}</p>`;

            // Load Passage of the Day
            const passageDiv = document.getElementById('passage-content');
            passageDiv.innerHTML = `<br><h3>${data.passage.reference}</h3>` +
                data.passage.verses.map(v => `<p>${v}</p>`).join('');

            // Load Blog Posts
            loadBlogPosts(data.blog);
        })
        .catch(err => {
            console.error("Failed to load data.json", err);
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
    setProgress('book1', 24);

    const initialPage = window.location.hash.substring(1) || "home";
    showPage(initialPage);

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function(event) {
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                event.preventDefault();
                const pageId = href.substring(1);
                showPage(pageId);
                window.location.hash = pageId;
            }
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
