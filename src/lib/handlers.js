exports.home = (req, res) => res.render('home');

exports.about = (req, res) => res.render('about')

exports.notFound = (req, res) => res.render('404');

exports.serverError = (ERR, req, res, NEXT) => res.render('500');