const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    external_id: String,
    picture_url: String,
    email: String,
    email_verified: Boolean,
    google_login: Boolean,
    facebook_login: Boolean,
    local_login: Boolean,
})

const User = mongoose.model('User',userSchema)

module.exports = User