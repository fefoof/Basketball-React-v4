const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        ci: '',
        user: '',
        users: '',        
        password: '',
        redirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);           
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCiChange = this.handleCiChange.bind(this);
}

handleCiChange(event) {
  this.setState({
      ci: event.target.value
  });
}    

handlePasswordChange(event) {
  this.setState({
      password: event.target.value
  });
}


 handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/users/signin`, {
      method: 'POST',
      headers : { "Content-Type" : "application/json; charset=utf-8"},
      body: JSON.stringify({
          user: this.state.ci,
          password: this.state.password                               
      })
    })
    .then(res => res.json()).then((data) =>{
      if (data){
        alert(data);
        alert(data.message);
        alert(data.status);
        if (data.message){
          alert(data.message);
        }else{
          alert("Entro con loguien ok");
          this.setState({
            redirect: true
          }); 
        }
      }else{
          alert("No hay usuario web");
      }
    }) 
    .catch((err) => {
        alert(err);
        console.error(err);

    });
  }


    render() {

      if (this.state.redirect) {
        console.log("Win Location a la home"); 
        //this.props.session.user= this.state.user; 
        //<Redirect to="/players" />  
        window.location="/players" 
      }        
      return (

            <div className="ui middle aligned center aligned grid">
            <div className="column">            
                <div  class="ui container">           
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="ui stacked segment">
                            <div className="field">
                              <div className="ui left icon input">
                                  <i className="user icon"></i>
                                  <input type="text" name="ci" placeholder="Id Usuario" value={this.state.ci} onChange={this.handleCiChange} />
                              </div>                                  
                            </div>   
                            <div className="field">
                              <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                              </div>
                            </div>                                                                                    
                            <button primary className="ui fluid large teal submit button"/* className="ui primary button" */ >
                                Login
                            </button>              
                        </div>
                    </form>
                    <div className="ui message">
                      New to us? <a href="/users/signup">Sign Up</a>
                    </div>                    
                </div>
            </div>
        </div>                
            
      );
    }
};

module.exports = Signin;
