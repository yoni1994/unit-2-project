import { Player } from '../models/player.js'

export {
  index
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