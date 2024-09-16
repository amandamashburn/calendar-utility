// Get current date
const dateElement = document.getElementById("current-date");
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
dateElement.textContent = `${year}.${month}.${day}`;

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

// Chart progress
const progressBar = document.getElementById('progress-bar');
const totalDays = 365;
const dayOfYear = getDayOfYear(today);
const percentageComplete = (dayOfYear / totalDays) * 100;

function updateProgress() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const start = new Date(currentYear, 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const percentage = (day / 365) * 100;

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const yearCompleted = document.getElementById('year-completed');
    const currentDate = document.getElementById('current-date');
    
    progressFill.style.width = `${percentage}%`;
    yearCompleted.textContent = `${currentYear} is ${percentage.toFixed(2)}% complete`;
    currentDate.textContent = now.toDateString(); // Display the current date
}

// Call updateProgress when the page loads
document.addEventListener('DOMContentLoaded', updateProgress);


