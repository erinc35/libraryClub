import React, { Component } from "react";
import './App.css';


const Book = props => {
    const { id, title, author, rented, returned } = props.bookData

    return (
        <div className='book'>
            <h2>{title}</h2>
            <h4>{author}</h4>   
            <button onClick={() => props.toggleRentForm(id)}>{!props.rented ? 'Rent' : 'Return'}</button>      
        </div>
    )
}

export default Book;