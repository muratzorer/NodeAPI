module.exports = function (app, db) {
    app.get('/intent', (req, res) => {
        // You'll create your note here.
        
        //res.send(db.collection('intent').find({}));
        var oid = require('mongodb').ObjectId; 
        var query = { intent: "change password" };
        var o_id = new oid("59de213694829e5420b71b7b");

        db.collection("intent").find(query).toArray((err, item) => {
            if (err) 
                res.send({ 'error': 'An error has occurred' });
            else 
                res.send(JSON.stringify(item));
          });
    });

    app.post('/intent', (req, res) => {
        const intentDto = { intent: req.body.intent, keywords: req.body.keyword };
        db.collection('intent').insert(intentDto, (err, result) => {
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