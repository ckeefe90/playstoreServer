const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should sort by rating or app', () => {
        return supertest(app)
            .get('/apps?sort=Rating')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1);
                const appData = res.body[0];
                console.log("appData", appData);
                expect(appData).to.include.all.keys(
                    'Rating', 'App'
                );
            });
    })

    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be by rating or app');
    });
})