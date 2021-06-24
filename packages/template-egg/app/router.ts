import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/user', controller.user.get);
  router.put('/auth/login', controller.auth.login);
  router.get('/auth/logout', controller.auth.logout);
  router.put('/auth/register', controller.auth.register);
};
