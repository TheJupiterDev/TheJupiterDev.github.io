function setProgress(circleId, percentage) {
    const circle = document.querySelector(`#${circleId} .progress`);
    const text = document.querySelector(`#${circleId} .progress-text`);
    const offset = 314 - (314 * percentage / 100);
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percentage}%`;
}
window.onload = function() {
    setProgress('progress1', 18);
    setProgress('progress2', 35);
    setProgress('progress3', 60);
    setProgress('progress4', 16);
}
function showPage(pageId) {
    const sections = document.querySelectorAll(".content section");
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(pageId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    showPage("about");
    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const pageId = this.getAttribute("href").substring(1);
            showPage(pageId);
        });
    });
});