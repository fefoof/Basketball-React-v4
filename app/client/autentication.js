const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const AutenticationPage = require('../pages/autentication/view');
const styles = require('../pages/autentication/style.scss');
import 'semantic-ui-css/semantic.min.css'; 


const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <AutenticationPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);