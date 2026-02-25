import express from 'express';
import { body, param } from 'express-validator';
import {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense,
} from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.use(protect);

const addValidation = [
    body('trip').isMongoId().withMessage('Valid trip ID required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('amount').isFloat({ min: 0 }).withMessage('Valid amount required'),
    body('category')
        .optional()
        .isIn([
            'food',
            'transport',
            'accommodation',
            'activities',
            'shopping',
            'flights',
            'other',
        ]),
];

router
    .route('/')
    .get(getExpenses)
    .post(addValidation, validate, addExpense);

router
    .route('/:id')
    .put(
        param('id').isMongoId(),
        body('amount').optional().isFloat({ min: 0 }),
        validate,
        updateExpense
    )
    .delete(param('id').isMongoId(), validate, deleteExpense);

export default router;
