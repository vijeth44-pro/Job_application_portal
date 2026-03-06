import { useEffect, useState } from "react";
import axios from "axios";


export default function Track() {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("mytoken");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9000/api/applications/my",
        {
          headers: { "auth-token": token },
        }
      );

      if (res.data?.success) {
        setApplications(res.data.data || []);
      }
    } catch (err) {
      console.error(
        "Fetch Applications Error:",
        err.response?.data || err.message
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
      case "Candidate":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="layout">

      <div className="content min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">



        <div className="p-8">

          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl overflow-hidden">

            <table className="w-full text-left">

              <thead className="bg-white/80 backdrop-blur-md border-b">
                <tr className="text-slate-700 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4">Job</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Applied On</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>

                {applications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app._id}
                      className="border-b hover:bg-blue-50/40 transition-all duration-200"
                    >
                      <td className="px-6 py-5 font-semibold text-slate-900">
                        {app.job?.title}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {app.job?.company}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {app.job?.location}
                      </td>

                      <td className="px-6 py-5 text-slate-500">
                        {new Date(app.createdAt).toDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}