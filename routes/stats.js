import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as statsCtrl from '../controllers/stats.js'

export {
  router
}

const router = Router()


router.get('/', isLoggedIn, statsCtrl.index)