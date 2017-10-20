var ObjectId = require('mongodb').ObjectId; 

module.exports = function (app, db) {
    app.get('/intent', getIntents);
    app.get('/intent/:id', getIntentById);
    app.post('/intent', createIntent);

    function getIntents (req, res) {
        db.collection("intent").find({}).toArray((err, item) => {
            if (err)
                res.send({ 'error': 'An error has occurred' });
            else
                res.send(JSON.stringify(item));
        });
    }

    function getIntentById (req, res) {
        var query = { _id: new ObjectId(req.params.id) };

        db.collection("intent").findOne(query, (err, item) => {
            if (err)
                res.send({ 'error': 'An error has occurred' });
            else
                res.send(JSON.stringify(item));
        });
    }

    function createIntent (req, res) {
        const intentDto = { intent: req.body.intent, keywords: req.body.keyword };         

        db.collection('intent').insert(intentDto, (err, result) => {
            if (err) 
                res.send({ 'error': 'An error has occurred' });
            else 
                res.send(result.ops[0]);
        });
    }
};

