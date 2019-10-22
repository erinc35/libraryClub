import React from "react";
import './App.css';


const Book = props => {
    const { id, title, author, rented, renter, rentedAt } = props.bookData
    
    return (
        <div className='book'>
            <h2>{title}</h2>
            <h4>{author}</h4>   
            <button onClick={() => props.toggleRentForm(id)}>{!rented ? 'Rent' : 'Return'}</button> 
            {rented ? 
                <div>
                    <p> Renting by {renter.username} </p> 
                    <p> Rented at {rentedAt} </p> 
                    <p> Promised return date {returnDate} </p>                     
                                        
                </div>
            : null}
            
        </div>
    )
}

export default Book;