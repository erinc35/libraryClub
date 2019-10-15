import React, { Component } from "react";
import './App.css';

class RentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            memberNo: ''
         }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() { 
        console.log(this.props.rentingBook);
        
        return ( 
            <div className='form-wrapper'>
                <form className='form'>
                    <h4>Renting {this.props.rentingBook[0].title}</h4>
                    <input onChange={this.handleInput} type="text" name="username" placeholder="Username" value={this.state.username}/>
                    <input onChange={this.handleInput} type="text" name="memberNo" placeholder="Membership No." value={this.state.memberNo}/>       
                    <button type="submit">Rent</button>             
                </form>
            </div>
         );
    }
}
 
export default RentForm;