import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { passportGithub } from '../../../../config'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624269580698_9333';

  // add your egg config in here
  config.middleware = [];

  // redis
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
    agent: true
  };

  
  config.sessionRedis = {};

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
    database: 'template_egg',
    timezone:  '+08:00',
    define: {
      freezeTableName: true, // 冻结表名，防止建表时表名修改为复数形式
      underscored: false, // 防止驼峰式字段被转为下划线
      timestamps: false
    }
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
  config.passportGithub = passportGithub;

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
