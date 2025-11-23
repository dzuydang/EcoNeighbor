import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api/auth";
import { getAllAlerts } from "../api/alerts";

const Alerts = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Stores recommendation text for each report
  const [recommendations, setRecommendations] = useState({});

  // Tracks loading state for each report ID
  const [loadingRec, setLoadingRec] = useState({});

  const nav = useNavigate();

  const handleRecommendAction = async (report) => {
    const id = report.report_id;

    // mark loading
    setLoadingRec((prev) => ({ ...prev, [id]: true }));

    try {
      const res = await fetch(
        `http://localhost:3000/alert/${id}/recommend`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      setRecommendations((prev) => ({
        ...prev,
        [id]: data.recommendation,
      }));

    } catch (err) {
      console.error("Recommendation error:", err);
    } finally {
      // stop loading
      setLoadingRec((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const data = await checkLogin();
        if (data === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          nav("/auth", { replace: true });
        }
      } catch (error) {
        console.error("Login check failed:", error);
        setIsLoggedIn(false);
        nav("/auth", { replace: true });
      }
    };

    const retrieveAlerts = async () => {
      try {
        const data = await getAllAlerts();
        setAlerts(data);
      } catch (error) {
        console.error("Fetching alerts failed:", error);
        setFetchError("Failed to load alerts.");
      } finally {
        setLoading(false);
      }
    };

    verifyLogin();
    retrieveAlerts();
  }, [nav]);

  if (!isLoggedIn) return null;
  if (loading) return <div className="p-6">Loading alerts...</div>;
  if (fetchError) return <div className="p-6 text-red-600">{fetchError}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
      <Navbar />

      <main className="max-w-3xl w-full mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Verified Community Alerts</h1>

        {alerts.length === 0 ? (
          <p className="text-gray-600">No verified alerts yet.</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((a) => (
              <li
                key={a.report_id}
                className="rounded-xl border bg-white/80 backdrop-blur p-4 shadow-sm"
              >
                <h2 className="font-semibold text-lg">
                  {a.title || "Untitled Alert"}
                </h2>

                {a.description && (
                  <p className="text-sm text-gray-700 mt-1">{a.description}</p>
                )}

                <div className="mt-2 text-xs text-gray-500">
                  Posted:{" "}
                  {a.created_at
                    ? new Date(a.created_at).toLocaleString()
                    : "—"}
                </div>

                {a.location && (
                  <div className="mt-1 text-xs text-gray-500">
                    Location: {a.location}
                  </div>
                )}

                <button
                  onClick={() => handleRecommendAction(a)}
                  disabled={loadingRec[a.report_id]}
                  className={`mt-3 px-3 py-1.5 text-sm rounded-lg transition
                    ${loadingRec[a.report_id]
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[.98]"
                    }`}
                >
                  {loadingRec[a.report_id] ? (
                    <div className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Generating...
                    </div>
                  ) : (
                    "Recommend Action"
                  )}
                </button>

                {recommendations[a.report_id] && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900 animate-fadeIn">
                    <p className="font-semibold">AI Recommended Action:</p>
                    <p>{recommendations[a.report_id]}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Alerts;
