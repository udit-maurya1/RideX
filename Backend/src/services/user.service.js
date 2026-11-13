const userModel = require('../model/user.model')

async function createUser({firstname , lastname ,email, password}) {
    if(!firstname || !email || !password){
        throw new Error('All fieldds are required');
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}



module.exports = { createUser}