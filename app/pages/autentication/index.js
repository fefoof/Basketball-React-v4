const router = require('express').Router();
const React = require('react');
const {StaticRouter} = require('react-router-dom');
const {renderToString} = require('react-dom/server');
const User = require('../../../models/user');
const View = require('./view');

// https://www.digitalocean.com/community/tutorials/react-react-router-ssr

router.get('/*', (req, res, next) => {
    const initialState = {
            currentUser: 'jjrosales',
    };
    const context = {};
    console.log('index Autentication');

    const content = renderToString(
        <StaticRouter location={req.url} context={context}>
            <View initialState={initialState}/>
        </StaticRouter>
    );

    res.render('template', {
        pageName: 'autentication',
        pageTitle: 'Autentication',
        host: 'http://localhost:3000',
        initialState,
        content
    });
});

module.exports = router;
