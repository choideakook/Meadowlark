const portfinder = require('portfinder')
const puppeteer = require('puppeteer')

const app = require('../app')

let server = null
let port = null

beforeEach(async () => {
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

test('통합: 홈페이지 링크 작동', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await Promise.all([
        page.waitForNavigation(),
        page.click('[data-test-id="about"]'),
    ])
    expect(page.url()).toBe(`http://localhost${port}/about`)
    await browser.close();
})