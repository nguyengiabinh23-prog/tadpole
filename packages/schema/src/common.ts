import * as f from './factories.js';

export const regex = f.string().test((v) => {
  try {
    new RegExp(v);
    return true;
  } catch {
    return false;
  }
}, 'Value is not a valid regular expression');
