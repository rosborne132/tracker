import { Form, Field } from "@leveluptuts/fresh"
import Layout from "../src/components/Layout"

const Register = () => {
    const handleSubmit = data => {
        console.log(data)
    }

    return (
        <Layout>
            <div className="form">
                <div className="fieldset">
                    <h1>Register</h1>
                    <Form onSubmit={data => handleSubmit(data)}>
                        <Field>Username</Field>
                        <Field>Email</Field>
                        <Field>Password</Field>
                        <Field>Confirm Password</Field>
                    </Form>
                </div>
                <style jsx>{`
                    .form {
                        border: 2px solid #000;
                        border-radius: 10px;
                        padding: 30px;
                        width: 300px;
                        margin: 0 auto;
                        margin-top: 150px;
                    }

                    .fieldset {
                        width: 60%;
                        margin: 0 auto;
                    }
                `}
                </style>
            </div>
        </Layout>
    )
}

export default Register