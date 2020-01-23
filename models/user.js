const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    google_id: String,
    picture_url: String
})

const User = mongoose.model('User',userSchema)

module.exports = User