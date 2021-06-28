'use strict';

export default app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('authorization', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    uid: STRING(50),
    provider: STRING(50),
    display_name: STRING(50),
    photo: STRING(2000),
    access_token: STRING(512),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
