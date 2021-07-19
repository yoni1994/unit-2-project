import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as teamsCtrl from '../controllers/teams.js'


export {
  router
}

const router = Router()

router.get('/', teamsCtrl.index)
router.get('/:id', teamsCtrl.show)
router.post('/', isLoggedIn, teamsCtrl.create)