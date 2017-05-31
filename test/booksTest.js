process.env.NODE_ENV = 'test';

var booksModel = require('../models/booksModel');

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var server = require('../app');

describe('Books', () => {
	beforeEach((done) => {
		booksModel.remove({}, (err) => {
			done();	
		});
	});

	describe('/GET books', () => {
		it('it should GET all the books', (done) => {
			request(server)
				.get('/api/books')
				.expect(200)
				.then((res) => {
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.eql(0);
					done();
				})
				.catch((err) => {
					done(err);
				});				
			});
	});

	describe('/POST book', () => {
		it('it should not POST a book without pages field', (done) => {
			var book = {
				title: 'Lord of the Rings',
				author: 'J.R.R. Tolkien',
				year: 1954
			};

			request(server)
				.post('/api/books')
				.send(book)
				.expect(500)
				.then((res) => {
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('errors');
					expect(res.body.errors).to.have.property('pages');
					expect(res.body.errors.pages).to.have.property('kind').and.equal('required');
					done();
				}).catch((err) => {
					done(err);
				});	;
		});

		it('it should POST a book', (done) => {
			var book = {
				title: 'Lord of the Rings',
				author: 'J.R.R. Tolkien',
				year: 1954,
				pages: 1170
			};

			request(server)
				.post('/api/books')
				.send(book)
				.expect(201)
				.then((res) => {
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('message').and.equal('Book successfully created');
					expect(res.body.book).to.have.property('title');
					expect(res.body.book).to.have.property('author');
					expect(res.body.book).to.have.property('pages');
					expect(res.body.book).to.have.property('year');
					done();
				}).catch((err) => {
					done(err);
				});	
		});
	});

	describe('/GET/:id book', () => {
		it('it should GET a book by the given id', (done) => {
			var book = new booksModel({
				title: 'Lord of the Rings',
				author: 'J.R.R. Tolkien',
				year: 1954,
				pages: 1170
			});

			book.save((err, book) => {
				request(server)
					.get('/api/books/' + book.id)
					.expect(200)
					.then((res) => {
						expect(res.body).to.be.an('object');						
						expect(res.body).to.have.property('title');
						expect(res.body).to.have.property('author');
						expect(res.body).to.have.property('pages');
						expect(res.body).to.have.property('year');
						expect(res.body).to.have.property('_id').and.equal(book.id);

						done();
					})
					.catch((err) => {
						done(err);
					});	;
			});
		});
	});

	describe('/PUT/:id book', () => {
		it('it should UPDATE a book given the id', (done) => {
			var book = new booksModel({
				title: 'Lord of the Rings',
				author: 'J.R.R. Tolkien',
				year: 1954,
				pages: 1170
			});

			book.save((err, book) => {
				request(server)
					.put('/api/books/' + book.id)
					.send({author: 'LP Venkat'})
					.expect(202)
					.then((res) => {
						expect(res.body).to.be.an('object');
						expect(res.body).to.have.property('message').and.equal('Book successfully updated');
						expect(res.body.book).to.be.an('object');
						expect(res.body.book).to.have.property('author').and.equal('LP Venkat');
						done();
					}).catch((err) => {
						done(err);
					});	;
			});
		});
	});

	describe('/DELETE/:id book', () => {
		it('it should DELETE a book given the id', (done) => {
			var book = new booksModel({
				title: 'Lord of the Rings',
				author: 'J.R.R. Tolkien',
				year: 1954,
				pages: 1170
			});

			book.save((err, book) => {
				request(server)
					.delete('/api/books/' + book.id)
					.expect(204)
					.then((res) => {
						done();
					}).catch((err) => {
						done(err);
					});
			}); 
		});
	});
});