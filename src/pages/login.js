import React , {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actionCreator from '../store/actions/index';
class Login extends Component {
    
    state = {
        email : '',
        password : '' 
    }
    emailInputHandler = (value) => {
        this.setState({email : value})
    }
    passwordInputHandler = (value) => {
        this.setState({password : value})
    }
    openSingupHandler = () => {
        this.props.history.push('/signup');
    }
    loginHandler = () => {
        this.props.onAuthenticate('',this.state.email, this.state.password,false);
    }
    render() {
        return (
            <div>
                <h1 align="center">Login</h1>
                <input placeholder="Email" type="email" value={this.state.email} onChange={(event) => this.emailInputHandler(event.target.value)}/>
                <input placeholder="Password" type="password" value={this.state.password} onChange={(event) => this.passwordInputHandler(event.target.value)}/>
                <button onClick={()=>{this.loginHandler()}}>Login</button>
                <br/>
                <p>Don't have an account?</p>
                <button onClick={()=>{this.openSingupHandler()}}>Signup</button>
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

export default withRouter (connect(mapStateToProps,mapDispatchToProps)(Login));