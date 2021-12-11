import React , {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actionCreator from '../store/actions/index';
class Signup extends Component {
    state = {
       name : '',
       email : '',
       password : '' 
    }
    nameInputHandler = (value) => {
        this.setState({name : value})
    }
    emailInputHandler = (value) => {
        this.setState({email : value})
    }
    passwordInputHandler = (value) => {
        this.setState({password : value})
    }
    signupHandler = () => {
        this.props.onAuthenticate(this.state.name, this.state.email, this.state.password,true);
    }
    openLoginHandler = () => {
        this.props.history.push('/login');
    }
    render() {
        return (
            <div>
                <h1 align="center">Signup</h1>
                <input placeholder="Name" type="text" value={this.state.name} onChange={(event) => this.nameInputHandler(event.target.value)}/>
                <input placeholder="Email" type="email" value={this.state.email} onChange={(event) => this.emailInputHandler(event.target.value)}/>
                <input placeholder="Password" type="password" value={this.state.password} onChange={(event) => this.passwordInputHandler(event.target.value)}/>
                <button onClick={() => this.signupHandler()}>Signup</button>
                <br/>
                <p>Already have an account?</p>
                <button onClick={() => {this.openLoginHandler()}}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate : (name,email,password,isSignup) => (dispatch(actionCreator.auth(name,email,password,isSignup)))
    }
}

export default withRouter (connect(mapStateToProps,mapDispatchToProps)(Signup));