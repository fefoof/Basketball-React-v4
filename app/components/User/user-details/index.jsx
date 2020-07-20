const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');

class UserDetail extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            userBD: null, 
            user: '',
            password: '',
            confirmpassword: '',
            state: '',            
            idplayer: '',
            email: '',               
            loading: true,
            error: null,
        }

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleIdplayerChange = this.handleIdplayerChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this); 

    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
            confirmpassword: event.target.value
        });
    }       

    handleIdplayerChange(event) {
        this.setState({
            idplayer: event.target.value
        });
    }     

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });        

    }


    handleBorrar(event) {
        alert("Se va a borrar el usuario");
        event.preventDefault();
        alert(this.props);
        alert("post props");
        fetch(`/api/users/${this.props.id}`, {           
            method: 'DELETE',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                user: this.state.user/* ,
                password: this.state.password,
                confirmpassword: this.state.password,
                state: "A",
                idplayer: this.state.idplayer,
                email: this.state.email    */                             
            }) 
        }).then(res => res.json()).then((data) =>{
            alert("se borro");
            this.setState({
                redirect: true
            });            
        }).catch((err) => {
            alert(err);
        });        
    }


    handleSubmit(event) {
        event.preventDefault();
        fetch(`/api/users/${this.props.id}`, {
            method: 'PUT',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                user: this.state.user,
                password: this.state.password,
                confirmpassword: this.state.password,
                state: "A",
                idplayer: this.state.idplayer,
                email: this.state.email                              
            })
        }).then(res => res.json()).then((data) =>{
            if (data.message){
                alert(data.message);
              }else{
                alert("Usuario Actualizado");
                this.setState({
                    redirect: true
                });
              }
        }).catch((err) => {
            alert(err);
        });
    }

    componentDidMount() {
        fetch(`/api/users/${this.props.id}`)
        .then(res => res.json()).then((data) =>{

            this.setState({
                userBD: data.userBD[0], 
                user: data.userBD[0].user,
                password: data.userBD[0].password,
                state: data.userBD[0].state,
                idplayer: data.userBD[0].idPlayer,
                email: data.userBD[0].email,                    
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
 
        if (this.state.redirect) {
            return (<Redirect to="/users" />)
        }         

        if (this.state.error) {
            return (
                <div>Ocurrio un error al obtener el usuario</div>
            )
        }
        const user  = this.state.userBD;
        return(
            <div>              
                <div class="ui middle aligned center aligned grid">
                <div class="column">            
                    <div>
                        <h2 className="red-text">Detalle de jugador</h2>
                                   

                 <form class="ui form" /* onSubmit={this.handleSubmit} */>
                        <div class="ui stacked segment">
                                <div class="field">
                                    <label>Usuario:</label>
                                    <input type="text" name="user" placeholder={this.state.user} value={this.state.user} readonly />
                                </div>                                    
                                <div class="field">
                                    <label>Password:</label>
                                    <input type="text" name="password" placeholder="Cambiar Contraseña" /* value={this.state.password}  */ onChange={this.handlePasswordChange} />
                                </div>
{/*                                 <div class="field">
                                    <label>Confirmar Password:</label>
                                    <input type="text" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleConfirmPasswordChange} />
                                </div>      */}                                       
                                <div class="field">
                                    <label>Jugador:</label>
                                    <input type="text" name="idplayer" placeholder={this.state.userBD.idplayer} value={this.state.idplayer} onChange={this.handleIdplayerChange}/>
                                </div>
                                <div class="field">
                                    <label>Email:</label>
                                    <input type="text" name="email" placeholder={this.state.userBD.email} value={this.state.email} onChange={this.handleEmailChange}/>
                                </div>                       
                                <div class="field">
                                    <div class="ui checkbox">
                                    <input type="checkbox" tabIndex="0" class="hidden"/>
                                    <label>I agree to the Terms and Conditions</label>
                                    </div>
                                </div>

{/*                                 <button primary className="ui fluid large teal submit button" >
                                    Save
                                </button> */}
                                <button primary class="ui primary button" onClick={this.handleSubmit}>
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




        )
    }
}

module.exports = UserDetail;
