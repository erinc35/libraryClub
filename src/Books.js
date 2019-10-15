import React, { Component } from "react";
import './App.css';
import Book from './Book';
import RentForm from "./RentForm";


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            books: [
                { id: 1, title: 'The Lord of the Rings ', author: 'J.R.R. Tolkien',renting: false, rented: false, returned: true, renter: '', rentedAt: '' },
                { id: 2, title: 'Harry Potter', author: 'JK Rowling',renting: false, rented: false, returned: true, renter: '', rentedAt: '' },
                { id: 3, title: '1984', author: 'George Orwell',renting: false, rented: false, returned: true, renter: '', rentedAt: '' },
                { id: 4, title: 'The Brothers Karamazov', author: 'Fyodor Dostoyevski',renting: false, rented: false, returned: true, renter: '', rentedAt: '' },
                { id: 5, title: 'The Trial', author: 'Franz Kafka',renting: false, rented: false, returned: true, renter: '', rentedAt: '' }
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
            console.log(this.state.currentRenter);
            clonedBooks[ind].returned = true;
            clonedBooks[ind].renter = '';
            clonedBooks[ind].rentedAt = ''
            let currentRenter = this.state.currentRenter;
            if (currentRenter.username !== renter.username || currentRenter.memberNo !== renter.memberNo){
                console.log('hata vvar');
                
                this.setState({ ...this.state.books, error: 'Please check the username or memberNo'})
            }else{
                console.log('hata yok');
                clonedBooks[ind].rented = false;                
                clonedBooks[ind].renting = false;                
                this.setState({ rentFormShown: false, books: clonedBooks, error: '', currentRenter: '' })
            }
        }
        
        // console.log(clonedBooks);
    }

    render() { 
        const { books, rentFormShown, renter, currentRenter, error, currentEvent } = this.state;
        const availableBooks = books.filter(book => !book.rented)
        const rentingBook = books.filter(book => book.renting)

        return ( 
            <div className='main-wrapper'>
                <div className='forms'>
                        {/* <button>Rent a book</button> */}
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