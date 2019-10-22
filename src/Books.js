import React, { Component } from "react";
import './App.css';
import Book from './Book';
import RentForm from "./RentForm";


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [
                { id: 1, title: 'The Lord of the Rings ', author: 'J.R.R. Tolkien',renting: false, rented: false, returned: true, renter: '', rentedAt: '', promisedReturnDate: '' },
                { id: 2, title: 'Harry Potter', author: 'JK Rowling',renting: false, rented: false, returned: true, renter: '', rentedAt: '', promisedReturnDate: '' },
                { id: 3, title: '1984', author: 'George Orwell',renting: false, rented: false, returned: true, renter: '', rentedAt: '', promisedReturnDate: '' },
                { id: 4, title: 'The Brothers Karamazov', author: 'Fyodor Dostoyevski',renting: false, rented: false, returned: true, renter: '', rentedAt: '', promisedReturnDate: '' },
                { id: 5, title: 'The Trial', author: 'Franz Kafka',renting: false, rented: false, returned: true, renter: '', rentedAt: '', promisedReturnDate: '' }
            ],
            rentFormShown: false,
            error: '',
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

    updateBook = (id, renter) => {
        let clonedBooks = this.state.books.slice();
        const ind = clonedBooks.findIndex(book => book.id === id)
        if (!clonedBooks[ind].rented){
            clonedBooks[ind].rented = true;
            clonedBooks[ind].returned = false;
            clonedBooks[ind].renting = false;
            clonedBooks[ind].renter = renter;
            clonedBooks[ind].rentedAt = new Date().toISOString().slice(0, 10)
            this.setState({ rentFormShown: false, books: clonedBooks, currentRenter: renter })
        }else {
            clonedBooks[ind].returned = true;
            clonedBooks[ind].renter = '';
            clonedBooks[ind].rentedAt = ''
            let currentRenter = this.state.currentRenter;
            if (currentRenter.username !== renter.username || currentRenter.memberNo !== renter.memberNo){
                this.setState({ ...this.state.books, error: 'Please check the username or memberNo'})
            }else{
                clonedBooks[ind].rented = false;                
                clonedBooks[ind].renting = false;                
                this.setState({ rentFormShown: false, books: clonedBooks, error: '', currentRenter: '' })
            }
        }
        
    }

    render() { 
        const { books, rentFormShown, currentRenter, error } = this.state;
        const rentingBook = books.filter(book => book.renting)

        return ( 
            <div className='main-wrapper'>
                <div className='forms'>
                    {rentFormShown ? <RentForm rentingBook={rentingBook} updateBook={this.updateBook} currentRenter={currentRenter} error={error} /> : null}
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