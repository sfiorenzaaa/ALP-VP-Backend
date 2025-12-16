import express from "express";
import { PetController } from "../controllers/pet-controller";
import { validate } from "../middlewares/validate";
import { createPetSchema, updatePetSchema, createActivitySchema } from "../validations/pet-validation";

const router = express.Router();

router.post("/", validate(createPetSchema), PetController.createPet);
router.get("/", PetController.getPet);
router.put("/", validate(updatePetSchema), PetController.updatePet);

router.post("/activities", PetController.logActivity);
router.get("/activities", PetController.getActivities);

export default router;