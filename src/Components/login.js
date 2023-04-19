import React, { useState } from 'react';
import axios from '../Axios/AxiosInstance';

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');

        const csrfToken = response.data.csrf_token;

        const loginResponse = await axios.post('http://localhost:8000/api/login', {
            email: 'Nimesha@gmail.com',
            password: '1234',
        }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });

        console.log(loginResponse.data);
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}


