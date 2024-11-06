const express = require('express')
const router = express.Router()
const { getGuestByAccId,getGuestById, updateGuest, deleteGuest, createGuest } = require('../app/controllers/GuestController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')
const {authMiddleware} = require('../app/middlewares/authMiddleware')

// router.get('/:id', getGuestById)
router.get('/:accId',getGuestByAccId)
router.post('/:accId', createGuest)
router.put('/:id', updateGuest)
router.delete('/:id', deleteGuest)

module.exports = router