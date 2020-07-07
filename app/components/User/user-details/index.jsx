const React = require('react');
const {Link} = require ('react-router-dom');

class UserDetail extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            playerBD: null, 
            loading: true,
            error: null,
        }
    }
    componentDidMount() {
        fetch(`/api/user/${this.props.id}`)
        .then(res => res.json()).then((data) =>{

            this.setState({
                userBD: data.userBD, 
                loading: false,
                error: false,
            });
        }) 
        .catch((err) => {
            console.error(err);
            this.setState({
                userBD: null, 
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
                <div>Ocurrio un error al obtener el usuario</div>
            )
        }
        const user  = this.state.userBD;
        return(
            <div>
                {/* <Link to={`/players`}>Ir al listado</Link> */}
                <div>Detalle del usuario</div>
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

module.exports = UserDetail;
