import nacl from 'tweetnacl';
import { APIGatewayEvent } from 'aws-lambda';
import { concatUint8Arrays, valueToUint8Array } from './uint8';

/* Implementation of Discord auth */
const PUBLIC_KEY = '4db02e30a8ce38b79795864ecf9343344d763fee9dd616e02df4110a056a7a29'; // MOVE TO KMS
export const authorise = (event: APIGatewayEvent): boolean => {
  try {
    const { headers, body } = event;

    const signature = headers['x-signature-ed25519'] as string;
    const timestamp = headers['x-signature-timestamp'] as string;

    if (!body && !signature && !timestamp) {
      return false;
    }

    console.log(event);

    const timestampData = valueToUint8Array(timestamp);
    const bodyData = valueToUint8Array(body as string);
    const message = concatUint8Arrays(timestampData, bodyData);

    console.info('Auth Credentials Exist');

    const signatureData = valueToUint8Array(signature, 'hex');
    const publicKeyData = valueToUint8Array(PUBLIC_KEY, 'hex');
    return nacl.sign.detached.verify(message, signatureData, publicKeyData);
  } catch (err) {
    console.error(err);

    return false;
  }
};
