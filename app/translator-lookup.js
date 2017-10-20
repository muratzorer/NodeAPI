var translatorMap = new Map();

// internet şube
translatorMap.set('internet şube', 'yandex');
translatorMap.set('internet banka', 'yandex');

// mobil şube
translatorMap.set('mobil şube', 'yandex');
translatorMap.set('mobil banka', 'yandex');

// BES
translatorMap.set('BES', 'bing');

module.exports.lookup = translatorMap;