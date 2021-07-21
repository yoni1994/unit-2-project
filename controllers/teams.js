import { Team } from '../models/team.js'
import { Player } from '../models/player.js'


export {
  index,
  create,
  show,
  edit,
  update,
  deleteTeam as delete,
  addToTeam
}

function index(req, res) {
    Team.find({})
    .then(teams => {
      res.render('teams/index', {
        teams,
        title: "Teams"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/teams")
    })
}

function create(req, res) {
    req.body.manager = req.user.profile
    Team.create(req.body)
    .then(team => {
      res.redirect('/teams')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/teams')
    })
}

function show(req, res) {
    Team.findById(req.params.id)
    .populate("manager")
    .populate('players')
    .then(function(team) {
      Player.find({_id: {$nin: team.players}}, function(err, players) {
      res.render('teams/show', {
        team,
        players,
        title: "Team Details"
      })
    })
  })
    .catch(err => {
      console.log(err)
      res.redirect('/teams')
    })
  }


function edit(req, res) {
    Team.findById(req.params.id)
    .then(team => {
      res.render('teams/edit', {
        team,
        title: "Edit Team"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/teams')
    })
}

function update(req, res) {
    Team.findById(req.params.id)
    .then(team => {
      if (team.manager.equals(req.user.profile._id)) {
        team.update(req.body, {new: true})
        .then(()=> {
          res.redirect(`/teams/${team._id}`)
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/teams`)
    })
}

function deleteTeam(req, res) {
    Team.findById(req.params.id)
    .then(team => {
      if (team.manager.equals(req.user.profile._id)) {
        team.delete()
        .then(() => {
          res.redirect('/teams')
        })
      } else {
        throw new Error ('🚫 Not authorized 🚫')
      }   
    })
    .catch(err => {
      console.log(err)
      res.redirect('/teams')
    })
}

function addToTeam(req, res) {
  Team.findById(req.params.id)
  .then(team => {
    team.players.push(req.body.playerId)
    team.save(function(err) {
      res.redirect(`/teams/${team._id}`)
    })
  })
}