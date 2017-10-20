process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //insecure

const Promise = require('bluebird');
const translate = require('yandex-translate')("trnsl.1.1.20171017T110423Z.eb049536569bdc66.b68191671259a4613d1bf26dcfd8e445bf98340f");
const unescape = require('lodash.unescape');
const cognitiveServices = require('cognitive-services');
Promise.promisifyAll(translate);

module.exports = function (app, db) {
    app.get('/translate', (req, res) => {
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

        translateService(req.body.text, vendor)
        .then((res) => {
            const translateDto = { textBeforeTranslate: req.body.text, textAfterTranslate: unescapeIfYandex(vendor, res), vendor: req.params.vendor, language: req.params.language };
            return db.collection('translate').insert(translateDto);
        })
        .then((result) => {
            res.send(result.ops[0]);
        })
        .catch((err) => {
            res.send({ 'error': 'An error has occurred' });
        });
    });

    app.get('/translate', translateFromTurkishToEnglish);

    function translateFromTurkishToEnglish(req, res) {
        const response = translateService(req.query.text, req.query.vendor);
        
        return unescapeIfYandex(vendor, response);
    }
};

var translateService = function (text, vendor) {
    switch (vendor) {
        case 'yandex':
            return translateViaYandex(text);

        case 'bing':
            return translateViaBing(text);

        default:
            return null;
    }
}

var translateViaYandex = function (text) {
    return translate.translateAsync(text, { to: 'en' });
}

var translateViaBing = function (text) {
    const parameters = {
        from: "tr",
        to: "en",
        text: text,
        contentType: "text/plain",
        category: "generalnn" // parameterized soon
    }

    const client = new cognitiveServices.textTranslator({
        apiKey: "a7edfa68d85f40b1ab1398c693df0556",
        endpoint: "api.microsofttranslator.com"
    });

    return client.translate({ parameters });
}

var unescapeIfYandex = function (vendor, response) {
    if (vendor === 'yandex')
        return unescape(response.text);

    return response; // bing return does not have text property
}

var unescapeResponse = function (response) {
    if (response.text !== undefined)
        return unescape(response.text);
    else
        return unescape(response);
}