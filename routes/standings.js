import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as standingsCtrl from '../controllers/standings.js'

export {
  router
}

const router = Router()

router.get('/', isLoggedIn, standingsCtrl.index)