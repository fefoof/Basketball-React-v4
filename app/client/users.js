const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const UsersPage = require('../pages/users/view');
const styles = require('../pages/users/style.scss');
import 'semantic-ui-css/semantic.min.css'; 

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <UsersPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);