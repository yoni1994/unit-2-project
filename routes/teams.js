import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as teamsCtrl from '../controllers/teams.js'


export {
  router
}

const router = Router()

router.get('/', teamsCtrl.index)
router.get('/:id', teamsCtrl.show)
router.get('/:id/edit', isLoggedIn, teamsCtrl.edit)
router.put('/:id', isLoggedIn, teamsCtrl.update)
router.post('/', isLoggedIn, teamsCtrl.create)
router.post("/:id", isLoggedIn, teamsCtrl.addToTeam)
router.delete('/:id', isLoggedIn, teamsCtrl.delete)