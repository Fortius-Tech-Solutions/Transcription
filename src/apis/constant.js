const userPrefix = "/user";
const hospitalPrefix = "/hospital";


export const USER = {
  LIST: userPrefix,
  SAVE: userPrefix,
  UPDATE: `${userPrefix}/:id`,
  SHOW: `${userPrefix}/:id`,
  DELETE: `${userPrefix}/:id`,
};

export const HOSPITAL = {
  LIST: hospitalPrefix,
  SAVE: hospitalPrefix,
  UPDATE: `${hospitalPrefix}/:id`,
  SHOW: `${hospitalPrefix}/:id`,
  DELETE: `${hospitalPrefix}/:id`,
};

