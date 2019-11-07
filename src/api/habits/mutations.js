// All Habit Mutations
import Habits from "./habits"

export const habitsMutations = {
    Mutation: {
        async addHabit(_, { habit }) {
            try {
                const newHabit = await Habits.create({ ...habit })
                return newHabit
            } catch (err) {
                console.log(err)
            }
        },

        async addEvent(_, { habitId, date }) {
            try {
                date.setHours(0, 0, 0, 0)
                const habit = await Habits.findByIdAndUpdate(
                    {
                        _id: habitId,
                        'events.date': {
                            $ne: date
                        }
                    }, {
                        $addToSet: {
                            events: {
                                date
                            }
                        }
                    }
                )

                return habit
            } catch (err) {
                console.error(err)
            }
        },

        async removeEvent(_, { habitId, eventId }) {
            try {
                const habit = await Habits.findByIdAndUpdate(
                    {
                    _id: habitId
                    },
                    {
                        $pull: {
                            events: {
                                _id: eventId
                            }
                        }
                    }
                )
                return habit
            } catch (err) {
                console.error(err)
            }
        }
    }
}
