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
            error: { login: '', payment: ''},
            currentRenter: ''
         }
    }

    toggleRentForm = (id) => {
        let clonedBooks = this.state.books.slice();
        //clear all 'rentings' because user might have closed the form by clicking another book
        clonedBooks.map(book => book.renting = false)
        const ind = clonedBooks.findIndex(book => book.id === id)
        clonedBooks[ind].renting = !clonedBooks[ind].renting;
        this.setState({ books: clonedBooks, error: '' })
        this.setState(prevState => ({
            rentFormShown: !prevState.rentFormShown
        }))
    }

    handleCheckout = (id) => {
        let clonedBooks = this.state.books.slice();
        const ind = clonedBooks.findIndex(book => book.id === id)
        clonedBooks[ind].rented = false;
        clonedBooks[ind].renting = false;
        this.setState({ rentFormShown: false, books: clonedBooks, error: '', currentRenter: '' })
    }

    rentBook = (id, renter) => {
        let clonedBooks = this.state.books.slice();
        const ind = clonedBooks.findIndex(book => book.id === id)
        if (renter.username === '' || renter.memberNo === '' || renter.promisedReturnDate === '') {
            this.setState({
                error: {
                    ...this.state.error,
                    login: 'Please complete all fields.'
                }
            })
        } else {
            clonedBooks[ind].rented = true;
            clonedBooks[ind].returned = false;
            clonedBooks[ind].renting = false;
            clonedBooks[ind].renter = renter;
            clonedBooks[ind].rentedAt = new Date().toISOString().slice(0, 10)
            this.setState({ rentFormShown: false, books: clonedBooks, currentRenter: renter, error: '' })
        }
    }

    returnBook = () => {
        
    }

    updateBook = (id, renter) => {
        let clonedBooks = this.state.books.slice();
        const ind = clonedBooks.findIndex(book => book.id === id)
        //Renting
        if (!clonedBooks[ind].rented){
            this.rentBook(id, renter)
        }//RETURNING
        else {
            
            clonedBooks[ind].returned = true;
            clonedBooks[ind].renter = '';
            clonedBooks[ind].rentedAt = ''
            let currentRenter = this.state.currentRenter;
            // console.log(new Date(currentRenter.promisedReturnDate.toString().toISOString().slice(0, 10)) < new Date().toISOString().slice(0, 10)) 
            if (currentRenter.username === '' || currentRenter.memberNo === ''){
                this.setState({
                    error: {
                        ...this.state.error,
                        login: 'Please complete all fields.'
                    }
                })
            }
            else if (currentRenter.username !== renter.username || currentRenter.memberNo !== renter.memberNo){
                this.setState({ 
                    error: {
                        ...this.state.error,
                        login: 'Please check your credentials.'
                    }
                })
            } else if (new Date(currentRenter.promisedReturnDate.toString()).toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10)){
                this.setState({
                    error: {
                        ...this.state.error,
                        login: '',
                        payment: 'You have a balance of $5 due to late return.'
                    }
                })              
            }
            else{
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
            <h1>Welcome to Infrrd Library</h1>
                <div className='forms'>
                    {rentFormShown ? <RentForm rentingBook={rentingBook} updateBook={this.updateBook} handleCheckout={this.handleCheckout} currentRenter={currentRenter} error={error} /> : null}
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