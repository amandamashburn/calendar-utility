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

// Day number of the year
function getDayOfYear(d) {
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// Keep the getDayOfYear function for use in progress bar calculations
const dayOfYear = getDayOfYear(today);
const totalDays = 365; // or 366 for leap years
const percentageComplete = (dayOfYear / totalDays) * 100;

function updateProgress() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const totalDays = 365; // or 366 for leap years
    const percentageComplete = (dayOfYear / totalDays) * 100;

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const yearCompleted = document.getElementById('year-completed');
    const currentDate = document.getElementById('current-date');
    
    progressFill.style.width = `${percentageComplete}%`;
    yearCompleted.textContent = `${now.getFullYear()} is ${percentageComplete.toFixed(2)}% complete`;
    currentDate.textContent = now.toDateString(); // Display the current date
}

// Call updateProgress when the page loads
document.addEventListener('DOMContentLoaded', updateProgress);

function updateWeekInfo() {
    const now = new Date();
    const currentWeek = getWeekNumber(now);
    
    // Calculate full weeks remaining
    const totalWeeks = 52; // Assuming 52 weeks in a year
    const weeksRemaining = totalWeeks - currentWeek;
    
    // Update the DOM
    document.getElementById('weeks-remaining').textContent = weeksRemaining;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateWeekInfo();
    updateProgress();
});



