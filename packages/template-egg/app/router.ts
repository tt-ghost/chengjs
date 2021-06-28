import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  app.passport.mount('github');

  router.get('/', controller.home.index);
  router.get('/user', controller.user.get);
  router.get('/user/:name', controller.user.getUserByName);
  router.post('/passport/login', controller.passport.login);
  router.get('/passport/logout', controller.passport.logout);
  router.put('/passport/register', controller.passport.register);
};
