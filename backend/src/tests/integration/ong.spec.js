const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection')

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const resp = await request(app).post('/ong').send({
            name: "Test ONG",
            email: "email2@email2.com",
            whatsapp: "123456789",
            city: "Porto",
            uf: "PT"
        });

        expect(resp.body).toHaveProperty('id');
        expect(resp.body.id).toHaveLength(8);

    })
})