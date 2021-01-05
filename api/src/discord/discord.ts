import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { authorise } from './utils/auth';
import { DiscordPing } from './ping/ping';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  try {
    /* Handle Auth & Security */
    if (!authorise(event)) {
      console.info('Authorisation failed');
      callback(null, { statusCode: 401, body: JSON.stringify('Not authorised') });
      return;
    }

    console.info('Authorisation success');
    console.log(event);

    if (DiscordPing(event, context, callback)) {
      console.info('Received Discord ping');
      return;
    }

    console.info('Received command');
  } catch (err) {
    console.error(err);

    throw new Error(err);
  }
};
