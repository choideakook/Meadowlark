module.exports = (req, res, next) => {
    const { cart } = req.session
    if (cart) cart.warnings = []
    next()
}