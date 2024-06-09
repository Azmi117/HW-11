const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models');
const {queryInterface} = sequelize;

beforeAll((done) => {
    queryInterface.bulkInsert("Todos",
        [
            {
                id: 1001,
                title: "wkwkwk",
                user_id: 10,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1002,
                title: "hahaha",
                user_id: 11,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 1003,
                title: "jajajaja",
                user_id: 12,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
    ).then(() => {
        done();
    }).catch((err) => {
        console.log(err);
        done(err);  
    });
}, 10000); 

afterAll((done) => {
    queryInterface.bulkDelete('Todos', null, {})
    .then(() => {
        done();
    }).catch(err => {
        console.log(err);
        done(err);  
    });
}, 10000); 

describe('GET Todo', () => {
    it("List Todos", (done) => {
        request(app)
            .get("/todo")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                console.log(response.body);
                expect(response.body.length).toEqual(3);
                const todos = response.body;
                const firstTodo = todos[0];
                expect(firstTodo.id).toEqual(1001);
                expect(firstTodo.title).toEqual("wkwkwk");
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);  
            });
    }, 10000)

    it("Get Detail Todos", (done) => {
        request(app)
            .get(`/todo/${1001}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                console.log(response.body, "<<<<<<<<")
                const todo = response.body;
                expect(todo.id).toEqual(1001)
                expect(todo.title).toEqual("wkwkwk");
                expect(todo.user_id).toEqual(10);
                expect(todo.deletedAt).toEqual(null);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);  
            });
    }, 10000)
    
});


describe('POST Todo', () => {
    it("Create Todo", (done) => {
        const todoData = {
            title: "New Todo",
            user_id: 13,
            deletedAt: null // Sesuaikan dengan user_id yang sesuai
            // Jika ada field lain yang perlu diisi, tambahkan di sini
        };

        request(app)
            .post("/todo/create")
            .send(todoData)
            .expect('Content-Type', /json/)
            .expect(201) // Atur status kode yang sesuai untuk pembuatan berhasil
            .then((response) => {
                console.log(response.body);
                // Lakukan pengecekan apakah respons sesuai dengan yang diharapkan
                // Contoh:
                expect(response.body.title).toEqual("New Todo");
                expect(response.body.user_id).toEqual(13);
                expect(response.body.deletedAt).toEqual(null);
                // Pastikan id ada di respons (jika generasi otomatis)
                expect(response.body.id).toBeDefined();
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);  
            });
    }, 10000);
});

describe('DELETE Todo', () => {
    it("Delete Todo", (done) => {
        const todoIdToDelete = 1001; // Sesuaikan dengan ID todo yang ingin dihapus

        request(app)
            .delete(`/todo/delete/${todoIdToDelete}`)
            .expect('Content-Type', /json/)
            .expect(204) // Atur status kode yang sesuai untuk penghapusan berhasil
            .then(() => {
                // Lakukan pengecekan apakah todo berhasil dihapus
                // Contoh: Lakukan permintaan get untuk memastikan todo tidak ada lagi
                return request(app)
                    .get(`/todo/delete/${todoIdToDelete}`)
                    .expect(404); // Harus mengembalikan status 404 karena todo sudah dihapus
            })
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);  
            });
    }, 10000);
});
