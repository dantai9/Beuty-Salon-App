import crypto from 'crypto';

const HASH_ITERATIONS = 100_000;
const HASH_KEYLEN = 64;
const HASH_DIGEST = 'sha512';

export const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const derivedKey = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, HASH_KEYLEN, HASH_DIGEST)
    .toString('hex');
  return `${salt}:${derivedKey}`;
};

export const comparePassword = (password, storedHash) => {
  if (!storedHash) return false;
  const [salt, originalHash] = storedHash.split(':');
  const hashToCompare = hashPassword(password, salt).split(':')[1];
  return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(hashToCompare, 'hex'));
};
