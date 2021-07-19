import { Team } from '../models/team.js'

export {
  index,
  create,
  show,
  edit,
  update,
  deleteTeam as delete
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
    .then(team => {
      res.render('teams/show', {
        team,
        title: "Team Details"
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