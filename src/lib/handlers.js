exports.home = (req, res) => res.render('home');

exports.about = (req, res) => res.render('about')

exports.header = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}:${value}`)
    res.send(headers.join('\n'))
}

exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', {csrf: 'token here'})
}

exports.newsletterSignupProcess = (req, res) => {
    console.log('Form (from query) :', req.query.form)
    console.log('CSRF (from hidden form field) :', req.body._csrf)
    console.log('Name :', req.body.name)
    console.log('Email :', req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}

exports.sectionTest = (req, res) => res.render('section-test')

exports.notFound = (req, res) => res.render('404');

/* eslint-disable no-unused-vars */
exports.serverError = (ERR, req, res, next) => res.render('500');
/* eslint-disable no-unused-vars */