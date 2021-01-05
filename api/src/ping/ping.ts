import { APIGatewayEvent, Context } from 'aws-lambda';

export const pong = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<void> => {
  try {
    context.done(undefined, 'Pong!');
  } catch (err) {
    console.error(err);

    throw new Error(err);
  }
};
