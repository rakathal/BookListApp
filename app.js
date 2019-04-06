// Book Class: Represent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'Mark',
                isbn: '455654'
            },
            {
                title: 'Book Two',
                author: 'Jane',
                isbn: '45689'
            }
        ];
        const books = StoredBooks;

        books.forEach(book =>
            UI.addBookToList(book)
        );
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //Vanish in 3 second
        setTimeout(() => document.querySelector('.alert').remove(),3000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handle Storage(Local Storages)
class Store {
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBook();        
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook() {
        const books = Store.getBook();
        books.forEach((book, index) => {
            if(book.isbn === isbm) {
                book.splice(index, 1);
            }
        });

        localStorage.setItem('books', JOSN.stringify(books));
    }
}


// Events : Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (event) => {
    //Prevent Actual Submit
    event.preventDefault();

    //Get form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all the fields', 'danger')
    } else {
        //Instantiate book
        const book = new Book(title, author, isbn);

        //Add Book to UI
        UI.addBookToList(book);

        //Show Success Message
        UI.showAlert('Book Added', 'success');

        //Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (event) => {
    //Prevent Actual Submit
    event.preventDefault();

    UI.deleteBook(event.target);

    //Show Success Message
    UI.showAlert('Book Removed', 'success');
});









