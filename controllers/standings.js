import { Team } from '../models/team.js'

export {
  index
}

function index(req, res) {
    Team.find({})
  .then(teams => {
    res.render('standings/index', {
        teams,
		title: "Standings"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}