const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port =  3000;

//-- view setting --//
app.engine('handlebars', engine({
    defaultLayout: 'main',
}));
app.set("view engine", "handlebars");


//-- API --//
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/about/content', (req, res) => {
    res.send("About Meadowlark Travel's contents");
})

app.use((req, res) => {
    res.status(404)
        .render('404');
})

app.use((err, res, req, next) => {
    console.error(err.message)
    res.status(500)
        .render('500')
});

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};`,
    `\npress Ctrl-C to terminate.`
))