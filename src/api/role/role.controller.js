const Role = require("./role.model")

module.exports = {
    async create(req,res){
        try{
            const data = req.body

            const newRole = {
                ...data
            }

            const role = await Role.create(newRole)

            res.status(200).json({message:'Role Created',data:role})
        } catch(err){
            res.status(500).json({message:'Role not created',data:err})
        }
    },

    async list(req,res){
        try{
            const users = await Role.find()
            res.status(200).json({message:'Roles found',data:users})
        } catch(err){
            res.status(400).json({message:'not possible to list roles',data:err})
        }
    }
}