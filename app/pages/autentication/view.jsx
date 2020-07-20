const React = require('react');
const { Route } = require('react-router-dom');
const User = require('../../components/User/user');
const Signin = require ('../../components/autentication/signin');
const Signup = require ('../../components/autentication/signup');


class AutenticationPage extends React.Component {
    render() {
        console.log("AutenticationPage");
        //console.log(path);
        const { autentication } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    exact                
                    path="/signin"
                    render={(props) => <Signin {...props} autentication={autentication}/>}
                />
                <Route
                    exact
                    path="/signup"
                    render={(props) => <Signup {...props} id={props.match.params.id}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = AutenticationPage;
