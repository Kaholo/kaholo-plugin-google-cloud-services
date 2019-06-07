const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

function serviceList(action, settings) {
    return new Promise((resolve, reject) => {
        let keysParam = action.params.CREDENTIALS || settings.CREDENTIALS
        let keys;
        if (typeof keysParam != 'string'){
            keys = keysParam;
        } else {
            try{
                keys = JSON.parse(keysParam)
            }catch(err){
                return Promise.reject("Invalid credentials JSON");
            }
        }
        const auth = new JWT(
            keys.client_email,
            null,
            keys.private_key,
            ['https://www.googleapis.com/auth/cloud-platform'],
        );
        let request = {
            parent: 'projects/' + action.params.PROJECTID,
            auth: auth
        };
        let serviceusage = google.serviceusage('v1');
        serviceusage.services.list(request, function(err, response) {
            if (err)
                return reject(err);
            resolve(response);
        })
    })
}

function serviceEnable(action, settings) {
    return new Promise((resolve, reject) => {
        let keysParam = action.params.CREDENTIALS || settings.CREDENTIALS
        let keys;
        if (typeof keysParam != 'string'){
            keys = keysParam;
        } else {
            try{
                keys = JSON.parse(keysParam)
            }catch(err){
                return Promise.reject("Invalid credentials JSON");
            }
        }
        const auth = new JWT(
            keys.client_email,
            null,
            keys.private_key,
            ['https://www.googleapis.com/auth/cloud-platform'],
        );
        let request = {
            name: 'projects/'+ action.params.PROJECTID + '/services/' + action.params.SERVICE,
            auth: auth
        };
        let serviceusage = google.serviceusage('v1');
        serviceusage.services.enable(request, function(err, response) {
            if (err)
                return reject(err);
            resolve(response);
        })
    })
}

function serviceDisable(action, settings) {
    return new Promise((resolve, reject) => {
        let keysParam = action.params.CREDENTIALS || settings.CREDENTIALS
        let keys;
        if (typeof keysParam != 'string'){
            keys = keysParam;
        } else {
            try{
                keys = JSON.parse(keysParam)
            }catch(err){
                return Promise.reject("Invalid credentials JSON");
            }
        }
        const auth = new JWT(
            keys.client_email,
            null,
            keys.private_key,
            ['https://www.googleapis.com/auth/cloud-platform'],
        );
        let request = {
            name: 'projects/'+ action.params.PROJECTID + '/services/' + action.params.SERVICE,
            auth: auth
        };
        let serviceusage = google.serviceusage('v1');
        serviceusage.services.disable(request, function(err, response) {
            if (err)
                return reject(err);
            resolve(response);
        })
    })
}

module.exports = {
    serviceList: serviceList,
    serviceEnable: serviceEnable,
    serviceDisable: serviceDisable
}