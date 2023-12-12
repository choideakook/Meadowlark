module.exports = {

    // 휴가 패키지 리스트
    getVacations: async (options = {}) => {
        const vacations = [
            {
                name: String,
                slug: String,
                category: String,
                sku: String,
                description: String,
                location: {
                    search: String,
                },
                priceInCents: Number,
                tags: [String],
                inSeason: Boolean,
                maximumGuests: Number,
                available: Boolean,
                requiresWaiver: Boolean,
                packagesSold: Number,
            }
        ]
        if (options.available !== undefined)
            return vacations.filter(({ available }) => available === options.available)
        return vacations
    },

    // 패키지 알림을 받는 사용자 이메일
    addVacationInSeasonListener: async (email, sku) => {

    }
}