const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadBtn = document.querySelector("#load-btn");
const submitBtn = document.querySelector("#submit-btn");
const statusText = document.querySelector("#status");
const notesList = document.querySelector("#notes-list");

const noteForm = document.querySelector("#note-form");
const titleInput = document.querySelector("#title-input");
const bodyInput = document.querySelector("#body-input");

let notes = [];

async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    return {
        data,
        status: response.status
    };
}

function renderNotes(notesToRender) {
    notesList.textContent = "";

    if (notesToRender.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No notes available.";
        notesList.appendChild(li);
        return;
    }

    notesToRender.forEach(note => {
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
        const result = await request(
            `${API_URL}?_limit=10`
        );

        notes = result.data;

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

async function createNote(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title === "") {
        statusText.className = "error";
        statusText.textContent =
            "Title is required.";
        return;
    }

    if (title.length > 100) {
        statusText.className = "error";
        statusText.textContent =
            "Title must be 100 characters or fewer.";
        return;
    }

    submitBtn.disabled = true;

    try {
        const result = await request(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                userId: 1
            })
        });

        notes.unshift(result.data);

        renderNotes(notes);

        statusText.className = "success";
        statusText.textContent =
            `Note created (status ${result.status}, id ${result.data.id}).`;

        noteForm.reset();
    } catch (error) {
        statusText.className = "error";
        statusText.textContent =
            "Failed to create note.";
    } finally {
        submitBtn.disabled = false;
    }
}

loadBtn.addEventListener("click", loadNotes);
noteForm.addEventListener("submit", createNote);