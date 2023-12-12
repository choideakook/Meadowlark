const mongoose = require('mongoose')
const { connectionString } = require('../../../.credentails/development.json')

if (!connectionString) {
    console.error('MongoDB connection string missing!')
    process.exit(1)
}

mongoose.connect(connectionString)

const db = mongoose.connection

db.on('error', err => {
    console.error('MongoDB error :', err.message)
    process.exit(1)
})

db.once('open', () => console.log('MongoDB connection established'))

module.exports = {
    getVacations: async () => {

    },
    addVacationInSeasonListener: async (email, sku) => {

    },
}