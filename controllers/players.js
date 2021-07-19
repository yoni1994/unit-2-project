import { Player } from '../models/player.js'

export {
  index,
  create,
  show
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

function show(req, res) {
    Player.findById(req.params.id)
    .populate("profile")
    .then(player => {
      res.render('players/show', {
        player,
        title: "Player Details"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/players')
    })
}