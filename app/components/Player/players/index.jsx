const React = require('react');
const Player = require('../player');
const {Link} = require ('react-router-dom');

class Players extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialPlayer:[],
            players: [],
            loading: true,
            error: false,
            filter: {
                idplayer: '',
                name: '',
                surname:''                
            },
        };

        this.handleCiChange = this.handleCiChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);

    }
          
    handleCiChange(event) {
        const idPlayer = event.target.value;
        const filteredPlayer = this.state.initialPlayer
            .filter((player) => String(player.idplayer).includes(idPlayer));

        this.setState({
            players: filteredPlayer,
            filter: {
                ...this.state.filter,
                idplayer: idPlayer,
            }
        });     
    }   
    
    handleSurnameChange(event) {
        const surname = event.target.value;
        const filteredPlayer = this.state.initialPlayer
            .filter((player) => String(player.surname).includes(surname));

        this.setState({
            players: filteredPlayer,
            filter: {
                ...this.state.filter,
                surname: surname,
            }
        });     
    }    
    
    handleNameChange(event) {
        const name = event.target.value;
        const filteredPlayer = this.state.initialPlayer
            .filter((player) => player.name.includes(name));

        this.setState({
            players: filteredPlayer,
            filter: {
                ...this.state.filter,
                name: name,
            }
        });     
    }        

    componentDidMount() {
        fetch(`/api/middlewares/`)
            .then(res => res.json()).then((data) =>{
                console.log(data);
            this.setState({
                initialPlayer: data.listPlayers,                
                players: data.listPlayers,
                loading: false,
                error: false,
            });
        })  
            .catch((err) => {
                console.error(err);
                this.setState({
                    players: null,
                    loading: false,
                    error: true,
                });
            });
    }




    render() {

        if (this.state.loading) {

            return <div>Cargando jugadores ...</div>
        }
        console.log(this.state.players);
        const players  = this.state.players;

        return (

            <div>
                <div className="players"><p> . </p></div>
      

<div className="ui form">
  <div className="three fields">
    <div className="field">
      <label>Nombre</label>
      <input type="text" name="name" placeholder="Nombre" value={this.state.filter.name}  onChange={this.handleNameChange} />
    </div>
    <div className="field">
      <label>Apellido</label>
      <input type="text" surname="surname" placeholder="Apellido" value={this.state.filter.surname}  onChange={this.handleSurnameChange}/>
    </div>
    <div className="field">
      <label>CI</label>
      <input type="text" name="idPlayer"  placeholder="Cedula de Identidad" value={this.state.filter.idplayer}  onChange={this.handleCiChange} />
    </div>
  </div>
</div>      
<div className="players"><p> . </p></div>

                <div className="ui middle aligned selection list" className="players"/* "ui vertical list" */>


                                <ul className="itemplayer">
                                    {
                                        players.map(player => (
                                            <Player key={player.idplayer} id={player.idplayer} name={player.name} surname={player.surname} birthdate={player.birthdate} />
                                        )) 
                                    }
                                </ul>  
              

                </div>
            </div>
        );
    }
};

module.exports = Players;
