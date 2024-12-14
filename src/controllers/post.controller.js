//Importaciones
require('dotenv').config()
const { PrismaClient } = require('@prisma/client');
//Inicializaciones
const prisma = new PrismaClient();
//Controladores

const getAll = () => async(req,res) => {
    try{
        const skip = (parseInt(req.params.skip)-1)*parseInt(process.env.SKIP);
        const posts = await prisma.post.findMany({
            take : parseInt(process.env.SKIP),
            skip,
            select : {
                id: true,
                title : true,
                body : true,
                img : true,
                created_at : true,
                user : {
                    select : {
                        id : true,
                        name : true,
                        img : true
                    }
                },
            },
            orderBy : {
                created_at : 'desc'
            }
        })
        if(posts.length === 0){
            return res.status(200).json({msg:"No posts to show"});
        }
        res.status(200).json(posts)
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

const getById = () => async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const post = await prisma.post.findUnique({
            where : {
                id
            },
            select : {
                id : true,
                title : true,
                body : true,
                img : true,
                created_at : true,
                comments : {
                    select : {
                        comment : true,
                        created_at : true,
                        user : {
                            select : {
                                id : true,
                                name : true,
                                img : true
                            }
                        }
                    },
                    orderBy : {
                        created_at : 'desc'
                    }
                },
                user : {
                    select : {
                        id : true,
                        name : true,
                        img : true
                    }
                }
            }
        });
        res.status(200).json(post)
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

const create = () => async(req,res) => {
    try{
        const id = req.user;
        const { title, body } = req.body;
        if(body.length > 1000){
            return res.status(400).json({msg:"Bad request"});
        }
        const img = req.file?.filename? `http://localhost:4000/public/img/${req.file.filename}` : null;
        const post = await prisma.post.create({
            data : {
                title,
                body,
                img,
                userId : id,
            }
        });
        res.status(201).json(post);
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

module.exports = {
    getAll,
    create,
    getById
}