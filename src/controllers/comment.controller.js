//Importaciones
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
//Inicializaciones
const prisma = new PrismaClient();
//Controladores
const create = () => async(req,res) => {
    try{
        const postId = req.params.post;
        const userId = req.user;
        const { comment } = req.body;
        const newComment = await prisma.comment.create({
            data : {
                comment,
                postId,
                userId,
            }
        })
        res.status(200).json(newComment)
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

module.exports = {
    create
}