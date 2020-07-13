const React = require('react');
const {Link} = require ('react-router-dom');
const { Button } = require ('semantic-ui-react');

class Signin extends React.Component {
  constructor(props) {
    console.log('signin');
    super(props);
    this.state = {
        user: '',
        users: '',        
        password: '',
        redirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);     
    this.handleLogin = this.handleLogin.bind(this);        
}




  componentDidMount() {
/*     fetch(`/api/users/`)
        .then(res => res.json()).then((data) =>{
            console.log(data.listUsers);
        this.setState({
            users: data.listUsers,
            loading: false,
            error: false,
        });
    })
        .catch((err) => {
            console.error(err);
            this.setState({
                users: null,
                loading: false,
                error: true,
            });
        }); */
  }

  handleLogin(event) {
    return <Redirect to="/players" />
  }

  handleSubmit(event) {
    alert("hola");
    event.preventDefault();
    console.log(this.state.ci);
    fetch('/api/users'/* , {
        method: 'POST',
        headers : { "Content-Type" : "application/json; charset=utf-8"},
        body: JSON.stringify({
          user: this.state.user,
          password: this.state.password,                              
        })
    } */).then(res => res.json()).then((data) =>{
      alert("hola2");
        this.setState({
            users: data.listUsers,
            redirect: true
        });

    }).catch((err) => {
        alert('Ocurrio un error');
    });
}

    render() {
      console.log("hola3");
      if (this.state.redirect) {
        console.log("hola4"); 
          this.props.session.user= this.state.user; 
          /* return <Redirect to="/players" /> */
          window.location="/players"
      }       
      return (
<div className="ui middle aligned center aligned grid">
  <div className="column">
    <h2 className="ui teal image header">
      <div className="content">
        Log-in to your account
      </div>
    </h2>
    <form className="ui large form" onSubmit={this.handleSubmit}>
      <div className="ui stacked segment">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input type="text" name="user" placeholder="Id Usuario"/>
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input type="password" name="password" placeholder="Password"/>
          </div>
        </div>
        <div className="ui fluid large teal submit button">Login</div>
{/*         <button primary className="ui fluid large teal submit button" >
            Login
        </button>    */} 
      </div>

      <div className="ui error message"></div>

    </form>

    <div className="ui message">
      New to us? <a href="/autentication/signup">Sign Up</a>
    </div>
  </div>
</div>

      );
    }
};

module.exports = Signin;
