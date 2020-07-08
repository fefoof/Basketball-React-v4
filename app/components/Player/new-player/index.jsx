const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
const { Button } = require ('semantic-ui-react');

class NewPlayer extends React.Component {
    constructor(props) {
        console.log('newplayer');
        super(props);
        this.state = {
            ci: '',
            name: '',
            surname: '',
            birthdate: '',
            redirect: false
        };

        this.handleCiChange = this.handleCiChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handleBirthdateChange = this.handleBirthdateChange.bind(this); 

        this.handleSubmit = this.handleSubmit.bind(this);        
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

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.ci);
        fetch('/api/middlewares', {
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
            alert('Ocurrio un error');
        });
    }

    render() {
        if (this.state.redirect) {
            this.props.id = this.state.ci;
            return <Redirect to="/players" />
        } 
        return (

    <div class="ui middle aligned center aligned grid">
        <div class="column">            
            <div>
                <h2 class="red-text">Crear un nuevo jugador</h2>
               
                <form class="ui form" onSubmit={this.handleSubmit}>
                <div class="ui stacked segment">
                    <div class="field">
                        <label>CI:</label>
                        <input type="text" name="ci" placeholder="Cedula de Identidad" value={this.state.ci} onChange={this.handleCiChange} />
                    </div>                                        
                    <div class="two fields">                    
                        <div>
                            <label>Nombre:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                        </div>
                        <div>
                            <label>Apellido:</label>
                            <input type="text" name="surname" value={this.state.surname} onChange={this.handleSurnameChange}/>
                        </div>
                    </div>
                    <div>
                        <label>Fecha de nacimiento:</label>
                        <input type="text" name="birthdate" value={this.state.birthdate} onChange={this.handleBirthdateChange}/>
                    </div>       


           

               
                    <div class="field">
                        <div class="ui checkbox">
                        <input type="checkbox" tabindex="0" class="hidden"/>
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

module.exports = NewPlayer;
