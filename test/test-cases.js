
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  
  it("Testing /find Endpoint #1 with valid data", done => {
    chai
      .request("http://localhost:3000")
      .post("/find")
      .send({"query":{"date":"2017-03-01","city_name":"Ujjain"}})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('Object');   
        done();
      });
  });
  it("Testing /find Endpoint #2 with non prime date", done => {
    chai
      .request("http://localhost:3000")
      .post("/find")
      .send({"query":{"date":"2017-03-12","city_name":"Ujjain"}})
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
       // expect(res.body).to.be.a('Object');   
        done();
      });
  });
  it("Testing /find Endpoint #2 with no params", done => {
    chai
      .request("http://localhost:3000")
      .post("/find")
     .end((err, res) => {
        expect(res.statusCode).to.equal(400);
          
        done();
      });
  });
  it("Testing /find Endpoint #2 with incorrect date format", done => {
    chai
      .request("http://localhost:3000")
      .post("/find")
      .send({"query":{"date":"2017-33-12","city_name":"Ujjain"}})
     .end((err, res) => {
        expect(res.statusCode).to.equal(400);
          
        done();
      });
  });

});
