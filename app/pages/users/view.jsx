const React = require('react');
const { Route } = require('react-router-dom');
const Users = require('../../components/User/users');
const UserDetail = require ('../../components/User/user-details');
const NewUser = require ('../../components/User/new-user');
const Signin = require ('../../components/autentication/signin');
const Signup = require ('../../components/autentication/signup');

class UsersPage extends React.Component {
    render() {
        console.log("UsersPage");
        //console.log(path);
        const { users } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/users/detail/:id"
                    render={(props) => <UserDetail {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/users/signin"
                    render={(props) => <Signin {...props} /* id={props.match.params.id} *//>}
                />                   
                <Route
                    exact
                    path="/users/signup"
                    render={(props) => <Signup {...props} /* id={props.match.params.id} *//>}
                />                            
                <Route
                    exact
                    path="/users"
                    render={(props) => <Users {...props} users={users}/>}
                />
                <Route
                    exact
                    path="/users/new"
                    render={(props) => <NewUser {...props} users={users}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = UsersPage;
