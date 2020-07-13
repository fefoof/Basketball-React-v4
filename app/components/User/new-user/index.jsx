const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
const { Button } = require ('semantic-ui-react');

class NewUser extends React.Component {
    constructor(props) {
        console.log('newuser');
        super(props);
        this.state = {
            user: '',
            password: '',
            confirmpassword: '',
            state: '',            
            idplayer: '',
            email: '',                    
            redirect: false
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleIdplayerChange = this.handleIdplayerChange.bind(this); 
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

    handleConfirmPasswordChange(event) {
        this.setState({
            confirmpassword: event.target.value
        });
    }    

    handleStateChange(event) {
        this.setState({
            state: event.target.value
        });
    }     

    handleIdplayerChange(event) {
        this.setState({
            state: event.target.value
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

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.user);
        fetch('/api/user', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                user: this.state.user,
                password: this.state.password,
                confirmpassword: this.state.confirmpassword,
                state: "A",
                idPlayer: this.state.idplayer,
                email: this.state.email                
            })
        }).then(res => res.json()).then((data) =>{

            this.setState({
                redirect: true
            });

        }).catch((err) => {
            alert('Ocurrio un Error');
        });
    }

    render() {

        return (

    <div class="ui middle aligned center aligned grid">
        <div class="column">            
            <div>
                <h2 className="red-text">Crear un nuevo jugador</h2>
               
                <form class="ui form" onSubmit={this.handleSubmit}>
                <div class="ui stacked segment">
                    <div class="field">
                        <label>Usuario:</label>
                        <input type="text" name="user" placeholder="Usuario" value={this.state.user} onChange={this.handleUserChange} />
                    </div>                    
                    <div class="two fields">                    
                        <div>
                            <label>Password:</label>
                            <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                        <div>
                            <label>Confirmar Password:</label>
                            <input type="text" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleConfirmPasswordChange} />
                        </div>                        
                        <div>
                            <label>Jugador:</label>
                            <input type="text" name="idplayer" value={this.state.idplayer} onChange={this.handleIdplayerChange}/>
                        </div>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </div>  
                     
                    <div class="field">
                        <div class="ui checkbox">
                        <input type="checkbox" tabIndex="0" class="hidden"/>
                        <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>

                    <button primary class="ui primary button" >
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

module.exports = NewUser;
