const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

async function main() {
    const allPosts = await prisma.posts.findMany()
    console.log(allPosts);
};

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

async function seed () {
    await prisma.posts.deleteMany();
    await prisma.person.deleteMany();
    console.log('Seeding the Database!');
    try {
        //Create 5 users
        const data = Array.from({ length: 5 }).map(() => ({
            username: faker.internet.userName(),
            password: bcrypt.hashSync(faker.internet.password(), 10)
        }));
        await prisma.person.createMany({data});
        const persons = await prisma.person.findMany();

        //Create 5 posts per user
        persons.forEach(async (person) => {
            await prisma.person.update({
                where: {
                    id: person.id
                },
                data: {
                    Posts: {
                        createMany: {
                            data: Array.from({ length: 5 }).map(() => ({
                                content: faker.lorem.sentences(3)
                            }))
                        }
                    }
                }
            })
        })

        console.log('Persons: ', persons);
        console.log('Database is seeded!');
    } catch (err) {
        console.error(err);
    }
}

if (require.main === module) {
    seed();
}

module.exports = seed;