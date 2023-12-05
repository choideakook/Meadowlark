const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port =  3000;
const { start } = require('./lib/fg')

const handlers = require('./lib/handlers');

//-- view setting --//
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}));
app.set('view engine', '.hbs');

//-- public --//
app.use(express.static(__dirname + '/public'))


//-- API --//
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/headers', handlers.header)

app.use(handlers.notFound)
app.use(handlers.serverError)

if(require.main === module) {
    app.listen(port, () => {
        start('EXPRESS  START')
        console.log(
            `Express started on http://localhost:${port};`,
            `\npress Ctrl-C to terminate.`
        )
    })
} else {
    module.exports = app
}