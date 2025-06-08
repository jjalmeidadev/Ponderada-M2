const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Organization = require('./Organization');

class Event extends Model {}

Event.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    subtitle: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.STRING },
    image_path: { type: DataTypes.STRING },
    video_path: { type: DataTypes.STRING },
    organization_name: { type: DataTypes.STRING },
  },
  { sequelize, modelName: 'Event' }
);

// Associa o evento à organização com base no nome
Event.belongsTo(Organization, {
  foreignKey: 'organization_name',
  targetKey: 'name',
  as: 'organization',
});

module.exports = Event;