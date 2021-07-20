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
        req.body.tasty = !!req.body.tasty
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