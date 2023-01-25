
const User = require("./Users");
const Favorites = require("./Favorites");

Favorites.belongsTo(User);
User.hasMany(Favorites);

module.exports = { User, Favorites };