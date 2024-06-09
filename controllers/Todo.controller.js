const { Todo } = require('../models');

class TodoController{
    static async insertData(req, res, next){
        try{
            const { title, user_id } = req.body;
            const data = await Todo.create({
                title, user_id
            });
            res.status(201).json(data);
        }catch(err){
            next(err);
        }
    }
    static async deleteData(req, res, next){
        try{
            const { id } = req.params;
            const data = await Todo.findByPk(id);

            if(data) {
                await Todo.update({ deletedAt: new Date() }, { where: {id} });
                res.status(204).end();
            }else{
                res.status(404).json({message: 'Todo not found'});
            }
        }catch(err){
            next(err);
        }
    }
    static async getData(req, res, next) {
        try{
            const data = await Todo.findAll();
            res.status(200).json(data);
        }catch(err){
            next(err);
        }
    }
    static async getDataById(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'id is required'});
            const data = await Todo.findByPk(id);
            if(data) res.status(200).json(data);
            else res.status(404).json({message: 'error not found'});
        }catch(err){
            next(err);
        }
    }
}

module.exports = TodoController;