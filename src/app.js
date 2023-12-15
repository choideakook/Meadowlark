const express = require('express');
const app = express();

const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const handlers = require('./lib/handlers');
const { start } = require('./lib/fg')
const credentials = require('../.credentails/development.json')
const { logging } = require('./lib/logging')
const flashMiddleware = require('./lib/middleware/flash')
const weatherMiddleware = require('./lib/middleware/weather')
const { routes } = require('./routes/routes')
require('./lib/mongodb/mdb')


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


//-- static --//
app.use(express.static(__dirname + '/public'))


//-- application setting --//
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//-- lib middle wear --//
app.use(weatherMiddleware);
app.use(flashMiddleware);
logging(app);

app.use(routes)



//-- application start --//
function startServer(port) {
    app.listen(port, () => {
        start('EXPRESS  START')
        console.log(
            `Express ${app.get('env')} mode started on http://localhost:${port};`,
            `\npress Ctrl-C to terminate.`
        )
    })
}

if(require.main === module) {
    startServer(process.env.PORT || 3000)
} else {
    module.exports = startServer
}
