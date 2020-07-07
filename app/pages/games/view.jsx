const React = require('react');
const { Route } = require('react-router-dom');
const Games = require('../../components/game/games');
const GameDetail = require ('../../components/game/game-details');
const NewGame = require ('../../components/game/new-game');

class GamesPage extends React.Component {
    render() {
        console.log("GamesPage");
        //console.log(path);
        const { games } = this.props.initialState;
        return (
            <React.Fragment>
                <Route
                    path="/games/:id"
                    render={(props) => <GameDetail {...props} id={props.match.params.id}/>}
                />
                <Route
                    exact
                    path="/games"
                    render={(props) => <Games {...props} games={games}/>}
                />
                <Route
                    exact
                    path="/games/new"
                    render={(props) => <NewGame {...props} games={games}/>}
                />
            </React.Fragment>
        );
    }
};

module.exports = GamesPage;
