const express = require('express')
const router = express.Router()
const {getVendorItemByPlanGroupByType,createManyVendorItems,getVendorItemByType, getVendorItemsByAccId,getVendorItemById, updateVendorItem, deleteVendorItem, createVendorItem } = require('../app/controllers/VendorItemController')
const {managerAuthMiddleware} = require('../app/middlewares/managerAuthMiddleware')

router.get('/id/:id', getVendorItemById)
router.get('/type/:type', getVendorItemByType)
router.get('/getVendorItemGroupedByType/accId/:accId', getVendorItemByPlanGroupByType)
router.get('/accId/:accId',managerAuthMiddleware, getVendorItemsByAccId)
router.put('/:id',managerAuthMiddleware, updateVendorItem)
router.delete('/:id',managerAuthMiddleware, deleteVendorItem)
router.post('/', createVendorItem)
 router.post('/addManyVendorItems', createManyVendorItems)

module.exports = router