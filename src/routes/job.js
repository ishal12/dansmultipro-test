const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/jwt');

const jobController = require('../controller/job.controller');

router.get('/', authenticate, jobController.jobList);
router.get('/:id', authenticate, jobController.jobDetail);

module.exports = router;
