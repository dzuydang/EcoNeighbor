import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../api/auth";
import Navbar from "../components/Navbar";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "resident", label: "Resident" },
  { value: "authority", label: "Authority" }
]

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
        nav("/dashboard, { replace: true });")
      } else {
        await signup({ fullName, location, role, email, password });
        await login({ email, password });
        nav("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      Hello
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {mode === "login" ? "Login" : "Sign Up"}
          </h2>
          <div className="text-sm text-gray-500">
            <button className="underline hover:text-gray-700"
              onClick={()=>{
                setError(null);
                setServerMsg(null);
                setMode(mode === "login" ? "signup" : "login")
              }}
              type="button"
            >
              {mode === "login" ? "Create an account" : "Have an account? Login"}
            </button>
          </div>
        </div>

        {serverMsg && <div className="mb-4 text-sm text-green-800 bg-green-50 p-2 rounded">{serverMsg}</div>}
        {error && <div className="mb-4 text-sm text-red-800 bg-red-50 p-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
            <div>
              <label className="block text-sm font-medium text-gray-700"> Full Name</label>
            </div>
            </> 
          )}
        </form>


      </div>
    </div>
  );
} 