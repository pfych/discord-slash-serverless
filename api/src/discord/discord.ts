import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { authorise } from './utils/auth';
import { DiscordPing } from './ping/ping';
import { newLogger } from './utils/logger';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  const logger = newLogger('Discord Handler');

  try {
    /* Handle Auth & Security */
    if (!authorise(event)) {
      logger.info('Authorisation failed');
      callback(null, { statusCode: 401, body: JSON.stringify('Not authorised') });
      return;
    }

    logger.info('Authorisation success');
    logger.log('verbose', event);

    if (DiscordPing(event, context, callback)) {
      logger.info('Received Discord ping');
      return;
    }

    logger.info(`Received command\n${JSON.stringify(event.body)}`);
  } catch (err) {
    logger.error(err);

    throw new Error(err);
  }
};
