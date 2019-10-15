import React, { Component } from "react";
import './App.css';
import Book from './Book';
import RentForm from "./RentForm";


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [
                { id: 1, title: 'The Lord of the Rings ', author: 'J.R.R. Tolkien',renting: false, rented: false, returned: true, renter: '' },
                { id: 2, title: 'Harry Potter', author: 'JK Rowling',renting: false, rented: false, returned: true, renter: '' },
                { id: 3, title: '1984', author: 'George Orwell',renting: false, rented: false, returned: true, renter: '' },
                { id: 4, title: 'The Brothers Karamazov', author: 'Fyodor Dostoyevski',renting: false, rented: false, returned: true, renter: '' },
                { id: 5, title: 'The Trial', author: 'Franz Kafka',renting: false, rented: false, returned: true, renter: '' }
            ],
            rentFormShown: false
         }
    }

    toggleRentForm = (id) => {
        let clonedBooks = this.state.books.slice();
        //clear all 'rentings' because user might have closed the form by clicking another book
        clonedBooks.map(book => book.renting = false)
        const ind = clonedBooks.findIndex(book => book.id === id)
        clonedBooks[ind].renting = !clonedBooks[ind].renting;
        this.setState({ books: clonedBooks })
        this.setState(prevState => ({
            rentFormShown: !prevState.rentFormShown
        }))
    }

    addBook = (id, renter) => {
        let clonedBooks = this.state.books.slice();
        const ind = clonedBooks.findIndex(book => book.id === id)
        clonedBooks[ind].rented = true;
        clonedBooks[ind].returned = false;   
        clonedBooks[ind].renting = false;  
        clonedBooks[ind].renter = renter;                                                
        console.log(clonedBooks);
        this.setState({ rentFormShown: false, books: clonedBooks })
    }

    render() { 
        const { books, rentFormShown } = this.state;
        const availableBooks = books.filter(book => !book.rented)
        const rentingBook = books.filter(book => book.renting)

        return ( 
            <div className='main-wrapper'>
                <div className='forms'>
                        {/* <button>Rent a book</button> */}
                        {rentFormShown ? <RentForm rentingBook={rentingBook} addBook={this.addBook}/> : null}
                </div>
                <div className='books-wrapper'>   
                    {books.map(book => {
                        return <Book key={book.id} 
                                    bookData={book} 
                                    rentFormShown={rentFormShown} 
                                    toggleRentForm={this.toggleRentForm}
                                    />
                    })}

                </div>
            </div>
        );
    }
}
 
export default Books;