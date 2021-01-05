import { Segment } from 'aws-xray-sdk-core';
import { APIGatewayEvent, Context } from 'aws-lambda';

export const discord = async (
    event: APIGatewayEvent,
    context: Context,
): Promise<void> => {
    const segment = new Segment('ping.pong', context.awsRequestId);
    try {
        context.done(undefined, 'Pong!');
    } catch (err) {
        segment.addError(err);
        throw new Error(err);
    } finally {
        segment.close();
    }
};
