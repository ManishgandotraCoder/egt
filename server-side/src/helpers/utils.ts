import * as bcrypt from 'bcrypt';
import { configuration } from '../config';

export function encryptPassword(password) {
  return bcrypt.hash(password, configuration.SALT_ROUNDS);
}
