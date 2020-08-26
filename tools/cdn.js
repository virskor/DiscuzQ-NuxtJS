const Refresher = require('tencent-cdn-refresh');
const CloudConf = require('../cloud.config');

const refresher = new Refresher({
    SecretId: CloudConf.SecretId,
    SecretKey: CloudConf.SecretKey
});

if(CloudConf.CDN.domain){
    refresher.purgeUrlsCache(CloudConf.CDN.domain);
}
