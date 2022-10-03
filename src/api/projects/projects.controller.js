const User = require("../user/user.model")
const Project = require("./projects.model")

module.exports = {
    async create(req,res,next){
        try{
            const data = req.body
            const userId = req.userId
            
            const user = await User.findById(userId) 

            if(!user){
                return res.status(400).json({message:'unvalid token',data:null})
            }

            const newProject = {
                ...data,
                user: user
            }

            const project = await Project.create(newProject)  
            user.projects.push(project)
            await user.save({validateBeforeSave:false})         

            res.status(200).json({message:'Project created',data:project})
        } catch(err){
            next(err)
        }
    },

    async list(req,res,next){
        try{
            const projects = await Project.find()
            res.status(200).json({message:'Projects found',data:projects})
        } catch(err){
            res.status(400).json({message:'No projects list',data:err})
        }
    },

    async show(req,res){
        try{
            const {projectId} = req.params
            const project = await Project.findById(projectId)
            res.status(200).json({message:'Project by id found',data:project})
        } catch(err){
            next(err)
        }   
    }
}