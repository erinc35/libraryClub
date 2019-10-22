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
        const { rentingBook, updateBook, error } = this.props;
        const { renter } = this.state;
        
        return ( 
            <div className='form-wrapper'>
                <div className='form'>
                    {rentingBook[0] ? <h4>{rentingBook[0].rented ? 'Returning' : 'Renting' } {rentingBook[0].title }</h4> : null}
                    <input onChange={this.handleInput} type="text" name="username" placeholder="Username" 
                        value={ renter.username}/>
                    <input onChange={this.handleInput} type="text" name="memberNo" placeholder="Membership No." 
                        value={ renter.memberNo}/> 
                    <input onChange={this.handleInput} type="text" name="promisedReturnDate" placeholder="Promised Return Date"
                        value={ renter.promisedReturnDate} />
             
                    <button onClick={() => updateBook(rentingBook[0].id, renter)}>{rentingBook[0].rented ? 'Return' : 'Rent'}</button>    
                    {error.length > 0 ? <p className='error'>{error}</p> : null}         
                </div>
            </div>
         );
    }
}
 
export default RentForm;