import React, { Component } from "react";
import './App.css';
import Book from './Book';


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [
                { id: 1, book: 'The Lord of the Rings ', author: 'J.R.R. Tolkien', saved: false, read: false },
                { id: 2, book: 'Harry Potter', author: 'JK Rowling', saved: false, read: false },
                { id: 3, book: '1984', author: 'George Orwell', saved: false, read: false },
                { id: 4, book: 'The Brothers Karamazov', author: 'Fyodor Dostoyevski', saved: false, read: false },
                { id: 5, book: 'The Trial', author: 'Franz Kafka', saved: false, read: false }
            ],
         }
    }
    render() { 
        return ( 
            <div>   
                {this.state.books.map(book => {
                    return <Book />
                })}

            </div> );
    }
}
 
export default Books;