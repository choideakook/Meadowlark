const express = require('express');
const app = express();
const port =  3000;

const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const handlers = require('./lib/handlers');
const { start } = require('./lib/fg')
const credentials = require('../.credentails/development.json')
const { logging } = require('./lib/logging')
const flashMiddleware = require('./lib/middleware/flash')
const weatherMiddleware = require('./lib/middleware/weather')


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


//-- rout handler --//
app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/headers', handlers.header)
app.get('/section', handlers.sectionTest)

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)
app.get('/newsletter-archive', handlers.archive)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/vacation', handlers.vacation)
app.post('/api/vacation', (res, req) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(500).send({ error: err.message })
        handlers.api.vacationProcess(req, res, fields, files)
    })
})

app.get('/fail', handlers.fail)


//-- fallback handler --//
app.use(handlers.notFound)
app.use(handlers.serverError)


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
