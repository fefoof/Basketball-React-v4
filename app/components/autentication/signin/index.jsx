const React = require('react');
const {Link} = require ('react-router-dom');

class Signin extends React.Component {


  constructor(props) {
    console.log('signin');
    super(props);
    this.state = {
        user: '',
        password: '',
        redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);        
}


  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.ci);
    fetch('/api/middlewares', {
        method: 'POST',
        headers : { "Content-Type" : "application/json; charset=utf-8"},
        body: JSON.stringify({
          user: this.state.user,
          password: this.state.password,                              
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
      return (
        
        <div class="ui middle aligned center aligned grid">
            <h1>Login de usuario</h1>
{/*             <% if (message) { %>
                    <p><%= message %></p>
                  <% } %>  */}
          <form class="ui form"  onSubmit={this.handleSubmit}>
              <div>
                  <input name="user" placeholder="Usuario" type="text" required/>
              </div>
              <div>
                  <input name="password" placeholder="Contraseña" type="password" required></input>
              </div>
              <div>
                  <input type="submit" value="Enviar"/>
              </div>
          </form>           

        </div>   


      );
    }
};

module.exports = Signin;
