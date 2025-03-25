import { Router } from 'express';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginSchema, registerSchema } from '../validation/user.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.post('/refresh', ctrlWrapper(refreshController));

router.post('/login', validateBody(loginSchema), ctrlWrapper(loginController));

router.post('/logout', ctrlWrapper(logoutController));

export default router;
