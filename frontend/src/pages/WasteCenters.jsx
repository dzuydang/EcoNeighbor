import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api/auth";
import { getUserbyID } from "../api/user";
import { getWasteCenters, deleteWasteCenter } from "../api/wastecenter";
import { CheckCircle, XCircle } from "lucide-react";
import Pagination from "../components/Pagination";
import LeafletMap from "../components/LeafletMap";
import CreateWasteCenterWindow from "../components/CreateWasteCenterWindow";
import EditWasteCenterWindow from "../components/EditWasteCenterWindow";
import { MapPin, Phone, Trash } from "lucide-react";

const WasteCenters = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wasteCenters, setWasteCenters] = useState([]);
  const [selectedWasteCenter, setSelectedWasteCenter] = useState(null);
  const listRef = useRef(null);
  const itemRef = useRef(null);
  const createWasteCenterButton = useRef(null);
  const PaginationButton = useRef(null);
  const [wasteCentersPerPage, setWasteCentersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

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

    const verifyAdmin = async () => {
      try {
        const data = await getUserbyID();
        if (data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        setIsAdmin(false);
      }
    };

    const retrieveWasteCenters = async () => {
      try {
        const data = await getWasteCenters();
        setWasteCenters(data);
        setSelectedWasteCenter(data[0]);
      } catch (error) {
        console.error("Retrieving waste centers failed:", error);
      }
    };

    verifyLogin();
    verifyAdmin();
    retrieveWasteCenters();
  }, [nav]);

  useEffect(() => {
    const calcWasteCentersPerPage = () => {
      if (listRef.current && itemRef.current) {
        const containerHeight =
          listRef.current.clientHeight -
          (createWasteCenterButton.current?.clientHeight ?? 0) -
          PaginationButton.current.clientHeight;
        const itemHeight = itemRef.current.clientHeight + 8;
        const visibleCount = Math.floor(containerHeight / itemHeight);
        setWasteCentersPerPage(visibleCount);
      }
    };

    if (wasteCenters && wasteCenters.length > 0) {
      calcWasteCentersPerPage();
      window.addEventListener("resize", calcWasteCentersPerPage);
      return () =>
        window.removeEventListener("resize", calcWasteCentersPerPage);
    }
  }, [wasteCenters]);

  const totalPages = Math.ceil(wasteCenters.length / wasteCentersPerPage);
  const indexOfLast = currentPage * wasteCentersPerPage;
  const indexOfFirst = indexOfLast - wasteCentersPerPage;
  const currentWasteCenters = wasteCenters.slice(indexOfFirst, indexOfLast);

  return (
    isLoggedIn && (
      <div className="min-h-screen flex flex-col bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <div className="p-6">
          {/* Left side: waste centers list */}
          <div
            ref={listRef}
            className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden"
          >
            <div className="w-1/3 space-y-2">
              {isAdmin && (
                <div ref={createWasteCenterButton} className="text-center">
                  <button
                    onClick={async () => await CreateWasteCenterWindow()}
                    className="w-47/50 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-sm transition-transform hover:scale-105"
                  >
                    Create Waste Center
                  </button>
                </div>
              )}

              {currentWasteCenters.map((w, i) => (
                <div
                  ref={i === 0 ? itemRef : null}
                  key={w.center_id}
                  onClick={() => setSelectedWasteCenter(w)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedWasteCenter?.center_id === w.center_id
                      ? "bg-emerald-200"
                      : "bg-white hover:bg-emerald-50"
                  }`}
                >
                  <h2 className="font-semibold">{w.name}</h2>
                  <p className="text-sm text-gray-500">
                    {w.verified ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600">
                        <XCircle className="w-4 h-4" />
                        Unverified
                      </span>
                    )}
                  </p>
                </div>
              ))}
              <Pagination
                ref={PaginationButton}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) =>
                  setCurrentPage(Math.min(Math.max(page, 1), totalPages))
                }
              />
            </div>

            {/* Right side: selected Waste center details */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
              {selectedWasteCenter ? (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-bold mb-2">
                      {selectedWasteCenter.name}
                    </h2>
                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          onClick={async () =>
                            await EditWasteCenterWindow(selectedWasteCenter)
                          }
                          className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Are you sure you want to delete this waste center?",
                              )
                            )
                              return;
                            try {
                              await deleteWasteCenter(
                                selectedWasteCenter.center_id,
                              );
                              window.location.reload();
                            } catch (err) {
                              console.error("Delete failed:", err);
                            }
                          }}
                          className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">
                      {selectedWasteCenter.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 mt-4 h-1/2">
                    {/* Map */}
                    <div className="w-full relative z-10 h-full rounded-lg overflow-hidden">
                      <LeafletMap
                        latitude={selectedWasteCenter.latitude}
                        longitude={selectedWasteCenter.longitude}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-lg mt-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="font-semibold"> Address:</span>{" "}
                      {selectedWasteCenter.address}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="font-semibold">
                        {" "}
                        Contact Information:
                      </span>{" "}
                      {selectedWasteCenter.contact_info}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Trash className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="font-semibold">
                        {" "}
                        Material Types:
                      </span>{" "}
                      {selectedWasteCenter.material_types}
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <div className="flex flex-col w-full">
                        <span className="font-bold">About:</span>
                        <div
                          className="
                          mt-1 
                          p-3 
                          border border-gray-300 
                          rounded-lg 
                          max-h-40 
                          overflow-y-auto 
                          whitespace-pre-line
                          bg-gray-50
                        "
                        >
                          {selectedWasteCenter.about || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p>Select a waste center to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default WasteCenters;
