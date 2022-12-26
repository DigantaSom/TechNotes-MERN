const express = require('express');

const verifyJWT = require('../middleware/verifyJWT');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.use(verifyJWT);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
