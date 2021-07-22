import { Team } from '../models/team.js'
import { Player } from '../models/player.js'


export {
  index,
  create,
  show,
  edit,
  update,
  deleteTeam as delete,
  addToTeam,
  removeFromTeam
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
  console.log('test add')
  Team.findById(req.params.id)
  .then(team => {
    Player.findById(req.body.playerId) 
    .then(player => {
      player.teamPlayingFor = team._id
      player.save()
      team.players.push(req.body.playerId)
      team.save(function(err) {
        res.redirect(`/teams/${team._id}`)
      })
    })
  })
}


function removeFromTeam(req, res) {
  console.log('test remove')
  Team.findById(req.params.id)
  .then(team => {
    Player.findById(req.body.teamPlayerId) 
    .then(player => {
      player.teamPlayingFor = "60f5bc1bb35b475b91432682"
      player.save()
      let i = team.players.indexOf(req.body.teamPlayerId)
      // let playerLength = req.body.teamPlayerId.toString()
      // console.log(playerLength)
      team.players.splice(i, 1)
      // team.players.pop(req.body.teamPlayerId)
      team.save(function(err) {
        res.redirect(`/teams/${team._id}`)
      })
    })
  })
}