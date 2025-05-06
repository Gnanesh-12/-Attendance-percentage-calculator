document.getElementById("attendanceform").addEventListener("submit", function(event) {
    event.preventDefault();

    const requiredPercentage = parseFloat(document.getElementById("percentage").value);
    const present = parseInt(document.getElementById("present").value);
    const total = parseInt(document.getElementById("total").value);

    if (isNaN(present) || isNaN(total) || present < 0 || total <= 0 || present > total) {
        alert("Please enter valid numbers. 'Present' should be ≤ 'Total'.");
        return;
    }

    const currentPercentage = (present / total) * 100;
    let message = "";

    if (currentPercentage >= requiredPercentage) {
        let maxbunk = 0;
        let futurepresent = present;
        let futuretotal = total;

        while ((futurepresent / futuretotal) * 100 >= requiredPercentage) {
            maxbunk++;
            futuretotal++;
        }

        maxbunk--;
        futuretotal--;

        message = `You can bunk for ${maxbunk} more days. \n` +
                  `Current Attendance: ${present}/${total} -> ${currentPercentage.toFixed(2)}% \n` +
                  `Attendance then: ${futurepresent}/${futuretotal} -> ${((futurepresent / futuretotal) * 100).toFixed(2)}%`;
    } else {
        let needed = 0;
        let futureTotal = total;
        let futurePresent = present;

        while ((futurePresent / futureTotal) * 100 < requiredPercentage) {
            needed++;
            futureTotal++;
            futurePresent++;
        }

        message = `You need to attend ${needed} more days. \n` +
                  `Current Attendance: ${present}/${total} -> ${currentPercentage.toFixed(2)}% \n` +
                  `Attendance then: ${futurePresent}/${futureTotal} -> ${((futurePresent / futureTotal) * 100).toFixed(2)}%`;
    }

    localStorage.setItem("attendanceResult", message);
    localStorage.setItem("present", present);
    localStorage.setItem("total", total);

    window.location.href = "result.html";
});