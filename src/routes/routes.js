const handlers = require("../lib/handlers");
const express = require('express')
const multiparty = require("multiparty");
const router = express.Router();

router.get('/', handlers.home)
router.get('/about', handlers.about)
router.get('/headers', handlers.header)
router.get('/section', handlers.sectionTest)

router.get('/newsletter-signup', handlers.newsletterSignup)
router.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
router.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)
router.get('/newsletter-archive', handlers.archive)

router.get('/newsletter', handlers.newsletter)
router.post('/api/newsletter-signup', handlers.api.newsletterSignup)

router.get('/vacation', handlers.vacation)
router.post('/api/vacation', (res, req) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(500).send({ error: err.message })
        handlers.api.vacationProcess(req, res, fields, files)
    })
})


router.get('/vacations', handlers.listVacations2)
router.get('/notify-me-when-in-season', handlers.notifyWhenInSeasonForm)
router.post('/notify-me-when-in-season', handlers.notifyWhenInSeasonProcess)

router.get('/set-currency/:currency', handlers.setCurrency)


//-- fallback handler --//
router.use(handlers.notFound)
router.use(handlers.serverError)

module.exports = { routes: router }