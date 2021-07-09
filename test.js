import supertest from 'supertest';
const request = supertest('https://jsonplaceholder.typicode.com');
import {expect} from 'chai';
import support from './utility/support';
const fetch = require("node-fetch");
const helper = new support();


describe('API tests', () => {
var ID;

  it('Search user with specific username and capture ID', () => {
     return request
      .get('/users?username=Delphine')
      .expect(200)
      .then(( res) => {
        ID = res.body[0].id
        expect(res.body).to.not.be.empty;  //body should have the value
        expect(res.body).to.have.length(1) // exactly one record to be returned
                     
      });
  });

  it('Check for the posts made by specific user', () => {
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

it('Validate email address in comment for specific user', () => {
    var url = `/posts/${ID}/comments`;
    return request
     .get(url)
     .expect(200)
     .then((data) => {
      for(let i = 0 ; i< data.body.length; i++){
          if(helper.validateEmail(data.body[i].email)) { }
          else{return false} 
          };
      } 
     )
     });


it('User should be allowed to create a new post', () => {
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
       

    it('Delete a comment', () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',

    });

    })
      


})