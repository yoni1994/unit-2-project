import { Player } from '../models/player.js'

export {
  index
}

function index(req, res) {
    Player.find({})
  .then(players => {
    res.render('stats/index', {
        players,
		title: "Stats"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })

}