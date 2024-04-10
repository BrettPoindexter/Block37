const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient().$extends({
    query: {
        person: {
            async create({ model, operation, args, query}) {
                console.log('Args: ', args);
                args.data = {...args.data, password: bcrypt.hashSync(args.data.password, 10)}
                return query(args);
            }
        }
    }
})

async function query(sql, params, callback) {
    return db.query(sql, params, callback);
}

module.exports = { prisma, query };