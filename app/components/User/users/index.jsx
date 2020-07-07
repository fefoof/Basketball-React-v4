const React = require('react');
const User = require('../user');
const {Link} = require ('react-router-dom');

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        fetch(`/api/users/`)
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
            });
    }
          
    


    render() {

        if (this.state.loading) {

            return <div>Cargando jugadores ...</div>
        }
        console.log(this.state.users);
        const users  = this.state.users;

        return (

            <div>
                <div className="users"><p> . </p></div>

                {/* <Link to={`/users/new`}>Crear nuevo jugador</Link>   */}              
                <div class="ui middle aligned selection list" className="users"/* "ui vertical list" */>


                                <ul className="users" >
                                    {
                                        users.map(user => (
                                            <User key={user.user} iduser={user.user} idplayer={user.idPlayer} email={user.email} state={user.state} />
                                        )) 
                                    }
                                </ul>  
              

                </div>
            </div>
        );
    }
};

module.exports = Users;
