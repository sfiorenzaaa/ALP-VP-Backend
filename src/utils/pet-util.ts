import { VisualState, ActivityType } from "@prisma/client";

export const calculateVisualState = (healthScore: number, happinessScore: number): VisualState => {
  if (healthScore < 30) return VisualState.SICK;
  if (happinessScore < 30) return VisualState.SAD;
  if (healthScore < 50 && happinessScore < 50) return VisualState.THIN;
  return VisualState.HAPPY;
};

export const updatePetScores = (currentHealth: number, currentHappiness: number, activityType: ActivityType) => {
  let newHealth = currentHealth;
  let newHappiness = currentHappiness;

  if (activityType === ActivityType.WORK_TASK) {
    newHealth = Math.max(0, currentHealth - 5);
  } else if (activityType === ActivityType.REST_MEANINGFUL) {
    newHappiness = Math.min(100, currentHappiness + 10);
    newHealth = Math.min(100, currentHealth + 2);
  }

  return {
    healthScore: newHealth,
    happinessScore: newHappiness,
    visualState: calculateVisualState(newHealth, newHappiness)
  };
};