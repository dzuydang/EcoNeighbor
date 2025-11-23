import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../api/auth";
import { getUserbyID, getUserbyIDargID } from "../api/user";
import { getReports, verifyReport, deleteReport } from "../api/report";
import { CheckCircle, XCircle } from "lucide-react";
import Pagination from "../components/Pagination";
import LeafletMap from "../components/LeafletMap";
import PhotoURL from "../components/PhotoURL";
import CreateReportWindow from "../components/CreateReportWindow";
import EditReportWindow from "../components/EditReportWindow";
import { getComments, deleteComment } from "../api/comment";
import CreateCommentWindow from "../components/CreateCommentWindow";
import EditCommentWindow from "../components/EditCommentWindow";

const Reports = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reports, setReports] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const listRef = useRef(null);
  const itemRef = useRef(null);
  const createReportButton = useRef(null);
  const commentsRef = useRef(null);
  const PaginationButton = useRef(null);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportAuthor, setReportAuthor] = useState(null);
  const [verified, setVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(comments);

  const nav = useNavigate();

  // used for page scrolling for comment section
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [comments]);

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

    const retrieveReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
        setSelectedReport(data[0]);
      } catch (error) {
        console.error("Retrieving reports failed:", error);
      }
    };

    verifyLogin();
    verifyAdmin();
    retrieveReports();
  }, [nav]);

  useEffect(() => {
    const retrieveComments = async () => {
      try {
        if (selectedReport) {
          const data = await getComments(selectedReport.report_id);
          setComments(data);
        }
      } catch (error) {
        console.error("Retrieving comments failed:", error);
      }
    };

    retrieveComments();
  }, [selectedReport]);

  // needed this to make sure calcReportsPerPage ran after reports listRef and itemRef were not null.
  // reports needs to be retrieved for that to happen.
  useEffect(() => {
    const calcReportsPerPage = () => {
      if (listRef.current && itemRef.current) {
        const containerHeight =
          listRef.current.clientHeight -
          createReportButton.current.clientHeight -
          PaginationButton.current.clientHeight;
        const itemHeight = itemRef.current.clientHeight + 8;
        const visibleCount = Math.floor(containerHeight / itemHeight);
        setReportsPerPage(visibleCount);
      }
    };

    if (reports && reports.length > 0) {
      calcReportsPerPage();
      window.addEventListener("resize", calcReportsPerPage);
      return () => window.removeEventListener("resize", calcReportsPerPage);
    }
  }, [reports]);

  useEffect(() => {
    const retrieveAuthor = async () => {
      try {
        if (selectedReport) {
          const data = await getUserbyIDargID(selectedReport.user_id);
          setReportAuthor(data);
        }
      } catch (error) {
        console.error("Error fetching user by argument id:", error);
        setReportAuthor("Unknown");
      }
    };

    const retrieveVerification = async () => {
      try {
        if (selectedReport) {
          setVerified(selectedReport.is_verified);
        }
      } catch (error) {
        console.error("Error getting verification of report:", error);
        setVerified(false);
      }
    };

    retrieveAuthor();
    retrieveVerification();
  }, [selectedReport]);

  const totalPages = Math.ceil(reports.length / reportsPerPage);
  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = reports.slice(indexOfFirst, indexOfLast);

  return (
    isLoggedIn && (
      <div className="min-h-screen flex flex-col bg-[image:var(--background-home)] bg-cover bg-center bg-no-repeat">
        <Navbar />
        <div className="p-6">
          {/* Left side: report list */}
          <div
            ref={listRef}
            className="flex gap-6 h-[calc(100vh-120px)] overflow-hidden"
          >
            <div className="w-1/3 space-y-2">
              <div ref={createReportButton} className="text-center">
                <button
                  onClick={async () => await CreateReportWindow()}
                  className="w-47/50 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-sm transition-transform hover:scale-105"
                >
                  Create Report
                </button>
              </div>

              {currentReports.map((r, i) => (
                <div
                  ref={i === 0 ? itemRef : null}
                  key={r.report_id}
                  onClick={() => setSelectedReport(r)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedReport?.report_id === r.report_id
                      ? "bg-emerald-200"
                      : "bg-white hover:bg-emerald-50"
                  }`}
                >
                  <h2 className="font-semibold">{r.title}</h2>
                  <p className="text-sm text-gray-500">
                    {r.is_verified ? (
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
                    {new Date(r.created_at).toLocaleDateString()}
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

            {/* Right side: selected report details */}
            <div className="flex-1 bg-white rounded-lg shadow p-4">
              {selectedReport ? (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-bold mb-2">
                      {selectedReport.title}
                    </h2>
                    {isAdmin && (
                      <div className="flex gap-2">
                        {verified ? (
                          <button
                            onClick={async () => {
                              try {
                                if (
                                  !window.confirm(
                                    "Are you sure you want to unverify this report?",
                                  )
                                )
                                  return;
                                setVerified(false);
                                await verifyReport(
                                  selectedReport.report_id,
                                  false,
                                );
                                window.location.reload();
                              } catch (err) {
                                console.error("Verification failed:", err);
                              }
                            }}
                            className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                          >
                            Unverify
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              try {
                                if (
                                  !window.confirm(
                                    "Are you sure you want to verify this report?",
                                  )
                                )
                                  return;
                                setVerified(true);
                                await verifyReport(
                                  selectedReport.report_id,
                                  true,
                                );
                                window.location.reload();
                              } catch (err) {
                                console.error("Verification failed:", err);
                              }
                            }}
                            className="px-3 py-1 text-sm rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          >
                            Verify
                          </button>
                        )}
                        <button
                          onClick={async () =>
                            await EditReportWindow(selectedReport)
                          }
                          className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Are you sure you want to delete this report?",
                              )
                            )
                              return;
                            try {
                              await deleteReport(selectedReport.report_id);
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
                      {selectedReport.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedReport.forwarded_to_authority ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Fowarded To Authority
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <XCircle className="w-4 h-4" />
                          Not Fowarded To Authority
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4 h-64">
                    {/* Photo */}
                    {selectedReport.photo_url ? (
                      <PhotoURL
                        keyval={selectedReport.report_id}
                        url={selectedReport.photo_url}
                      />
                    ) : (
                      <div className="w-1/2 h-full flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">
                        No photo available
                      </div>
                    )}

                    {/* Map */}
                    <div className="relative z-10 w-1/2 h-full rounded-lg overflow-hidden">
                      <LeafletMap
                        latitude={selectedReport.latitude}
                        longitude={selectedReport.longitude}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    {reportAuthor && (
                      <p className="text-gray-700">
                        By {reportAuthor.full_name}
                      </p>
                    )}
                    <button
                      onClick={async () =>
                        await CreateCommentWindow(selectedReport.report_id)
                      }
                      className="px-3 py-1 text-sm rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    >
                      Create Comment
                    </button>
                  </div>

                  <div
                    ref={commentsRef}
                    className="overflow-y-auto relative h-64 border border-gray-200 rounded-xl bg-white mt-4"
                  >
                    {comments.length > 0 ? (
                      <div className="overflow-y-auto p-4 shadow-sm">
                        {comments.map((c, i) => (
                          <div key={i} className="mb-3 last:mb-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-gray-800">
                                {c.content}
                              </p>
                              {isAdmin && (
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={async () =>
                                      await EditCommentWindow(
                                        c.comment_id,
                                        c.content,
                                      )
                                    }
                                    className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (
                                        !window.confirm(
                                          "Are you sure you want to delete this comment?",
                                        )
                                      )
                                        return;
                                      try {
                                        await deleteComment(c.comment_id);
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
                              <p className="text-gray-600">
                                By {c.author_name}
                              </p>
                              {new Date(c.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex text-4xl absolute left-1/2 -translate-x-1/2 text-gray-500 italic justify-center items-center h-full">
                        No Comments
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p>Select a report to view details</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Reports;
