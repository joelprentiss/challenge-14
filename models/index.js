const User = require('./user');
const Post = require('./post');
const Comments = require('./comments');

User.hasMany(Post,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User,{
    foreignKey: 'user_id'
});

Comments.belongsTo(User,{
    foreignKey: 'user_id'
});

module.exports ={User, Post, Comments};