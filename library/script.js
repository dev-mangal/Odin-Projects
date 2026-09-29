const myLib = [];
const container = document.querySelector(".container");
const form = document.querySelector("#book-form");
const dialog = document.querySelector("#book-dialog");
const btn = document.querySelector("#new-book");
const cancel = document.querySelector("#cancel");

function Book(title, author, pages, haveRead, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.readStatus = this.haveRead ? "read" : "not read";
    this.id = id;
}

Book.prototype.toggleReadStatus = function() {
    this.haveRead = !this.haveRead;
    this.readStatus = this.haveRead ? "read" : "not read";
};

// Book.prototype.info = function() {
//     const readstatus = this.haveRead ? "read already" : "not read yet";
//     return (`${this.title} by ${this.author}, ${this.pages} pages, ${readstatus}`);
// }

function addBook(title, author, pages, haveRead) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, haveRead, id);
    myLib.push(book);
}

addBook("wqvqvqv", "dev", 250, false);
addBook("qwvqvqv", "dev", 250, true);
addBook("qvqvqvq", "dev", 250, true);
addBook("qvqvqvq", "dev", 250, true);
addBook("vqvqvqv", "dev", 250, true);
addBook("qvqvqvq", "dev", 250, true);
addBook("qvqvqvq", "dev", 250, true);
addBook("qvqvqvq", "dev", 250, true);

function createElement(tag, className){
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}

function displayBooks(){
    container.innerHTML = ""; //reset the display since we call function many times
    for(let book of myLib){
        const div = createElement("div", "book");
        container.appendChild(div);

        const title = createElement("p", "title");
        title.textContent = book.title;

        const pages = createElement("p", "pages");
        pages.textContent = `${book.pages} pages`;

        const author = createElement("p", "author");
        author.textContent = `--${book.author}`;

        const readStatus = createElement("p", "read-status");
        readStatus.textContent = book.readStatus;
        if(readStatus.textContent === "read") readStatus.style.color = "lightgreen";
        else readStatus.style.color = "red";

        const buttonContainer = createElement("div", "button-container");

        const readBtn = createElement("button", "read-btn");
        readBtn.textContent = "Read Status";

        readBtn.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks();
        });

        const deleteBtn = createElement("button", "delete-btn");
        deleteBtn.textContent = "Delete Book";

        deleteBtn.addEventListener("click", () => {
            const index = myLib.findIndex(b => b.id === book.id);
            if(index !== -1){
                myLib.splice(index, 1);
            }
            displayBooks();
        });

        div.appendChild(title);
        div.appendChild(pages);
        div.appendChild(author);
        div.appendChild(readStatus);
        div.appendChild(buttonContainer);
        buttonContainer.appendChild(readBtn);
        buttonContainer.appendChild(deleteBtn);
    }
}

btn.addEventListener("click", () => {
    dialog.showModal();
});

cancel.addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault(); //submit tries to send data to server, prevent that
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const pages = Number(form.elements.pages.value);
    const haveRead = form.elements.haveRead.checked;

    addBook(title, author, pages, haveRead);
    displayBooks();

    form.reset();
    dialog.close();
});

displayBooks();