import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api/auth";
import { getNumReports, getNumUsers } from "../api/data";
import CustomActiveShapePieChart from "../components/PieChart";
import SimpleBarChart from "../components/BarGraph";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [numReports, setNumReports] = useState("");
  const [numUsers, setNumUsers] = useState("");

  const nav = useNavigate();
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

    const retrieveNumReports = async () => {
      try {
        const numReports = await getNumReports();
        setNumReports(numReports.count);
      } catch (error) {
        console.error("Getting number of reports failed:", error);
        setNumReports("");
      }
    };

    const retrieveNumUsers = async () => {
      try {
        const numUsers = await getNumUsers();
        setNumUsers(numUsers.count);
      } catch (error) {
        console.error("Getting number of users failed:", error);
        setNumUsers("");
      }
    };

    verifyLogin();
    retrieveNumReports();
    retrieveNumUsers();
  }, [nav]);

  return (
    isLoggedIn && (
      <div className="h-screen flex flex-col bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <div className="items-stretch flex-1 flex flex-col md:flex-row items-center gap-6 p-6 overflow-visible">
          <div className="flex-1 border border-green-100 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Verified vs Unverified Reports:
            </h2>
            <div className="flex-1 flex justify-center mt-2 overflow-visible">
              <CustomActiveShapePieChart />
            </div>
            <p className="text-xl font-semibold mb-2 text-gray-700">
              Total Number Of Reports: {numReports}
            </p>
          </div>

          <div className="flex-1 border border-green-100 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              User Role Distribution:
            </h2>
            <div className="flex-1 flex justify-center mt-2 overflow-visible">
              <SimpleBarChart/>
            </div>
            <p className="text-xl font-semibold mb-2 text-gray-700">
              Total Number Of Users: {numUsers}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
