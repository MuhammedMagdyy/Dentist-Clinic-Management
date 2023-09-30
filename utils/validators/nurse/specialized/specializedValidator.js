const { check } = require('express-validator');
const {
  validationMiddleWare,
} = require('../../../../middlewares/is-validator');

exports.getSpecializedValidator = [
  check('id').isInt().withMessage('Specialized ID must be an integer.'),
  validationMiddleWare,
];

exports.addSpecializedValidator = [
  check('examination')
    .notEmpty()
    .withMessage('Examination must not be empty.')
    .trim(),
  check('diagnosis')
    .notEmpty()
    .withMessage('Diagnosis must not be empty.')
    .trim(),
  check('radiographicExam')
    .notEmpty()
    .withMessage('Radiographic Exam must not be empty.')
    .trim(),
  check('treatment')
    .notEmpty()
    .withMessage('Treatment must not be empty.')
    .trim(),
  check('treatmentPlan')
    .notEmpty()
    .withMessage('Treatment Plan must not be empty.')
    .trim(),
  validationMiddleWare,
];

exports.updateSpecializedValidator = [
  check('id').isInt().withMessage('Specialized ID must be an integer.'),
  check('examination')
    .optional()
    .trim(),
  check('diagnosis')
    .optional()
    .trim(),
  check('radiographicExam')
    .optional()
    .trim(),
  check('treatment')
    .optional()
    .trim(),
  check('treatmentPlan')
    .optional()
    .trim(),
  validationMiddleWare,
];

exports.deleteSpecializedValidator = [
  check('id').isInt().withMessage('Specialized ID must be an integer.'),
  validationMiddleWare,
];
