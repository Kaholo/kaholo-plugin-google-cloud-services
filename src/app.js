const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const Compute = require('@google-cloud/compute');

function _getAuth(action, settings){
    let keys = _getCredentials(action,settings);
    const auth = new JWT(
        keys.client_email,
        null,
        keys.private_key,
        ['https://www.googleapis.com/auth/cloud-platform'],
    );

    return auth;
}

function _getCredentials(action, settings){
    let keysParam = action.params.CREDENTIALS || settings.CREDENTIALS
    let keys;
    if (typeof keysParam != 'string'){
        keys = keysParam;
    } else {
        try{
            keys = JSON.parse(keysParam)
        }catch(err){
            throw new Error("Invalid credentials JSON");
        }
    }
    return keys;
}

function _handleOPeration(operation){
    return new Promise((resolve,reject)=>{
        try {
            operation
                .on('error', function (err) {
                    reject(err);
                })
                .on('running', function (metadata) {
                    console.log(JSON.stringify(metadata));
                })
                .on('complete', function (metadata) {
                    resolve(metadata);
                });
        } catch (e) {
            reject(e);
        }    
    })
}

function serviceList(action, settings) {
    return new Promise((resolve, reject) => {
        const auth = _getAuth(action,settings);
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
        const auth = _getAuth(action,settings);
        let request = {
            name: 'projects/'+ action.params.PROJECTID + '/services/' + action.params.SERVICE,
            auth: auth
        };
        let serviceusage = google.serviceusage('v1');
        serviceusage.operations.get()
        serviceusage.services.enable(request, function(err, response) {
            if (err)
                return reject(err);
            
            if(!action.params.waitForOperation)
                return resolve(response);

            let compute = new Compute({
                credentials : _getCredentials(action,settings),
                projectId : 'projects/' + action.params.PROJECTID
            });
            let opId = response.data.name.substr(response.data.name.indexOf('/'));
            let operation = compute.operation(opId);
            _handleOPeration(operation).then(resolve).catch(reject);
        })
    })
}

function serviceDisable(action, settings) {
    return new Promise((resolve, reject) => {
        const auth = _getAuth(action,settings);
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