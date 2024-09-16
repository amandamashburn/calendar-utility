// Get current date
const dateElement = document.getElementById("current-date");
const today = new Date();
const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
dateElement.textContent = today.toLocaleDateString(undefined, options).replace(/\//g, '.');

// Calculate week number (ISO 8601)
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

document.getElementById("week-number").textContent = getWeekNumber(today);

// Day number of the year
function getDayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
document.getElementById("day-number").textContent = getDayOfYear(today);

// Donut chart progress
const progressBar = document.getElementById('progress-bar');
const totalDays = 365;
const dayOfYear = getDayOfYear(today);
const percentageComplete = (dayOfYear / totalDays) * 100;

progressBar.style.strokeDashoffset = 283 - (283 * (percentageComplete / 100));
document.getElementById('progress-text').textContent = `${Math.round(percentageComplete)}%`;

// Toggle light/dark mode
const toggle = document.getElementById('mode-toggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
