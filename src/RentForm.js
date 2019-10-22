import React, { Component } from "react";
import './App.css';

class RentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            renter: {username: '', memberNo: '', promisedReturnDate: ''}
         }
    }

    handleInput = e => {
        this.setState({
            renter: {
                ...this.state.renter,
                [e.target.name]: e.target.value
            }
        })
    }

    render() { 
        const { rentingBook, updateBook, error, handleCheckout } = this.props;
        const { renter } = this.state;
        
        return ( 
            <div className='form-wrapper'>
                <div className='form'>
                    {rentingBook[0] ? <h4>{rentingBook[0].rented ? 'Returning' : 'Renting' } {rentingBook[0].title }</h4> : null}
                    <input onChange={this.handleInput} type="text" name="username" placeholder="Username" 
                        value={ renter.username}/>
                    <input onChange={this.handleInput} type="text" name="memberNo" placeholder="Membership No." 
                        value={ renter.memberNo}/> 
                    {!rentingBook[0].rented ? <input onChange={this.handleInput} type="text" name="promisedReturnDate" placeholder="Promised Return Date"
                    value={ renter.promisedReturnDate} /> : null }
             
                    <button onClick={() => updateBook(rentingBook[0].id, renter)}>{rentingBook[0].rented ? 'Return' : 'Rent'}</button>    
                    {error.login ? <p className='error'>{error.login}</p> : null}       
                    {error.payment ? 
                        <div className='error'>
                            <p>{error.payment}</p>
                            <button onClick={() => handleCheckout(rentingBook[0].id)}>Pay</button>
                        </div> 
                    : null}                               
                </div>
            </div>
         );
    }
}
 
export default RentForm;