import { Router } from "express";
import { createJournal, getMyJournals } from "../controllers/journalController";
import { validate } from "../middlewares/validate";
import { createJournalSchema } from "../validations/journalValidation";
import auth from "../middlewares/auth-middleware";

const router = Router();

router.post("/", auth, validate(createJournalSchema), createJournal);
router.get("/", auth, getMyJournals);

export default router;
