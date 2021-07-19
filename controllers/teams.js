import { Team } from '../models/team.js'

export {
  index
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