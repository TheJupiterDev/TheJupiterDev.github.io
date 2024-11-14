document.addEventListener("DOMContentLoaded", () => {
    const splash = document.querySelector(".splash-screen");
    const content = document.querySelector(".content");

    // Show main content and fade out splash on scroll
    window.addEventListener("scroll", () => {
        splash.classList.add("fade-out");
        content.classList.add("visible"); // reveal content with fade-in

        setTimeout(() => {
            splash.style.display = "none";
        }, 1000); // 1 second fade-out duration
    });

    // Matrix effect on canvas
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const characters = matrixCharacters.split("");
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 13, 13, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ff4d4d";
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, i) => {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, y * fontSize);

            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    setInterval(drawMatrix, 50);

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
