const React = require('react');
const {Link} = require ('react-router-dom');

class Game extends React.Component {
  render() {
    return (

      <div class="ui segment">
        <div class="item">
          <div class="ui horizontal list">
            <div class="item center">
              <img class="ui mini circular image" src="../../images/cancha.png"/>
            </div>
            <div class="item">
              <div class="content">
                <div class="ui header"><Link to={`/game/${this.props.idgame}`}> {this.props.idfield} {this.props.date_game} </Link></div>
                  <div>
                    <div class="content">              
                      <i class="game icon"></i>              
                      Local: {this.props.teamL}
                    </div>
                  </div>    
                  <div>
                    <div class="content">              
                      <i class="game icon"></i>              
                      Visitante: {this.props.teamV}
                    </div>
                  </div>                                     
                  <div>
                    <div class="content">
                      <i class="mail icon"></i>
                      Championship: {this.props.idchampionship}
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
        </div>       
      </div>   
    );
  }
};

module.exports = Game;