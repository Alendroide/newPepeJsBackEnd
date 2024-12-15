//Importaciones
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Inicializaciones
const prisma = new PrismaClient();
//Controladores
const getById = () => async(req,res) => {
    try{
        const id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where : {
                id
            },
            select : {
                id : true,
                name : true,
                bio : true,
                img : true
            }
        });
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }
        res.status(200).json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

const register = () => async(req,res) => {
    try{
        const img = req.file?.filename? `http://localhost:4000/public/pfp/${req.file.filename}` : null;
        const { name, bio, email, password } = req.body;
        const encrypted = await bcrypt.hash(password,10);
        const data = {
            img,
            name,
            bio,
            email,
            password : encrypted
        }
        const user = await prisma.user.create({data});
        res.status(201).json(user)
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

const login = () => async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where : {
                email
            }
        });
        if(!user){
            return res.status(404).json({msg:"User not found"});
        }
        const verified = await bcrypt.compare(password,user.password);
        if(verified){
            const token = jwt.sign({
                email : user.email,
                name : user.name,
                id : user.id,
            },process.env.SECRET_WORD);
            return res.status(200).json({token});
        }
        res.status(401).json({msg:"Wrong password"});
    }
    catch(error){
        console.error(error);
        res.status(500).json({msg:"Internal server error"});
    }
}

module.exports = {
    getById,
    register,
    login
}