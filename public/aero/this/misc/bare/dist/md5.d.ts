/**
 * Calculates MD5 value for a given string.
 * If a key is provided, calculates the HMAC-MD5 value.
 * Returns a Hex encoded string unless the raw argument is given.
 *
 * @param string Input string
 * @param key HMAC key
 * @param raw Raw output switch
 * @returns MD5 output
 */
export default function md5(string: string, key?: string, raw?: boolean): string;
