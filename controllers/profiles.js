import { Profile } from '../models/profile.js'
import { Player } from '../models/player.js'
import { Team } from '../models/team.js'


export {
  index,
  show
}

function index(req, res) {
    Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
        profiles,
		title: "Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile}`)
  })
}

function show(req, res) {
    Profile.findById(req.params.id)
    .then((profile) => {
      Profile.findById(req.user.profile._id)
      .then(self => {
        const isSelf = self._id.equals(profile._id)
        Team.find({})
        .populate('manager')
        .then(teams => {
            Player.find({})
            .populate('profile')
            .then(players => {
                res.render("profiles/show", {
                title: `${profile.name}'s profile`,
                teams,
                players,
                profile,
                self,
                isSelf,
                })
            })
        })
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect("/")
    })
}