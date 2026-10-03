"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 relative overflow-hidden">
      {/* Soft decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl"
      />

      <div className="w-full max-w-sm relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg shadow-indigo-600/20">
            A
          </div>
          <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-neutral-500 mt-1 text-center">
            Sign in to manage your portfolio content.
          </p>
        </div>

        <form
          action={formAction}
          className="flex flex-col gap-4 bg-white border border-neutral-200/80 rounded-2xl p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
        >
          <div>
            <label className="text-xs font-medium text-neutral-500 mb-1 block">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="username"
              className="border border-neutral-200 rounded-lg py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-shadow"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 mb-1 block">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="current-password"
              className="border border-neutral-200 rounded-lg py-2 px-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-shadow"
            />
          </div>

          {state.error && (
            <p
              className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2"
              role="alert"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-60 shadow-sm mt-1"
          >
            {pending ? "Signing in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
