"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(login, initialState);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-neutral-50">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-1">Admin Login</h1>
                <p className="text-sm text-neutral-500 text-center mb-6">
                    Sign in to manage the portfolio content.
                </p>

                <form action={formAction} className="flex flex-col gap-4">
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        autoComplete="username"
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        autoComplete="current-password"
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {state.error && (
                        <p className="text-sm text-red-600" role="alert">
                            {state.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={pending}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                    >
                        {pending ? "Signing in…" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
