const Sequelize = require('sequelize');
const { faker } = require('@faker-js/faker');
const { STRING, TEXT } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:JerryPine@localhost/acme_db');

const User = conn.define('user', {
    name: STRING,
    bio: TEXT
}, {
    hooks: {
        beforeCreate: function(user){
            if(!user.bio){
                user.bio = `${user.name}. ${faker.lorem.paragraphs(3)}`
            }
            // console.log(user)
        }
    }
});

User.createWithName = (name)=> User.create({ name });

User.createRandomUser = function(){
    return this.create({ name: `${Math.random()}- user`})
};

const syncAndSeed = async()=> {
    await conn.sync({ force: true });
    const [moe, lucy, curly] = await Promise.all(
        ['moe', 'lucy', 'curly'].map(User.createWithName)
    );

    console.log(lucy.get());
};

module.exports = {
    models: {
        User
    },
    syncAndSeed
};


