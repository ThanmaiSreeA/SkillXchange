//import { createSkill } from '../controllers/skillController.js';

import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
  getAllSkills,
  getMySkills,
  deleteSkill,
  updateSkill,
  createSkill,
} from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills); // public
router.get('/mine', verifyToken, getMySkills); // private
router.post('/', verifyToken, createSkill); // private
router.delete('/:id', verifyToken, deleteSkill); // private
router.put('/:id', verifyToken, updateSkill); // private

export default router;

