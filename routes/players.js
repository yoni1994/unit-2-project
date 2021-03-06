import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as playersCtrl from '../controllers/players.js'

export {
  router
}

const router = Router()


router.get('/', playersCtrl.index)
router.get('/:id', playersCtrl.show)
router.post('/', isLoggedIn, playersCtrl.create)
router.get('/:id/edit', isLoggedIn, playersCtrl.edit)
router.put('/:id', isLoggedIn, playersCtrl.update)
router.delete('/:id', isLoggedIn, playersCtrl.delete)
