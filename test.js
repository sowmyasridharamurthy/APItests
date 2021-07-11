import supertest from 'supertest';
import {expect} from 'chai';
import support from './utility/support';
import {usersJson} from './utility/constant'
var tags = require('mocha-tags');
const fetch = require("node-fetch");
const helper = new support();
const request = supertest('https://jsonplaceholder.typicode.com');
var ID;

describe('API tests', () => {

tags('get1').it('Compare users output JSON structure', () => {
    return request
     .get('/users')
     .expect(200)
     .expect('Content-Type', /json/) 
     .then(( res) => { 
         expect(helper.compareOutput(usersJson,res.body)).to.be.false;
     });
 });

 tags('get').it('API should return empty object of user does not exist', () => {
    return request
     .get('/users?username=userDoesNotExist')
     .expect(200)
     .expect('Content-Type', /json/) 
     .then(( res) => { 
        expect(res.body).to.be.empty;
     });
 });


 tags('get').it('Search user with specific username and capture ID', () => {
     return request
      .get('/users?username=Delphine')
      .expect(200)
      .expect('Content-Type', /json/) 
      .then(( res) => {
        ID = res.body[0].id
        expect(res.body).to.not.be.empty;  //body should have the value
        expect(res.body).to.have.length(1) // exactly one record to be returned
                     
      });
  });

  tags('post').it('Get all the  posts made by specific user-Delphine', () => {
      let postUrl = `/posts?userId=${ID}`
    return request
     .get(postUrl)
     .expect(200)
     .then(( res) => {
       expect(res.body).to.not.be.empty;  //body should have the value
        var data = res.body;
        data.forEach(element => {
        expect(element.id).to.not.be.null;
    });
                    
     });
 });

 tags('get').it('Validate email address in comment for specific user', () => {
    var url = `/posts/${ID}/comments`;
    return request
     .get(url)
     .expect(200)
     .then((data) => {
      for(let i = 0 ; i< data.body.length; i++){
          expect(data.body[i].email).to.be.not.null;
          if(helper.validateEmail(data.body[i].email)) { }
          else{return false} 
          };
      } 
     )
     });


     tags('post').it('User should be allowed to create a new post', () => {
        return request
        .post('/posts')
        .send({
                   title: 'To add new post',
                   body: 'New posts can be added by user, by filling required parameters',
                   userId: 9,
               })
         .set('Content-type', 'application/json; charset=UTF-8')
         .expect('Content-Type', /json/)
         .expect(201)
         .then((data) => {
         //console.log(data.body)
         expect(data.body.id).to.not.be.null
         } )
        
    });
       

  
  


})