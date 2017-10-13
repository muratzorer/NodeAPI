module.exports = function (app, db) {
    app.get('/intent', (req, res) => {
        // You'll create your note here.
        
        //res.send(db.collection('intent').find({}));
        var id = db.ObjectID("59de213694829e5420b71b7b");
        //const details = { '_id': "59de213694829e5420b71b7b" };
        db.collection('intent').findOne(id, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/intent', (req, res) => {
        const intent = { intent: req.body.intent, keywords: req.body.keywords };
        db.collection('intent').insert(intent, (err, result) => {
            if (err) 
            {
                res.send({ 'error': 'An error has occurred' });
            } 
            else 
            {
                res.send(result.ops[0]);
            }
        });
    });
};