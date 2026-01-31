import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@mail.com", role: "User", blocked: false },
    { id: 2, name: "Sara Smith", email: "sara@mail.com", role: "User", blocked: true },
    { id: 3, name: "Admin One", email: "admin@mail.com", role: "Admin", blocked: false }
  ]);

  const toggleBlock = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, blocked: !u.blocked } : u
      )
    );
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Topbar title="Manage Users" />

        <table className="app-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`badge ${
                      user.blocked ? "OnHold" : "Candidate"
                    }`}
                  >
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td>
                  <button
                    className="small-btn"
                    onClick={() => toggleBlock(user.id)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
