const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { isRole }  = require('../middleware/roleMiddlewares');
const { createRole, getAllRoles  } = require('../controllers/roleController');

router.post('/create', verifyToken, isRole(['Admin']), createRole);
router.get('/', verifyToken, isRole(['Admin']), getAllRoles);

module.exports = router;
