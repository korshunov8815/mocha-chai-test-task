var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


/* 
testing https://jsonplaceholder.typicode.com
JSONPlaceholder is a free online REST service that you can use whenever you need some fake data.
You can refer to the website for the API documentation and examples.

Create test cases for 
GET	/posts/:id
POST	/posts
PUT	/posts/:id

For the tests that use specific postID - please output the post object to console
*/

// test for GET	/posts
testCase('/GET posts', function(){
      it('it should GET all the posts', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts')
            .end((err, res) => {
                res.should.have.status(200);
                //do not output all posts but please make output of few first posts of the received array
                res.body.should.be.a('array');
                done();
            });
      });
  });

//tests for GET	/posts/:id - please create several tests (7 tests or more)

//test for GET /posts/1
//positive test using positive minimal possible integer number (boundary value)
testCase('/GET 1st post', function(){
      it('it should GET first post', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/1')
            .end((err, res) => {
                res.should.have.status(200);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(1);
                console.log(res.body);
                done();
            });
      });
  });

//test for GET /posts/100
//positive test using positive max possible integer number (number of posts equals 100 - boundary value)
testCase('/GET 100th post', function(){
      it('it should GET 100th post', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/100')
            .end((err, res) => {
                res.should.have.status(200);
		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(100);
                console.log(res.body);
                done();
            });
      });
  });

//test for GET /posts/101
//positive test using positive integer number that exceeds number of posts (boundary value)
testCase('/GET 101th post', function(){
      it('it shouldnt GET 101th post (404 error code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/101')
            .end((err, res) => {
		res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });

//test for GET /posts/0
//negative test using 0 post id
testCase('/GET 0 post', function(){
      it('it shouldnt GET any post (/posts/0 - 404 error code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/0')
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });

//test for GET /posts/-1
//negative test using negative number
testCase('/GET -1 post', function(){
      it('it shouldnt GET any post (/posts/-1 - 404 error code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/-1')
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });

//test for GET /posts/aaa
//negative test using letters
testCase('/GET aaa post', function(){
      it('it shouldnt GET any post (/posts/aaa - 404 error code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/aaa')
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });

//test for GET /posts/"""
//negative test using special symbols
//let's suppose that service is protected from any kind of injections so we don't need to create much more tcs related to that
testCase('/GET *** post', function(){
      it('it shouldnt GET any post (/posts/*** - 404 error code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/***')
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });





//tests for POST	/posts - please create few tests (5 tests or more)


//positive test for posting a post with existing user (userId = 1 as boundary value)
testCase('/POST new post with userId=1', function(){
      it('it should respond as if post was created (201 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: 'foo',
		    body: 'bar',
		    userId: 1
  	    })
            .end((err, res) => {
                res.should.have.status(201);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(101);
                res.body.title.should.equal('foo');			
		res.body.body.should.equal('bar');
		res.body.userId.should.equal(1);
                console.log(res.body);
                done();
            });
      });
  });

//positive test for posting a post with existing user (userId = 10 as boundary value)
testCase('/POST new post userId=10', function(){
      it('it should respond as if post was created (201 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: 'foo',
		    body: 'bar',
		    userId: 10
	    })
            .end((err, res) => {
                res.should.have.status(201);
 		res.should.be.json;
                res.body.should.be.a('object'); 
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(101);
                res.body.title.should.equal('foo');			
		res.body.body.should.equal('bar');
		res.body.userId.should.equal(10);
                console.log(res.body);
                done();
            });
      });
  });

//NEGATIVE test for posting a post with non-existing user (userId = 11 as boundary value)
//PLEASE TAKE INTO CONSIDERATION THAT I ASSUME THAT NO POST SHOULD BE CREATED WITH NON-EXISTENT USER ID
testCase('/POST new post userId=11', function(){
      it('it should respond as if post was NOT created (404 code - user not found)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: 'foo',
		    body: 'bar',
		    userId: 11
	    })
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });

//NEGATIVE test for posting a post with non-existing user (userId = aaa - lettered value)
//PLEASE TAKE INTO CONSIDERATION THAT I ASSUME THAT NO POST SHOULD BE CREATED WITH NON-EXISTENT USER ID
testCase('/POST new post userId=aaa', function(){
      it('it should respond as if post was NOT created (404 code - user not found)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: 'foo',
		    body: 'bar',
		    userId: 'aaa'
	    })
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });


//NEGATIVE test for posting a post with non-existing user (userId = *** - special symbol value)
//PLEASE TAKE INTO CONSIDERATION THAT I ASSUME THAT NO POST SHOULD BE CREATED WITH NON-EXISTENT USER ID
testCase('/POST new post userId=***', function(){
      it('it should respond as if post was NOT created (404 code - user not found)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: 'foo',
		    body: 'bar',
		    userId: '***'
	    })
            .end((err, res) => {
                res.should.have.status(404);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });


//positive test for posting a post with empty body post
//lets assume that service allow creation of posts with empty modies
testCase('/POST new post with empty body', function(){
      it('it should respond as if post was created (201 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: 'foo',
		    body: '',
		    userId: 10
	    })
            .end((err, res) => {
                res.should.have.status(201);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(101);
                res.body.title.should.equal('foo');			
		res.body.body.should.equal('');
		res.body.userId.should.equal(10);
                console.log(res.body);
                done();
            });
      });
  });

//positive test for posting a post with empty title post
//lets assume that service allow creation of posts with empty titles
testCase('/POST new post with empty title', function(){
      it('it should respond as if post was created (201 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send({
		    title: '',
		    body: 'bar',
		    userId: 10
	    })
            .end((err, res) => {
                res.should.have.status(201);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(101);
                res.body.title.should.equal('');			
		res.body.body.should.equal('bar');
		res.body.userId.should.equal(10);
                console.log(res.body);
                done();
            });
      });
  });



//PUT	/posts/:id - please create few tests (3 tests or more)


//positive test for updating title & body of existing post
testCase('/PUT update title & body of existing (1st) post', function(){
      it('it should respond as if post was updated (200 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .put('/posts/1')
            .send({
		    id: 1,
		    title: 'foo',
		    body: 'bar',
		    userId: 1
	    })
            .end((err, res) => {
                res.should.have.status(200);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(1);
                res.body.title.should.equal('foo');			
		res.body.body.should.equal('bar');	
		res.body.userId.should.equal(1);
                console.log(res.body);
                done();
            });
      });
  });

//positive test for updating userId of existing post
testCase('/PUT update user of existing (1st) post', function(){
      it('it should respond as if post (userId) was updated (200 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .put('/posts/1')
            .send({
		    id: 1,
		    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
		    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
		    userId: 10
	    })
            .end((err, res) => {
                res.should.have.status(200);
 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.id.should.equal(1);
                res.body.title.should.equal('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');			
		res.body.body.should.equal('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');	
		res.body.userId.should.equal(10);
                console.log(res.body);
                done();
            });
      });
  });


//negative test for updating non-existing post
testCase('/PUT update user of non-existing (101st) post', function(){
      it('it should respond as if post was not found (404 code)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .put('/posts/101')
            .send({
		    id: 101,
		    title: "foo",
		    body: "bar",
		    userId: 10
	    })
            .end((err, res) => {
            	res.should.have.status(404);

 		res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.be.empty;
                console.log(res.body);
                done();
            });
      });
  });




