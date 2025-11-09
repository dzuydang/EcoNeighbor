import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../api/auth";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "resident", label: "Resident" },
  { value: "authority", label: "Authority" },
];

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverMsg, setServerMsg] = useState(null);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("resident");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setServerMsg(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await login({ email, password });
        setServerMsg(res.message || "Logged In!");
        nav("/", { replace: true });
      } else {
        await signUp({ fullName, location, role, email, password });
        await login({ email, password });
        nav("/", { replace: true });
      }
    } catch (err) {
      setError(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
      <button
        onClick={() => nav("/")}
        className="absolute top-2 right-6 text-gray-800 hover:text-gray-900 text-6xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {mode === "login" ? "Login" : "Sign Up"}
            </h2>
            <div className="text-sm text-gray-500">
              <button
                className="underline hover:text-gray-700"
                onClick={() => {
                  setError(null);
                  setServerMsg(null);
                  setMode(mode === "login" ? "signup" : "login");
                }}
                type="button"
              >
                {mode === "login"
                  ? "Create an account"
                  : "Have an account? Log In"}
              </button>
            </div>
          </div>

          {serverMsg && (
            <div className="mb-4 text-sm text-green-800 bg-green-50 p-2 rounded">
              {serverMsg}
            </div>
          )}
          {error && (
            <div className="mb-4 text-sm text-red-800 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-gray-200 shadow-sm p-2"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="mt-1 w-full rounded-md border border-gray-200 shadow-sm p-2"
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm p-2"
                  >
                    {ROLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-200 shadow-sm p-2"
                placeholder="example@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded-md border border-gray-200 shadow-sm p-2"
                placeholder="**********"
              />
            </div>

            <div className="pt-2">
              <button
                className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login"
                  : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
