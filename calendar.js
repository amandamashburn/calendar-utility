window.onload = function() {
    const calendarTableBody = document.querySelector("#calendar-table tbody");
    const today = new Date();

    // Get the first Monday of the year
    const getFirstMonday = () => {
        const year = today.getFullYear();
        const firstJan = new Date(year, 0, 1);
        const dayOfWeek = firstJan.getDay();
        const firstMonday = new Date(year, 0, ((dayOfWeek === 0 ? 7 : dayOfWeek) - 1));
        firstMonday.setDate(firstMonday.getDate() + (1 - firstMonday.getDay()));
        return firstMonday;
    };

    const firstMonday = getFirstMonday();

    // Loop through 52 weeks and create rows
    for (let week = 1; week <= 52; week++) {
        const row = document.createElement("tr");
        const weekCell = document.createElement("td");
        weekCell.textContent = week.toString().padStart(2, '0');  // Week number
        row.appendChild(weekCell);

        // Loop through 7 days for each week
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement("td");
            const currentDate = new Date(firstMonday);
            currentDate.setDate(firstMonday.getDate() + (week - 1) * 7 + day);

            // Format the date based on the user's locale settings, but with a period separator
            const formattedDate = new Intl.DateTimeFormat(undefined, {
                month: '2-digit',
                day: '2-digit',
            }).format(currentDate).replace(/[/.-]/g, '.');

            // Check if the date is in the past
            if (currentDate < today) {
                cell.classList.add('past-date');
            }

            cell.textContent = formattedDate;
            row.appendChild(cell);
        }

        calendarTableBody.appendChild(row);
    }
};
