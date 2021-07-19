import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Team
}

const teamSchema = new Schema({
  name: String,
  manager: {type: Schema.Types.ObjectId, 'ref': "Profile"},
  players: [{type: Schema.Types.ObjectId, 'ref': "Player"}],
})

const Team = mongoose.model('Team', teamSchema)