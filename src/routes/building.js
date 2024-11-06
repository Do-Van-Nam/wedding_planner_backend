const express = require('express')
const router = express.Router()
const { getBuildingsByOwnerId,getBuildingById, updateBuilding, deleteBuilding, createBuilding } = require('../app/controllers/BuildingController')
const managerAuthMiddleWare = require('../app/middlewares/managerAuthMiddleWare')

// router.get('/:id', getBuildingById)
router.get('/:ownerId',managerAuthMiddleWare, getBuildingsByOwnerId)
router.post('/', createBuilding)
router.put('/:id',managerAuthMiddleWare, updateBuilding)
router.delete('/:id',managerAuthMiddleWare, deleteBuilding)

module.exports = router