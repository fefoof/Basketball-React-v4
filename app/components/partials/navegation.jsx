const React = require('react');
const {Link} = require ('react-router-dom');

class Navigation extends React.Component {
  render() {
    return (

      <div className="ui segment">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#"><%=pageTitle%></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="/players"><i class="fas fa-basketball-ball"></i> Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            {/* <!-- <a class="nav-link" href="/#about"><i class="fas fa-about"></i> About</a> --> */}
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-address-book"></i> Player</a>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="/players/new">New</a>
                              <a class="dropdown-item" href="/players">Find</a>
                              <a class="dropdown-item" href="#">Something else here</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" href="/players">All Players</a>
                            </div>                    
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fas fa-address-book"></i> User</a>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="/users/new">New</a>
                              <a class="dropdown-item" href="/users">Find</a>
                              <a class="dropdown-item" href="#">Something else here</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" href="/users">All Users</a>
                            </div>                    
                        </li>                
                        <li class="nav-item">
                            <a class="nav-link" href="/users/signin"><i class="fas fa-address-book"></i> Login</a>
                        </li>                
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true"> Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>    
      </div>   
    );
  }
};

module.exports = Navigation;