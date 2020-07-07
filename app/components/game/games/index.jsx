const React = require('react');
const Game = require('../game');
const {Link} = require ('react-router-dom');

class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: null,
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        fetch(`/api/game/`)
            .then(res => res.json()).then((data) =>{
                console.log(data.listGames);
            this.setState({
                games: data.listGames,
                loading: false,
                error: false,
            });
        })
            .catch((err) => {
                console.error(err);
                this.setState({
                    games: null,
                    loading: false,
                    error: true,
                });
            });
    }
          
    


    render() {

        if (this.state.loading) {

            return <div>Cargando jugadores ...</div>
        }
        console.log(this.state.games);
        const games  = this.state.games;

        return (

            <div>
                <div className="games"><p> . </p></div>

                {/* <Link to={`/games/new`}>Crear nuevo jugador</Link>   */}              
                <div class="ui middle aligned selection list" className="games"/* "ui vertical list" */>


                                <ul className="games" >
                                    {
                                        games.map(game => (
                                            <Game key={game.idgame} id={game.idgame} date_game={game.date_game} idField={game.idField} idReport={game.idReport} idChampionship={game.idChampionship} idDate={game.idDate}/>
                                        )) 
                                    }
                                </ul>  
              

                </div>
            </div>
        );
    }
};

module.exports = Games;
