import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  // 参数校验
  // valparams : {
  //   enable : true,
  //   package: 'egg-valparams'
  // },

  // mysql
  mysql : {
    enable : true,
    package: 'egg-mysql'
  },

  // ORM
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // 参数校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  // passport
  passport: {
    enable: true,
    package: 'egg-passport',
  },

  // github passport
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
};

export default plugin;
