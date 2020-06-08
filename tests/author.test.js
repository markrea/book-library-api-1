const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe ('/authors', () => {
    before(async () => {   
         await Author.sequelize.sync();    
         await Author.destroy({ where: {} });    
    }); 

    describe('with no records in the database', () => {
        describe('POST /authors', () => {
            it('creates a new author in the database', async () => {
                const response = await request(app).post('/authors').send({
                    name: 'Stephen King'
                });
                const newAuthorRecord = await Author.findByPk(response.body.id, {
                    raw:true,
                });
                
                expect(response.status).to.equal(201);
                expect(response.body.name).to.equal('Stephen King');
                expect(newAuthorRecord.name).to.equal('Stephen King');
            });
        });
        it('sends a 400 error if name is an empty string', async () => {
            const response = await request(app).post('/authors').send({ 
                name: '',
            });
            const newAuthorRecord = await Author.findByPk(response.body.id, { 
                raw: true, 
            });
            expect(response.status).to.equal(400);
            expect(response.body.errors.length).to.equal(1);
            expect(newAuthorRecord).to.equal(null);
        })
    })
})