const React = require('react');
const {Link} = require ('react-router-dom');

class User extends React.Component {
  render() {
    return (

      <div class="ui segment">
        <div class="item">
          <div class="ui horizontal list">
            <div class="item center">
              <img class="ui mini circular image" src="../../images/jugador.png"/>
            </div>
            <div class="item">
              <div class="content">
                <div class="ui header"><Link to={`/users/detail/${this.props.iduser}`}> {this.props.iduser} {this.props.state} </Link></div>
                  <div>
                    <div class="content">              
                      <i class="user icon"></i>              
                      {this.props.idplayer}
                    </div>
                  </div>                    
                  <div>
                    <div class="content">
                      <i class="mail icon"></i>
                      <a href={`mailto:${this.props.email}`}>{this.props.email} </a>
                    </div>
                  </div>
                  <div>
                    <div class="content">
                      <i class="marker icon"></i>                    
                      New York, NY
                    </div>
                  </div>
              </div>
            </div>            
          </div>          
            {/*     <li>
                      <h2>CI:{this.props.id} : {this.props.name} </h2>
                      <Link to={`/players/${this.props.id}`}>Ir a la jugador</Link>
                              <img class="ui tiny circular image" src="../../images/jugador.png"/>      
                      <p>hola</p>
                    </li> */}
        </div>       
      </div>   
    );
  }
};

module.exports = User;