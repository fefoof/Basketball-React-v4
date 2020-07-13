const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
 const { Button } = require ('semantic-ui-react'); 

class Signup extends React.Component {
    constructor(props) {
        console.log('newplayer');
        super(props);
        this.state = {
            user: '',
            password: '',
            state: '',
            idplayer: '',
            email: '',
            redirect: false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleIdPlayerChange = this.handleIdPlayerChange.bind(this); 
        this.handleEmailChange = this.handleEmailChange.bind(this); 

        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    handleUserChange(event) {
        this.setState({
            user: event.target.value
        });
    }    

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleIdPlayerChange(event) {
        this.setState({
            idplayer: event.target.value
        });
    }     

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleSubmit(event) {
        alert('submit signup');
        event.preventDefault();
        console.log(this.state.ci);
        fetch('/api/users', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                user: this.state.user,
                state: 'A',                
                idplayer: this.state.idplayer,
                email: this.state.email   
            })
        }).then(res => res.json()).then((data) =>{
            alert('oksubmit');
            this.setState({
                redirect: true
            });

        }).catch((err) => {
            alert('Ocurrio un error');
        });
    }

    render() {
        if (this.state.redirect) {
/*             this.props.session.user= this.state.user; */
            return <Redirect to="/autentication/signin" />
        } 
        return (

        <div class="ui middle aligned center aligned grid">
            <div class="column">            
                <div>
                <h2 class="red-text">Crear un nuevo usuario</h2>
               
                <form class="ui form" onSubmit={this.handleSubmit}>
                <div class="ui stacked segment">
                    <div class="field">
                        <label>Usuario:</label>
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="text" name="user" placeholder="Cedula de Identidad" value={this.state.user} onChange={this.handleUserChange} />
                        </div>
                    </div>                                        
                    <div class="field">                   
                        <label>Contraseña:</label>
                        <div class="ui left icon input">                        
                            <i class="lock icon"></i>
                            <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                    </div>                        
                    <div class="field">                        
                        <label>CI Jugador:</label>
                        <div class="ui left icon input"> 
                            <i class="dribbble icon"></i>
                            <input type="text" name="idplayer" value={this.state.idplayer} onChange={this.handleIdPlayerChange}/>
                        </div>
                    </div>
                    <div class="field">                     
                        <div>
                            <label>Email:</label>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
                        </div>       
                    </div>                      
                    <div class="field">
                        <div class="ui checkbox">
                        <input type="checkbox" tabIndex="0" class="hidden"/>
                        <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    {/* <div className="ui fluid small teal submit button">Save</div> */}
                    <button  class="ui primary button" >
                        Save
                    </button>
                    <button class="ui button">
                        Discard
                </button>                      
                </div>
                </form>              
            </div>
        </div>
    </div>            
        );
    }
};

module.exports = Signup;
