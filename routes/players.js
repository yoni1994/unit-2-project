import { Router } from 'express'
import * as playersCtrl from '../controllers/players.js'

export {
  router
}

const router = Router()


router.get('/', playersCtrl.index)