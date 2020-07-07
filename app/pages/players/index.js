const router = require('express').Router();
const React = require('react');
const {StaticRouter} = require('react-router-dom');
const {renderToString} = require('react-dom/server');
const Player = require('../../../models/player');
const View = require('./view');

// https://www.digitalocean.com/community/tutorials/react-react-router-ssr

router.get('/*', (req, res, next) => {
    const initialState = {};
    const context = {};
    console.log('index');

    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <View initialState={initialState}/>
        </StaticRouter>
    );

    res.render('template', {
        pageName: 'players',
        pageTitle: 'Players',
        host: 'http://localhost:3000',
        initialState,
        content
    });
});

module.exports = router;
