import { Team } from '../models/team.js'

export {
  index,
  create,
  show
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