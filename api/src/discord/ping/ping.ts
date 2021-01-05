import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { Interaction } from '../utils/discord-types';

/* Discord requires a ping event */
export const DiscordPing = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const { body } = event;

  if (!body) {
    throw new Error('No body present');
  }

  const interaction: Interaction = JSON.parse(body);

  if (interaction.type === 1) {
    callback(null, { statusCode: 200, body: JSON.stringify({ type: 1 }) });
    return true;
  }

  return false;
};
