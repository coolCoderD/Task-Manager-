import React from 'react';
import Layout from './Layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Register = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const togglePassword = () => setShowPassword(!showPassword);

    const handlerUserInput = (type) => (e) => {
        if (type === 'name') setName(e.target.value);
        if (type === 'email') setEmail(e.target.value);
        if (type === 'password') setPassword(e.target.value);
    };

    const registerUser = (e) => {
        e.preventDefault();
        // Your registration logic here
        console.log("Registering user:", { name, email, password });
    };

    return (
        <Layout>
        <form className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]" onSubmit={registerUser}>
            <div className="relative z-10">
                <h1 className="mb-2 text-center text-[1.35rem] font-medium">
                    Register for an Account
                </h1>
                <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
                    Create an account. Already have an account?{" "}
                    <a
                        href="/login"
                        className="font-bold text-purple-500 hover:text-[#7263F3] transition-all duration-300"
                    >
                        Login here
                    </a>
                </p>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 text-[#999]">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handlerUserInput("name")}
                        name="name"
                        className="px-4 py-3 border-[2px] rounded-md outline-purple-500 text-gray-800"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mt-[1rem] flex flex-col">
                    <label htmlFor="email" className="mb-1 text-[#999]">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handlerUserInput("email")}
                        name="email"
                        className="px-4 py-3 border-[2px] rounded-md outline-purple-500 text-gray-800"
                        placeholder="johndoe@gmail.com"
                    />
                </div>
                <div className="relative mt-[1rem] flex flex-col">
                    <label htmlFor="password" className="mb-1 text-[#999]">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlerUserInput("password")}
                        name="password"
                        className="px-4 py-3 border-[2px] rounded-md outline-purple-500 text-gray-800"
                        placeholder="***************"
                    />
                    <button
                        type="button"
                        className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
                        onClick={togglePassword}
                    >
                {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                    <FontAwesomeIcon icon={faEye} />
                )}
                    </button>
                </div>

                <div className="flex">
                    <button
                        type="submit"
                        disabled={!name || !email || !password}
                        className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-purple-500 text-white rounded-md hover:bg-purple-900 transition-colors"
                    >
                        Register Now
                    </button>
                </div>
            </div>

        </form>
        </Layout>
    );
};

export default Register;
