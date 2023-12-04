const handlers = require('../handlers')

test('Unit: 홈페이지 렌더링', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('home')
})

test('Unit: 소개페이지 랜더링', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.about(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
})

test('Unit: 404 오류', () => {
    const req = {}
    const res = {render: jest.fn()}
    handlers.notFound(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

test('Unit: 500 오류', () => {
    const err = new Error('some error')
    const req = {}
    const res = {render: jest.fn()};
    const next = jest.fn()
    handlers.serverError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})