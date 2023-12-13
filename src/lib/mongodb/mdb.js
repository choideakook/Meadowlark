const mongoose = require('mongoose')
const { connectionString } = require('../../../.credentails/development.json')
const Vacation = require('../../models/vacation')
const VacationInSeasonListener = require('../../models/vacationInSeasonListener')

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


Vacation.find().exec().then(vacations => {
    if (vacations.length) return;

    new Vacation({
        name: 'Hood River Day Trip',
        slug: 'hood-river-day-trip',
        category: 'Day Trip',
        sku: 'HR199',
        description: 'Spend a day sailing on the Columbia and ' +
            'enjoying craft beers in Hood River!',
        priceInCents: 9995,
        tags: ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
        inSeason: true,
        maximumGuests: 16,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Oregon Coast Getaway',
        slug: 'oregon-coast-getaway',
        category: 'Weekend Getaway',
        sku: 'OC39',
        description: 'Enjoy the ocean air and quaint coastal towns!',
        priceInCents: 269995,
        tags: ['weekend getaway', 'oregon coast', 'beachcombing'],
        inSeason: false,
        maximumGuests: 8,
        available: true,
        packagesSold: 0,
    }).save();

    new Vacation({
        name: 'Rock Climbing in Bend',
        slug: 'rock-climbing-in-bend',
        category: 'Adventure',
        sku: 'B99',
        description: 'Experience the thrill of rock climbing in the high desert.',
        priceInCents: 289995,
        tags: ['weekend getaway', 'bend', 'high desert', 'rock climbing', 'hiking', 'skiing'],
        inSeason: true,
        requiresWaiver: true,
        maximumGuests: 4,
        available: false,
        packagesSold: 0,
        notes: 'The tour guide is currently recovering from a skiing accident.',
    }).save();
}).catch(err => console.error(err))


// 더미 데이터 입력기
module.exports = {

    // 휴가 패키지 리스트
    getVacations: async (options = {}) => Vacation.find(options),

    // 패키지 알림을 받는 사용자 이메일
    addVacationInSeasonListener: async (email, sku) => {
        await VacationInSeasonListener.updateOne(
            {email},
            {$push: {skus: sku}},
            {upsert: true}
        )
    }
}