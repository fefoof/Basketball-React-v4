const React = require('react');
const {Link} = require ('react-router-dom');

class Player extends React.Component {


  render() {
    return (

      <div className="ui segment">
        <div className="item"> 
          <div className="ui horizontal list">
            <div className="item center">
              <div className="img">            
                <img className="ui mini circular image" src="../../images/jugador.png"/>
              </div>    
            </div>
            <div className="item">
              <div className="content">
                <div className="ui header"><Link to={`/players/${this.props.id}`}> {this.props.name} {this.props.surname} </Link></div>
                  <div>
                    <div className="content">              
                      <i className="user icon"></i>              
                      {this.props.id}
                    </div>
                  </div>                    
                  <div>
                    <div className="content">
                      <i className="mail icon"></i>
                      <a href="mailto:jack@semantic-ui.com">jack@semantic-ui.com</a>
                    </div>
                  </div>
                  <div>
                    <div className="content">
                      <i className="marker icon"></i>                    
                      New York, NYY
                    </div>
                  </div>
              </div>
            </div>                 
          </div>                       
        </div>       
      </div>   
    );
  }
};

module.exports = Player;