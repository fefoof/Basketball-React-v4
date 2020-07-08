const React = require('react');
const { Route } = require('react-router-dom');
const User = require('../../components/User/user');
const Signin = require ('../../components/autentication/signin');


class AutenticationPage extends React.Component {
    render() {
        console.log("AutenticationPage");
        //console.log(path);
        const { autentication } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    path="/signin"
                    render={(props) => <Signin {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/signup"
                    render={(props) => <Players {...props} users={users}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = AutenticationPage;
