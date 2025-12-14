import { Request, Response, NextFunction } from "express";
import { PetService } from "../services/pet-service";
import { CreatePetRequest, UpdatePetRequest, CreateActivityRequest } from "../models/pet-model";

export class PetController {
  static async createPet(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const request: CreatePetRequest = req.body;
      
      const pet = await PetService.createPet(userId, request);
      
      res.status(201).json({
        status: "success",
        message: "Pet created successfully",
        data: pet
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPet(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      
      const pet = await PetService.getPet(userId);
      
      res.status(200).json({
        status: "success",
        data: pet
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePet(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const request: UpdatePetRequest = req.body;
      
      const pet = await PetService.updatePet(userId, request);
      
      res.status(200).json({
        status: "success",
        message: "Pet updated successfully",
        data: pet
      });
    } catch (error) {
      next(error);
    }
  }

  static async logActivity(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const request: CreateActivityRequest = req.body;
      
      const activity = await PetService.logActivity(userId, request);
      
      res.status(201).json({
        status: "success",
        message: "Activity logged successfully",
        data: activity
      });
    } catch (error) {
      next(error);
    }
  }

  static async getActivities(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      
      const activities = await PetService.getActivities(userId);
      
      res.status(200).json({
        status: "success",
        data: activities
      });
    } catch (error) {
      next(error);
    }
  }
}