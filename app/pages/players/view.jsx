const React = require('react');
const { Route } = require('react-router-dom');
const Players = require('../../components/Player/players');
const PlayerDetail = require ('../../components/Player/player-details');
const NewPlayer = require ('../../components/Player/new-player');
const Signin = require ('../../components/autentication/signin');
const Signup = require ('../../components/autentication/signup');

class PlayersPage extends React.Component {
    render() {
        console.log("PlayersPage");
        //console.log(path);
        const { players } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    exact
                    path="/players/signin"
                    render={(props) => <Signin {...props} id={props.match.params.id}/>}
                />    
                <Route
                    exact
                    path="/autentication/signup"
                    render={(props) => <Signup {...props} id={props.match.params.id}/>}
                />                 
                <Route
                    path="/players/:id"
                    render={(props) => <PlayerDetail {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/players"
                    render={(props) => <Players {...props} players={players}/>}
                />
                <Route
                    exact
                    path="/players/new"
                    render={(props) => <NewPlayer {...props} players={players}/>}
                />                           
            </React.Fragment>
        );
    }
};

module.exports = PlayersPage;
