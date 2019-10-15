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
        const { rentingBook, addBook } = this.props
        const { renter } = this.state
        
        return ( 
            <div className='form-wrapper'>
                <div className='form'>
                    <h4>Renting {rentingBook[0].title }</h4>
                    <input onChange={this.handleInput} type="text" name="username" placeholder="Username" 
                        value={this.state.renter.username}/>
                    <input onChange={this.handleInput} type="text" name="memberNo" placeholder="Membership No." 
                        value={this.state.renter.memberNo}/>       
                    <button onClick={() => addBook(rentingBook[0].id, renter)}>Rent</button>             
                </div>
            </div>
         );
    }
}
 
export default RentForm;