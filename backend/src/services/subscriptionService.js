import prisma from './prismaClient.js';

export const findSubscriptionsByEvent = async (event) => {
  return await prisma.webhookSubscription.findMany({
    where: { event },
  });
};
