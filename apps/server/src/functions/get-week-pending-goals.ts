import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { lte, count, gte, and } from "drizzle-orm";


export async function getWeekPendingGoals() {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
	const lastDayofWeek = dayjs().endOf('week').toDate()

    const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
        db.select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            createdAt: goals.createdAt
        }).from(goals).where(lte(
            goals.createdAt, lastDayofWeek
        ))
    )

    const goalCompletionCounts = db.$with('goal_completion_counts').as(
        db.select({
            goalId: goalCompletions.goalId,
            completionCount: count(goalCompletions.id)
         }).from(goalCompletions)
                .where(and(lte(
                    goalCompletions.createdAt, lastDayofWeek
                ),gte(goalCompletions.createdAt, firstDayOfWeek))).groupBy(goalCompletions.goalId)
            )                


	const pendingGoals = await db.with(goalsCreatedUpToWeek, goalCompletionCounts).select().from(goalsCreatedUpToWeek)

	return { pendingGoals}
}
