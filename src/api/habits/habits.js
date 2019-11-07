// Database Collection
import mongoose, { Schema } from "mongoose"

export const EventsSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    }
})

// ID is part of the schema by default
export const HabitsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    events: [EventsSchema]
})

export default mongoose.models.habits || mongoose.model('habits', HabitsSchema)
