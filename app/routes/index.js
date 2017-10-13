const intentRoutes = require('./intent_routes');

module.exports = function (app, db) {
    intentRoutes(app, db);
    // Other route groups could go here, in the future
};