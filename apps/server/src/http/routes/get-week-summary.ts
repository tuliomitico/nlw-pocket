import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../functions/get-week-pending-goals";
import { getWeekSummary } from "../../functions/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (
  app,
  _opts
) => {
  app.get("/summary", async () => {
    const { summary } = await getWeekSummary();
    return { summary };
  });
};
