process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //insecure

const Promise = require('bluebird');
const translate = require('yandex-translate')("trnsl.1.1.20171017T110423Z.eb049536569bdc66.b68191671259a4613d1bf26dcfd8e445bf98340f");
const unescape = require('lodash.unescape');
Promise.promisifyAll(translate);

module.exports = function (app, db) {
    app.get('/intent', (req, res) => {
        // You'll create your note here.
        
        //res.send(db.collection('intent').find({}));
        const oid = require('mongodb').ObjectId; 
        var query = { intent: "change password" };
        var o_id = new oid("59de213694829e5420b71b7b");

        db.collection("intent").find(query).toArray((err, item) => {
            if (err) 
                res.send({ 'error': 'An error has occurred' });
            else 
                res.send(JSON.stringify(item));
          });
    });

    app.post('/translate/:vendor', (req, res) => {
        const vendor = req.params.vendor;
        var unescaped = null;

        // translate.translate(req.body.text, { to: 'en' }, (err, res) => {
        //     unescaped = unescape(res.text);
        //     console.log(unescaped);
        // });

        // const translateDto = { textBeforeTranslate: req.body.text, textAfterTranslate: unescaped, vendor: req.params.vendor , language: req.params.language };
        
        // db.collection('translate').insert(translateDto, (err, result) => {
        //     if (err) 
        //     {
        //         res.send({ 'error': 'An error has occurred' });
        //     }
        //     else 
        //     {
        //         res.send(result.ops[0]);
        //     }
        // });
        
        
        translate.translateAsync(req.body.text, { to: 'en' })
        .then((res) => {
            const translateDto = { textBeforeTranslate: req.body.text, textAfterTranslate: unescape(res.text), vendor: req.params.vendor , language: req.params.language };
            return db.collection('translate').insert(translateDto);
        })
        .then((result) => {      
            res.send(result.ops[0]);
        })
        .catch((err) => {
            res.send({ 'error': 'An error has occurred' });
        });  
    });
};