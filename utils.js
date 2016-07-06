function createUser(name, password, User){
    var user = new User();
    user.name = name;
    user.setPassword(password);
    user.save();
    console.log('admin user was created');
}

module.exports = {
    createUser: createUser
}