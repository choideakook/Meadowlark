const express = require('express');
const app = express();
const port =  3000;


app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel');
})

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel');
})

app.get('/about/content', (req, res) => {
    res.type('text/plain')
    res.send("About Meadowlark Travel's contents");
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404);
    res.send('404 - Not Found');
})

app.use((err, res, req, next) => {
    console.error(err.message)
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};`,
    `\npress Ctrl-C to terminate.`
))