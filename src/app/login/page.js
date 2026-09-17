"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username,password})
            })

            if (res.ok) {
                router.push("/dashboard");
            } else {
                const data = await res.json();
                setError(data.message || "Username hoac password khong chinh xac")
            }
        } catch (error) {
            setError("Da co loi xay ra. Vui long thu lai")
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <br/>
                <label>Password: </label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <br/>
                <button type="submit">Login</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}
