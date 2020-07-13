const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const GamesPage = require('../pages/games/view');
const styles = require('../pages/games/style.scss');
import 'semantic-ui-css/semantic.min.css';

const initialState = JSON.parse(window.__STATE__);

delete window.__STATE__;

ReactDOM/ReactDOM.hydrate(
    <BrowserRouter>
        <GamesPage initialState={initialState}/>
    </BrowserRouter>,
    document.getElementById('app')
);