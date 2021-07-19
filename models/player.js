import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Player
}

const playerSchema = new Schema({
  name: String,
  height: String,
  position: String,
  teamPlayingFor: {type: Schema.Types.ObjectId, 'ref': "Team"},
  profile: {type: Schema.Types.ObjectId, 'ref': "Profile"},
})

const Player = mongoose.model('Player', playerSchema)