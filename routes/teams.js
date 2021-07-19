import { Router } from 'express'
import * as teamsCtrl from '../controllers/teams.js'


export {
  router
}

const router = Router()

router.get('/', teamsCtrl.index)