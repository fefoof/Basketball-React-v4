const React = require('react');
const {Link} = require ('react-router-dom');

class GameDetail extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            gameBD: null, 
            loading: true,
            error: null,
        }
    }
    componentDidMount() {
        fetch(`/api/game/${this.props.idgame}`)
        .then(res => res.json()).then((data) =>{
            this.setState({
                gameBD: data.gameBD, 
                loading: false,
                error: false,
            });
        }) 
        .catch((err) => {
            console.error(err);
            this.setState({
                gameBD: null, 
                loading: false,
                error: true,
            });
        });
    }
    render(){
        if (this.state.loading) {
            return (
                <div>Cargando...</div>
            )
        }

        if (this.state.error) {
            return (
                <div>Ocurrio un error al obtener el partido</div>
            )
        }
        const game  = this.state.gameBD;
        return(
            <div>
                <div>Detalle del partido</div>
                <div>
                <form class="ui form" onSubmit={this.handleSubmit}>

{/*                     <div class="field">
                        <label>CI: </label>
                    </div>                  */}             
{/*                     <div>
                        <label>Nombre:</label>
                        <label type="text" name="name" value={player.name} readonly />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <label type="text" name="surname" value={player.surname} onChange={this.handleSurnameChange}/>
                    </div>
                    <div>
                        <label>Fecha de nacimiento:</label>
                        <label type="text" name="birthdate" value={player.birthdate} onChange={this.handleBirthdateChange}/>
                    </div>   */}

                </form>
            </div>

            </div>
        )
    }
}

module.exports = GameDetail;
