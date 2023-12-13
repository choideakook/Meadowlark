const {render} = require("express/lib/application");
const cluster = require('cluster')
const db = require('./mongodb/mdb')

class NewsletterSignup {
    constructor({ name, email }) {
        this.name = name
        this.email = email
    }
    async save() {
        // db 에 저장하는 코드
        return null;
    }
}


exports.home = (req, res) => {
    if (cluster.isWorker)
        console.log(`Worker ${cluster.worker.id} 가 실행중`)
    res.render('home');
}
exports.about = (req, res) => {
    res.render('about')
}

exports.sectionTest = (req, res) => res.render('section-test')

exports.header = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}:${value}`)
    res.send(headers.join('\n'))
}


//-- post 방식 --//
exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', {csrf: 'token here'})
}

var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

exports.newsletterSignupProcess = (req, res) => {
    const
        name = req.body.name || '',
        email = req.body.email || ''

    if(!VALID_EMAIL_REGEX.test(email)) {
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address tou entered was not valid.',
        }
        return res.redirect(303, '/newsletter-signup')
    }
    new NewsletterSignup({ name, email }).save()
        .then(() => {
            req.session.flash = {
                type: 'success',
                intro: 'Thank you!',
                message: 'You have now been signed up for the newsletter.'
            }
            return res.redirect(303, '/newsletter-archive')
        })
        .catch(err => {
            req.session.flash = {
                type: 'danger',
                intro: 'Database error!',
                message: 'There were a database error; please try again later.'
            }
            return res.redirect('303', '/newsletter-archive');
        })
}

exports.archive = (req, res) => {
    res.render('newsletter-archive')
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you', )
}

//-- fetch 방식 --//
exports.newsletter = (req, res) => {
    res.render('newsletter', { CSRF: 'token here' })
}

exports.api = {
    newsletterSignup : (req, res) => {
        console.log('Form (from query) :', req.query.form)
        console.log('CSRF (from hidden form field) :', req.body._csrf)
        console.log('Name :', req.body.name)
        console.log('Email :', req.body.email)
        res.send({ result: 'success' })
    },

    vacationProcess : (req, res, fields, files) => {
        console.log('field data :', fields)
        console.log('files :', files)
        res.send({ result: 'success' })
    }
}

//-- 파일 업로드 --//
exports.vacation = (req, res) => {
    res.render('contest/vacation')
}

//-- db 조회 --//
exports.listVacations = async (req, res) => {
    const vacations = await db.getVacations({ available: true })
    const context = {
        vacations: vacations.map(vacation => ({
            sku: vacation.sku,
            name: vacation.name,
            description: vacation.descripation,
            price: '$' + (vacation.priceInCents / 100).toFixed(2),
            inSeason: vacation.inSeason,
        }))
    }
    res.render('vacations', context);
}


//-- error --//
exports.notFound = (req, res) => res.render('404');
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    console.error('err : ', err)
    res.render('500', {err: err});
}
/* eslint-disable no-unused-vars */