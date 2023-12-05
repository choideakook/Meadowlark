exports.home = (req, res) => res.render('home');

exports.about = (req, res) => res.render('about')

exports.header = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}:${value}`)
    res.send(headers.join('\n'))
}

exports.notFound = (req, res) => res.render('404');

/* eslint-disable no-unused-vars */
exports.serverError = (ERR, req, res, next) => res.render('500');
/* eslint-disable no-unused-vars */