import { assert } from 'chai'

import request from 'supertest'
import app from '../app.js'

describe("Items integration test (with database)", () => {
    it("should get items from the db from GET /items", async() => {
        const res = await request(app).get('/items')    
        assert.equal(res.statusCode, 200)
        assert.equal(res.type, "application/json")
        assert.isArray(res.body)
        assert.include(res.body[0], {name: "Orange", price: 1.5}) // brittle test
    })
})
