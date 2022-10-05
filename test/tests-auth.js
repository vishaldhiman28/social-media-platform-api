
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('Authentication API', function() {
    it('it should authenticate user', function(done) {
        chai.request(server)
            .post ('api/authenicate')
            .send ({
                    "email" : "legionXYZ@gmail.com",
                    "password" : "legion$@1290"
            })
            .end((err, res) => { 
                res.should.have.status(200);
                response.body.should.have.property ('result');
                done ();
            });
    });
})