const { User } = require('../models');

class UserController{
    static async insertData(req, res, next){
        try{
            const { username, password, age } = req.body;
            const data = await User.create({
                username, password, age
            });
            res.status(201).json(data);
        }catch(err){
            next(err);
        }
    }
    static async deleteData(req, res, next){
        try{
            const { id } = req.params;
            const data = await User.destroy({ where: {id} });
            if(data){
                res.status(204).json({message: 'Delete success'});
            }else{
                res.status(404).json({message: 'Student not found'});
            }
        }catch(err){
            next(err);
        }
    }
    static async getData(req, res, next) {
        try{
            const data = await User.findAll();
            res.status(200).json(data);
        }catch(err){
            next(err);
        }
    }
    static async getDataById(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(404).json({message: 'id is required'});
            const data = await User.findByPk(id);
            if(data) res.status(200).json(data);
            else res.status(400).json({message: 'error not found'});
        }catch(err){
            next(err);
        }
    }
}

module.exports = UserController;