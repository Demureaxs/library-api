//Example fetch using pokemonapi.co
const searchButton = document.querySelector('#search');
searchButton.addEventListener('click', getFetch);

const btnSaveBook = document.querySelector('.saveBook');

const myBooks = document.querySelector('#myBooks');

const h2 = document.querySelectorAll('h2');

const container = document.querySelector('.container');

function getFetch() {
  const choice = document.querySelector('input').value;
  console.log(choice);
  const url = `https://openlibrary.org/isbn/${choice}.json`;

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data);
      container.innerHTML = `
        <div class='bookCard'>
          <h2>Title:</h2>
          <p class="title">${data.title}</p>
          <h2>Author:</h2>
          <p class="author">${data.by_statement}</p>
          <h2>Description:</h2>
          <p class="desc">${data.description?.value}</p>
        </div>
      `;
      btnSaveBook.style.display = 'block';
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

btnSaveBook.addEventListener('click', saveBook);

function saveBook() {
  if (!localStorage.getItem('books')) localStorage.setItem('books', '[]');
  //declared variables to get values
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  const description = document.querySelector('.desc');

  const booksSaved = JSON.parse(localStorage.getItem('books'));
  const currentBook = {
    title: title.innerText,
    author: author.innerText,
    description: description.innerText,
  };

  booksSaved.push(currentBook);
  localStorage.setItem('books', JSON.stringify(booksSaved));
  console.log(localStorage.getItem('books'));
}

myBooks.addEventListener('click', getMyBooks);

function getMyBooks() {
  if (localStorage.getItem('books')) {
    const savedBooks = JSON.parse(localStorage.getItem('books'));
    console.log(savedBooks);
    btnSaveBook.style.display = 'none';
    container.innerHTML = '';
    container.innerHTML += savedBooks
      .map(book => {
        return `
        <div class="bookCard">      
          <h2>Title:</h2>
          <p class="title">${book.title}</p>
          <h2>Author:</h2>
          <p class="author">${book.author}</p>
          <h2>Description:</h2>
          <p class="desc">${book.description}</p>
        </div>
      `;
      })
      .join(' ');
  }
}
