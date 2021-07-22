import { Player } from '../models/player.js'



export {
  index,
  create,
  show,
  edit,
  update,
  deletePlayer as delete
}

function index(req, res) {
    Player.find({})
    .populate('teamPlayingFor')
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
    req.body.teamPlayingFor = "60f5bc1bb35b475b91432682"
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
    .populate('teamPlayingFor')
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

function edit(req, res) {
    Player.findById(req.params.id)
    .then(player => {
      res.render('players/edit', {
        player,
        title: "Edit Player"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/players')
    })
}

function update(req, res) {
    Player.findById(req.params.id)
    .then(player => {
      if (player.profile.equals(req.user.profile._id)) {
        player.update(req.body, {new: true})
        .then(()=> {
          res.redirect(`/players/${player._id}`)
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/players`)
    })
}

function deletePlayer(req, res) {
    Player.findById(req.params.id)
    .then(player => {
      if (player.profile.equals(req.user.profile._id)) {
        player.delete()
        .then(() => {
          res.redirect('/players')
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }   
    })
    .catch(err => {
      console.log(err)
      res.redirect('/players')
    })
}