const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send("You must be logged in to do that.");
    }
    next();
});

//Get all Posts
router.get('/', async (req, res, next) => {
    try {
        const all = await prisma.posts.findMany({
            where: {
                personId: req.body.id
            }
        });
        res.send(all);
    } catch (err) {
        next(err);
    }
})