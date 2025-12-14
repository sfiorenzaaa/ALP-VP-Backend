import prisma from "../config/prisma";
import { CreatePetRequest, UpdatePetRequest, CreateActivityRequest, PetResponse, ActivityResponse } from "../models/pet-model";
import { PetAlreadyExistsError, PetNotFoundError } from "../error/pet-error";
import { updatePetScores } from "../utils/pet-util";
import { ActivityType } from "@prisma/client";

export class PetService {
  static async createPet(userId: number, request: CreatePetRequest): Promise<PetResponse> {
    const existingPet = await prisma.pet.findUnique({
      where: { userId }
    });

    if (existingPet) {
      throw new PetAlreadyExistsError();
    }

    const pet = await prisma.pet.create({
      data: {
        userId,
        name: request.name
      }
    });

    return pet;
  }

  static async getPet(userId: number): Promise<PetResponse> {
    const pet = await prisma.pet.findUnique({
      where: { userId }
    });

    if (!pet) {
      throw new PetNotFoundError();
    }

    return pet;
  }

  static async updatePet(userId: number, request: UpdatePetRequest): Promise<PetResponse> {
    const pet = await prisma.pet.findUnique({
      where: { userId }
    });

    if (!pet) {
      throw new PetNotFoundError();
    }

    const updatedPet = await prisma.pet.update({
      where: { userId },
      data: request
    });

    return updatedPet;
  }

  static async logActivity(userId: number, request: CreateActivityRequest): Promise<ActivityResponse> {
    const pet = await prisma.pet.findUnique({
      where: { userId }
    });

    if (!pet) {
      throw new PetNotFoundError();
    }

    // Log activity
    const activity = await prisma.userActivityLog.create({
      data: {
        userId,
        activityType: request.activityType,
        description: request.description
      }
    });

    // Update pet scores
    const newScores = updatePetScores(pet.healthScore, pet.happinessScore, request.activityType);
    
    await prisma.pet.update({
      where: { userId },
      data: newScores
    });

    return activity;
  }

  static async getActivities(userId: number): Promise<ActivityResponse[]> {
    const activities = await prisma.userActivityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return activities;
  }
}