import React, { Component } from "react";
import './App.css';

class RentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            renter: {username: '', memberNo: ''}
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
        const { rentingBook, updateBook, currentRenter, error } = this.props
        const { renter } = this.state
        
        return ( 
            <div className='form-wrapper'>
                <div className='form'>
                    {rentingBook[0] ? <h4>Updating {rentingBook[0].title }</h4> : null}
                    <input onChange={this.handleInput} type="text" name="username" placeholder="Username" 
                        value={this.state.renter.username}/>
                    <input onChange={this.handleInput} type="text" name="memberNo" placeholder="Membership No." 
                        value={this.state.renter.memberNo}/>       
                    <button onClick={() => updateBook(rentingBook[0].id, renter)}>Update</button>    
                    {error.length > 0 ? <p className='error'>{error}</p> : null}         
                </div>
            </div>
         );
    }
}
 
export default RentForm;