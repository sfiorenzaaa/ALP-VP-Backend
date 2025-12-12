import { Router } from "express";
import { createJournal, getMyJournals } from "../controllers/journalController";
import { validate } from "../middleware/validate";
import { createJournalSchema } from "../validation/journalValidation";
import auth from "../middleware/authMiddleware";

const router = Router();

router.post("/", auth, validate(createJournalSchema), createJournal);
router.get("/", auth, getMyJournals);

export default router;
