const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
const Player = require('../player');

class PlayerDetail extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            playerBD: null, 
            ci: '',
            name: '',
            surname: '',
            birthdate: '',            
            loading: true,
            redirect:false,
            error: null,
        }

        this.handleCiChange = this.handleCiChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this);         
        this.handleBorrar = this.handleBorrar.bind(this);         

        this.handleSubmit = this.handleSubmit.bind(this);       

    }
    componentDidMount() {
        fetch(`/api/middlewares/${this.props.id}`)
        .then(res => res.json()).then((data) =>{

            this.setState({
                playerBD: data.playerBD[0],  
                ci: data.playerBD[0].idplayer,
                name: data.playerBD[0].name,
                surname: data.playerBD[0].surname,
                birthdate: data.playerBD[0].birthdate,                 
                loading: false,
                redirect:false,
                error: false,
            });
        }) 
        .catch((err) => {
            console.error(err);
            this.setState({
                playerBD: null, 
                loading: false,
                error: true,
            });
        });
    }


    handleCiChange(event) {
        this.setState({
            ci: event.target.value
        });
    } 

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleSurnameChange(event) {
        this.setState({
            surname: event.target.value
        });
    }     

    handleBirthdateChange(event) {
        this.setState({
            birthdate: event.target.value
        });        

    }

    handleBorrar(event) {
        alert("Se va a borrar el jugador y usuario");
        event.preventDefault();
        console.log(this.state.ci);
        fetch(`/api/middlewares/${this.props.id}`, {
            method: 'DELETE',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                idPlayer: this.state.ci,
                name: this.state.name,
                surname: this.state.surname,
                birthdate: this.state.birthdate                                
            })
        }).then(res => res.json()).then((data) =>{

            this.setState({
                redirect: true
            });

        }).catch((err) => {
            alert(err);
        });        
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.ci);
        fetch(`/api/middlewares/${this.props.id}`, {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                idPlayer: this.state.ci,
                name: this.state.name,
                surname: this.state.surname,
                birthdate: this.state.birthdate                                
            })
        }).then(res => res.json()).then((data) =>{

            this.setState({
                redirect: true
            });

        }).catch((err) => {
            alert(err);
        });
    }


    render(){
        if (this.state.loading) {
            return (
                <div>Cargando...</div>
            )
        }
 
        if (this.state.redirect) {
            return (<Redirect to="/players" />)
        }         

        if (this.state.error) {
            return (
                <div>Ocurrio un error al obtener el jugador</div>
            )
        }
        let player  = this.state.playerBD;

        return(
            <div>                
                <div>
{/*                         {
                        player.map(player => ( */}
                            <div>


<div class="ui middle aligned center aligned grid">
        <div class="column">            
            <div>
                <h2 className="red-text">Detalle de jugador</h2>
               
                <form class="ui form" onSubmit={this.handleSubmit}>
                <div class="ui stacked segment">

                    <div class="field">
                        <label>CI:</label>
                        <input type="text" name="ci" placeholder={this.state.playerBD.idplayer} /* value={this.state.ci}  */ readonly />
                    </div>  
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="name" placeholder={this.state.playerBD.name} value={this.state.name} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        <label>Apellido:</label>
                        <input type="text" name="surname" placeholder={this.state.playerBD.surname} value={this.state.surname} onChange={this.handleSurnameChange}/>
                    </div>  
                    <div>
                        <label>Fecha de nacimiento:</label>
                        <input type="text" name="birthdate" placeholder={this.state.playerBD.birthdate} value={this.state.birthdate} onChange={this.handleBirthdateChange}/>
                    </div>                                       
                                  
{/*                     <div class="two fields">                    
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={player.name} onChange={this.handleNameChange} />
                        </div>
                        <div>
                            <label>Apellido:</label>
                            <input type="text" name="surname" value={player.surname} onChange={this.handleSurnameChange}/>
                        </div>
                    </div>
                    <div>
                        <label>Fecha de nacimiento:</label>
                        <input type="text" name="birthdate" value={player.birthdate} onChange={this.handleBirthdateChange}/>
                    </div>       */} 

                    <button primary class="ui primary button" >
                        Salvar
                    </button>
                    <button class="ui button" onClick={this.handleBorrar}>
                        Borrar
                    </button>            
                </div>
                </form>
 
            </div>
        </div>
    </div> 


                            </div> 

                            
                        {/*  ) )                                        
                        }     */} 
                </div>
            </div>
        )
    }
}

module.exports = PlayerDetail;
