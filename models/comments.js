const { extend } = require('lodash');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        body:{
            type: DataTypes.STRING,
        },
        date_posted:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
      }
);

module.exports= Comments;