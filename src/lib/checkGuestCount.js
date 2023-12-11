module.exports = (req, res, next) => {
    const { cart } = req.session
    if(!cart) return next()
    if(cart.items.some(item => item.guest > item.product.maxGuests)) {
        cart.warnings.push('One or more of your selected tours')
    }
    next()
}