import { Player } from '../models/player.js'

export {
  index,
  create
}

function index(req, res) {
    Player.find({})
    .then(players => {
      res.render('players/index', {
        players,
        title: "Players"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/players")
    })
}

function create(req, res) {
    req.body.profile = req.user.profile
    Player.create(req.body)
    .then(player => {
      res.redirect('/players')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/players')
    })
}