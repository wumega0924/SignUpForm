import { useState } from "react";

const API_URL = "https://fsa-jwt-practice.herokuapp.com/signup"

function SignUpForm({ setToken }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState(null);

async function handleSubmit(event) {
        event.preventDefault();
        // console.log("testing");

        if (username.length !== 8) {
            setError("Username must have eight characters");
            return;
        }

        try {
        const response = await fetch (API_URL, {
            method: "POST", 
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password, 
            })
        });
        
    const result = await response.json();

    console.log("Signup Result: ", result);
        setToken(result.token);
        setSuccessMessage(result.message);
        setUsername("");
        setPassword("");
      } catch (error) {
        setError(error.message);
      }
    }

    return (
        <div>
            <h2>Sign Up</h2>
                {successMessage && <p>{successMessage}</p>}
                {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label>
                    Password:{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default SignUpForm