const intentRoutes = require('./intent-routes');
const translateRoutes = require('./translate-routes');

module.exports = function (app, db) {
    intentRoutes(app, db);
    translateRoutes(app, db);
    // Other route groups could go here, in the future
};