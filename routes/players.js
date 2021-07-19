import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as playersCtrl from '../controllers/players.js'

export {
  router
}

const router = Router()


router.get('/', playersCtrl.index)

router.post('/', isLoggedIn, playersCtrl.create)