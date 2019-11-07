import mongoose from 'mongoose'

const connectDB = handler => async (req, res) => {
    try {
        if (mongoose.connections[0].readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        }
        return handler(req, res)
    } catch (err) {
        console.error(err)
    }
}

const db = mongoose.connection
db.once('open', () => {
    console.log("Local DB Connected!")
})

export default connectDB
