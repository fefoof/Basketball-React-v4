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
            if (data.message){
                alert(data.message);
            }else{
                this.setState({
                    redirect: true
                });
            }
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

    <div className="ui middle aligned center aligned grid">
        <div className="column">            
            <div class="container">            
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="ui stacked segment">
                        <div className="field">
                            <label>CI:</label>
                            <input type="text" name="ci" placeholder="Cedula de Identidad" value={this.state.ci} onChange={this.handleCiChange} />
                        </div>                                                           
                        <div className="field">
                                <label>Nombre:</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                        </div>
                        <div className="field">
                                <label>Apellido:</label>
                                <input type="text" name="surname" value={this.state.surname} onChange={this.handleSurnameChange}/>
                        </div>
                        <div className="field">
                            <label>Fecha de nacimiento:</label>
                            <input type="text" name="birthdate" value={this.state.birthdate} onChange={this.handleBirthdateChange}/>
                        </div>       
                        <div className="field">
                            <div className="ui checkbox">
                            <input type="checkbox" tabIndex="0" className="hidden"/>
                            <label>I agree to the Terms and Conditions</label>
                            </div>
                        </div>
                        <button primary className="ui fluid large teal submit button"/* className="ui primary button" */ >
                            Save
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
