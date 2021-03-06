/* eslint-disable @typescript-eslint/no-var-requires */
const { application: devBucket } = require("../../ciri_config/.ciri-upload.config.js");
const { application: debugBucket } = require("../../ciri_config/.ciri-upload.debug.config.js");
const { application: prodBucket } = require("../../ciri_config/.ciri-upload.prod.config.js");
const  storage  =  require('../utils/storage.js').default
const production = {
  api: "https://tb-gateway.enbrands.com/hd",
  apiMerchants: storage.get('domain'),
  cdnBucket: prodBucket,
  get cdnBucketPath() {
    return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
  }
};

const dev = {
  api: "https://ab.tb-test-k8s.enbrands.com/hd" || "https://b.tb-test-k8s.enbrands.com",
  apiMerchants: "https://ab.tb-test-k8s.enbrands.com/crm" || "https://tb-testphp1.enbrands.com",
  cdnBucket: devBucket,
  get cdnBucketPath() {
    return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
  }
};
// const test = {
//   api: "6",
//   cdnBucket: debugBucket, // 公用测试bucket
//   get cdnBucketPath() {
//     return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
//   }
// };
const test = {
  api: "https://ab.tb-test-k8s.enbrands.com/hd" || "https://b.tb-test-k8s.enbrands.com",
  apiMerchants: "https://ab.tb-test-k8s.enbrands.com/crm" || "https://tb-testphp1.enbrands.com",
  cdnBucket: devBucket,
  get cdnBucketPath() {
    return `https://biv.oss-cn-hangzhou.aliyuncs.com/${this.cdnBucket}/dist/`;
  }
}
module.exports = (env => {
  let config;
  switch (env) {
    case "development": {
      config = dev;
      break;
    }
    case "test": {
      config = test;
      break;
    }
    case "debug": {
      config = production;
      break;
    }
    case "production": {
      config = production;
      break;
    }
    default: {
      config = dev;
      break;
    }
  }
  return config;
})(process.env.VUE_APP_ENV);
