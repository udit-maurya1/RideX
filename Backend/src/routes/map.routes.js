const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');

router.get(
  '/get-coordinates',
  query('address').isString().isLength({ min: 3 }).withMessage('Address is required and must be at least 3 characters'),
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  '/get-distance-time',
  query('origin').isString().isLength({ min: 3 }).withMessage('Origin address is required and must be at least 3 characters'),
  query('destination').isString().isLength({ min: 3 }).withMessage('Destination address is required and must be at least 3 characters'),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

router.get(
  '/get-suggestions',
  query('input').isString().isLength({ min: 1 }).withMessage('Input search query is required'),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
