import { ActivityType, VisualState } from "@prisma/client";

export interface CreatePetRequest {
  name: string;
}

export interface UpdatePetRequest {
  name?: string;
}

export interface PetResponse {
  id: number;
  name: string;
  healthScore: number;
  happinessScore: number;
  visualState: VisualState;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateActivityRequest {
  activityType: ActivityType;
  description: string;
}

export interface ActivityResponse {
  id: number;
  activityType: ActivityType;
  description: string;
  createdAt: Date;
}