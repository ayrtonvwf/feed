import { factory } from "ulid";

const prng = () => {
  /**
   * @see https://github.com/ulid/javascript/blob/a5831206a11636c94d4657b9e1a1354c529ee4e9/lib/index.ts#L126-L130
   */
  const buffer = new Uint8Array(1);
  crypto.getRandomValues(buffer);
  return buffer[0] / 0xff;
};

/**
 * ulid thinks it's running in node, but Cloudflare Workers exposes the crypto browser API instead.
 * @see https://github.com/ulid/javascript#use-your-own-prng
 */
export const ulid = factory(prng);
