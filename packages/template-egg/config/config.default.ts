import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624269580698_9333';

  // add your egg config in here
  config.middleware = [];

  // redis
  config.redis = {};

  config.security = {
    csrf: {
      enable: false,
    },
  }

  config.crypto = {
    secret: 'ksfSFF9f3SDF2-akjMLnfji03OJfIEjeuJnevqS'
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: '12345678',
    database: 'server_egg',
    timezone:  '+08:00'
  };

  // 参数校验
  config.validate = {
    // convert: false,
    // validateRoot: false,
    widelyUndefined:true
  };

  // config.notfound = {
  //   pageUrl: '/public/404.html'
  // }

  // github passport
  // detail: https://eggjs.org/zh-cn/tutorials/passport
  config.passportGithub = {
    key: '',
    secret: '',
    callbackURL: '/passport/github/callback'
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
