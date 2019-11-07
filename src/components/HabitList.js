import Habit from "./Habit"
import { useQuery } from "@apollo/react-hooks"
import gql from 'graphql-tag'

const GET_HABITS = gql`
    query getHabits {
        habits {
            _id
            name
            events {
                _id
                date
            }
        }
    }
`

const HabitList = () => {
    const { data, loading, error } = useQuery(GET_HABITS)

    if (loading) return <div className="loading">Loading...</div>
    if (error) {
        console.log(error) // Check network tab for error
        return <section />
    }

    const { habits } = data

    return (
        <section>
            <h2>My Habits</h2>

            { habits.map((habit, index) => (
                <Habit key={habit._id} habit={habit} index={index} />
            )) }
        </section>
    )
}

export default HabitList
