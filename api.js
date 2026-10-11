const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadBtn = document.querySelector("#load-btn");
const statusText = document.querySelector("#status");
const notesList = document.querySelector("#notes-list");

async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}

function renderNotes(notes) {
    notesList.textContent = "";

    if (notes.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No notes available.";
        notesList.appendChild(li);
        return;
    }

    notes.forEach(note => {
        const li = document.createElement("li");

        const title = document.createElement("h3");
        title.textContent = note.title;

        const body = document.createElement("p");
        body.textContent = note.body;

        li.appendChild(title);
        li.appendChild(body);

        notesList.appendChild(li);
    });
}

async function loadNotes() {
    loadBtn.disabled = true;

    statusText.className = "";
    statusText.textContent = "Loading notes...";

    try {
        const notes = await request(
            `${API_URL}?_limit=10`
        );

        renderNotes(notes);

        statusText.className = "success";
        statusText.textContent =
            "Loaded 10 notes from the server.";
    } catch (error) {
        statusText.className = "error";
        statusText.textContent =
            "Could not load notes. Please try again.";
    } finally {
        loadBtn.disabled = false;
    }
}

loadBtn.addEventListener("click", loadNotes);