// GET ALL AVAIL SELECTORS
const addButton = document.querySelector('.add-button');
const addModal = document.querySelector('.add-modal');
const closeModal = document.querySelector('.close-modal');
const addForm = document.querySelector('.add-form');

const titleDOM = document.querySelector('#title');
const authorDOM = document.querySelector('#author');
const pagesDOM = document.querySelector('#pages');
const ratingDOM = document.querySelector('#rating');
const reviewDOM = document.querySelector('#review');

const libraryDOM = document.querySelector('.library-container');

// SET UP LIBRARY
const myLibrary = [];

function Book(title, author, pages, rating, review) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.rating = rating;
  this.review = review;
  this.hasRead = false;
}

// ADD-BOOK BUTTON EVENT LISTENER
addButton.addEventListener('click', () => {
  addModal.showModal();
});

// ADD-BOOK MODAL CLOSE EVENT LISTENERS
closeModal.addEventListener('click', () => {
  addModal.close();
})

addModal.addEventListener("click", (e) => {
  const modalDimensions = addModal.getBoundingClientRect()
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    addModal.close();
  }
})

// ADD-BOOK LOGIC
addForm.addEventListener('submit', () => {
  newBook = createBook();
  myLibrary.push(newBook);

  removeDOM();
  refreshDOM(myLibrary);

  addForm.reset();
});

function createBook() {
  title = titleDOM.value.trim().toUpperCase();
  author = authorDOM.value.trim();
  pages = pagesDOM.value;
  review = `${reviewDOM.value.trim()}`;

  if (ratingDOM.value.trim()) {
    rating = `${ratingDOM.value.trim()}/10`;
  } else {
    rating = "";
  }

  let newBook = new Book(title, author, pages, rating, review);
  return newBook;
}

function removeDOM() {
  let allBooksNodelist = document.querySelectorAll('.book');
  let allBooksArr = Array.from(allBooksNodelist);

  for (let book of allBooksArr) {
    libraryDOM.removeChild(book);
  }
}

function refreshDOM(arr) {
  for (let book of arr) {
    const newBookDOM = document.createElement('div');
    newBookDOM.classList.add('book');

    newBookDOM.setAttribute('data-index', `${arr.indexOf(book)}`);
    
    newBookDOM.innerHTML = 
    `
    <h2>${book.title}</h2>
    <h3>by ${book.author}<hr></h3>
    <div>
      <p>finished?</p>
      <p># pages:</p>
      <p>rating:</p>
    </div>
    <div>
      <input type="checkbox" name="checkbox">
      <p>${book.pages}</p>
      <p>${book.rating}</p>
    </div>
    <div>
      <h4>Review:</h4>
      <p>"${book.review}"</p>
    </div>
    <div>
      <button>Delete</button>
    </div>
    `;

    libraryDOM.appendChild(newBookDOM);
  }
}

// DELETE BOOK LOGIC
libraryDOM.addEventListener('click', (e) => {
  if (e.target.textContent == "Delete") {
    let dataIndex = getDataIndex(e);
    myLibrary.splice(dataIndex, 1);

    removeDOM();
    refreshDOM(myLibrary);
  }
});

function getDataIndex(e) {
  let selectedBook = e.target.parentElement.parentElement;
  return Number(selectedBook.getAttribute('data-index'));
}