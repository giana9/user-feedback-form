// Comments character count
const commentsInput = document.getElementById("comments");
const charCount = document.getElementById("char-count");

commentsInput.addEventListener("input", function () {
    charCount.textContent = this.value.length + " characters";
});

// Display and hide tooltips
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip); // create tooltip

// Tooltip event delegation + bubbling
const form = document.getElementById("feedback-form");

form.addEventListener("mouseover", function (e) {
    if (e.target.dataset.tooltip) {
        tooltip.textContent = e.target.dataset.tooltip;
        tooltip.style.display = "block";
        tooltip.style.left = e.pageX + "px";
        tooltip.style.top = e.pageY + "px";
    }
});

form.addEventListener("mouseout", function () {
    tooltip.style.display = "none";
});

// Prevent submission if fields are empty, show validation messages
form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const comments = commentsInput.value.trim();

    if (!username || !email || !comments) {
        alert("Please fill out all fields");
        return;
    }

    // If valid...
    addFeedbackEntry(username, email, comments);

    form.reset();
    charCount.textContent = "0 characters";
});


// Dynamically append valid feedback entries
const feedbackDisplay = document.getElementById("feedback-display");

function addFeedbackEntry(username, email, comments) {
    const entry = document.createElement("div");

    entry.innerHTML = `
        <p><strong>${username}</strong> (${email})</p>
        <p>${comments}</p>
        <hr>
    `;

    feedbackDisplay.appendChild(entry);
}

// Prevent BG clicks from triggering form events
document.body.addEventListener("click", function (e) {
    e.stopPropagation();
});