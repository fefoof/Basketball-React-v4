const React = require('react');
const {Link} = require ('react-router-dom');

class Signin extends React.Component {
    render() {
      return (
        
        <div class="ui middle aligned center aligned grid">
            <h1>Login de usuario</h1>
{/*             <% if (message) { %>
                    <p><%= message %></p>
                  <% } %>  */}
          <form class="ui form"  >
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
