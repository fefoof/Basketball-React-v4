const React = require('react');
const {Link} = require ('react-router-dom');
const { Redirect } = require ('react-router-dom');
const { Button } = require ('semantic-ui-react');

class NewGame extends React.Component {
    constructor(props) {
        console.log('newgame');
        super(props);
        this.state = {
            idGame: '',
            date_game: '',
            idField:  '',
            idPlayer: '',            
            idChampionship: '',
            idDate: '',               
            redirect: false,
            divisions: {iddivision:"Primera"}
        };

        this.handleIdGameChange = this.handleIdGameChange.bind(this);
        this.handleDateGameChange = this.handleDateGameChange.bind(this);
        this.handleIdFieldChange = this.handleIdFieldChange.bind(this);
        this.handleIdReportChange = this.handleIdReportChange.bind(this);
        this.handleIdChampionshipChange = this.handleIdChampionshipChange.bind(this);     
        this.handleIdDateChange = this.handleIdDateChange.bind(this);     
            

        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    handleIdGameChange(event) {
        this.setState({
            idGame: event.target.value
        });
    }    

    handleDateGameChange(event) {
        this.setState({
            date_game: event.target.value
        });
    }

    handleIdFieldChange(event) {
        this.setState({
            idField: event.target.value
        });
    }    

    handleIdReportChange(event) {
        this.setState({
            idReport: event.target.value
        });
    }     

    handleIdChampionshipChange(event) {
        this.setState({
            IdChampionship: event.target.value
        });
    }
    
    handleIdDateChange(event) {
        this.setState({
            IdDate: event.target.value
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.game);
        fetch('/api/game', {
            method: 'POST',
            headers : { "Content-Type" : "application/json; charset=utf-8"},
            body: JSON.stringify({
                idGame: this.state.idGame,    
                date_game: this.state.date_game,
                idField: this.state.idField,
                idReport: this.state.idReport,
                idChampionship: this.state.idChampionship,
                idDate: this.state.idDate                 
            })
        }).then(res => res.json()).then((data) =>{
            this.setState({
                redirect: true
            });

        }).catch((err) => {
            alert('Ocurrio un error');
        });
    }
/* 
    setDinamicOptions(selector, options) {
        var att = "data-dinamic-opt";
        $(selector).find('[' + att + ']').remove();
        var html = $(selector + ' .menu').html();
        for(key in options) {
            html += '<div class="item" data-value="' + options[key] + '" ' + att + '>' + key + '</div>';
        }
        $(selector + ' .menu').html(html);
        $(selector).dropdown();
    }     */

    render() {
        const divisions  = this.state.divisions;
        return (

    <div className="ui middle aligned center aligned grid">
        <div className="column">            
            <div>
                <h2 className="red-text">Crear un nuevo partido</h2>
               
                <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="ui stacked segment">
                    <div className="field">
                        <label>Id. Partido:</label>
                        <input type="text" name="idGame" placeholder="idGame" value={this.state.idGame} onChange={this.handleIdGameChange} />
                    </div>                    
                    <div>                    
                        <div>
                            <label>Fecha:</label>
                            <input type="text" name="date_game" value={this.state.date_game} onChange={this.handleDateGameChange} />
                        </div>
                        <div>
                            <label>Cancha:</label>
                            <input type="text" name="idField" value={this.state.idField} onChange={this.handleIdFieldChange} />
                        </div>                        
                        <div>
                            <label>Reporte:</label>
                            <input type="text" name="idReport" value={this.state.idReport} onChange={this.handleIdReportChange}/>
                        </div>                  
                        <div>
                            <label>Campeonato:</label>
                            <input type="text" name="idChampionship" value={this.state.idChampionship} onChange={this.handleIdChampionshipChange}/>
                        </div>
                        <div>
                            <label>Fecha:</label>
                            <input type="text" name="idDate" value={this.state.idDate} onChange={this.handleIdDateChange}/>
                        </div>     

                        <div class="ui compact menu">
  <div class="ui simple dropdown item">
    Dropdown
    <i class="dropdown icon" ></i>
    <div class="menu">

    <div class="item" >
    {
/*         divisions.map(division => (
            {division.iddivision}
            ))  */
    }
    </div>   

      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div>                             
         

                        <div classNameName="field">
                            <div className="ui checkbox">
                            <input type="checkbox" tabindex="0" className="hidden"/>
                            <label>I agree to the Terms and Conditions</label>
                            </div>
                        </div>

                        <button primary className="ui primary button" >
                            Save
                        </button>
                        <button className="ui button">
                            Discard
                        </button>                    
                    </div>
                </div>                    
                </form>
            </div>
        </div>
    </div>            
        );
    }
};

module.exports = NewGame;
