import { Team } from '../models/team.js'

export {
  index,
  create
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