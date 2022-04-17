process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./index')
let listofItems = require('./fakeDB');
const res = require('express/lib/response');


describe('GET /list', () => {
    test('Get all items in shopping list', async () => {
        const response = await request(app).get('/list')
    
        expect(response.status).toBe(200)
        expect(response.body).toEqual([{"name":"popsicle","price":1.45},{"name":"cheerios","price":3.4}])
    })
})

describe('GET /:name', () => {
    test('Get single item from shopping list', async () => {
        const response = await request(app).get('/list/cheerios')

        expect(response.status).toBe(200)
        expect(response.body).toEqual({"name":"cheerios","price":3.4})
    })
})

describe('GET /:name', () => {
    test('Get non existing items', async () => {
        const response1 = await request(app).get('/list/bacon')
    
        expect(response1.status).toBe(404)
        expect(response1.body).toEqual({message: 'item does not exist'})
    })
})

describe('POST /list', () => {
    test('Add new item to list', async () => {
        const response = await request(app)
            .post('/list')
            .send({
                name: 'flakes',
                price: 2.50
            });
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual({added: {name: 'flakes', price:2.50}})
    })
})


describe('PATCh /list', () => {
    test('Update item in list', async () => {
        const response = await request(app)
            .patch('/list?name=cheerios')
            .send({ name: 'milk', price: 1.35 })
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ updated: { name: 'milk', price: 1.35 } })
    })
});

describe('PATCh /list', () => {
    test('Update non existing item in list', async () => {
        const response = await request(app)
            .patch('/list?name=cheeriossss')
            .send({ name: 'milk', price: 1.35 })
        
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'item does not exist' })
    })
});


describe('DELETE /list', () => {
    test('delete item from list', async () => {
        const response = await request(app).delete('/list/cheerios')
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'DELETED' })
    })
})











