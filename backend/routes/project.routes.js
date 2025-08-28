import {Router} from 'express';
import {body} from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';



const router = Router();


router.post('/create',
    authMiddleware.authUser,
    body('name').isString().withMessage('Name is Required'),
    projectController.createProject
);

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProjects
)


router.put(
  '/add-user',
  authMiddleware.authUser,
  body('projectId')
    .isString()
    .withMessage('Project ID is required'),
  body('users')
    .isArray({ min: 1 })
    .withMessage('At least one user is required')
    .bail()
    .custom((users) => {
      if (!users.every(user => typeof user === 'string')) {
        throw new Error('All users must be strings');
      }
      return true;
    }),
  projectController.addUserToProject
);

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
)



export default router;