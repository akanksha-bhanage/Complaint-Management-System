import { useEffect, useState } from "react";
import { getAllComplaints, getStaffUsers, assignComplaint } from "../services/api";
import DashboardNav from "../components/DashboardNav";
import Layout from "../components/Layout";
import ComplaintCard from "../components/ComplaintCard";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [active, setActive] = useState("all");
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [isAssigning, setIsAssigning] = useState({});

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data.complaints || data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load complaints");
    }
  };

  const fetchStaff = async () => {
    try {
      const data = await getStaffUsers();
      setStaffList(data);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load staff list");
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchStaff();
  }, []);

  const handleAssign = async (id) => {
    const staffId = selectedStaff[id];
    if (!staffId) {
      toast.warning("Please select a staff member first.");
      return;
    }

    setIsAssigning((prev) => ({ ...prev, [id]: true }));
    try {
      await assignComplaint(id, staffId);
      toast.success("Complaint assigned successfully!");
      fetchComplaints();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsAssigning((prev) => ({ ...prev, [id]: false }));
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    if (active === "all") return true;
    return c.status === active;
  });

  return (
    <Layout role="admin">
      <div className="dashboard-header animate-fade-in">
        <h1>Admin Dashboard</h1>
        <p>Overview of all complaints and staff assignments</p>
      </div>

      <DashboardNav active={active} setActive={setActive} role="admin" />

      {filteredComplaints.length > 0 ? (
        <div className="cards-container animate-fade-in">
          {filteredComplaints.map((c) => (
            <ComplaintCard key={c._id} complaintData={c}>
              {!c.assignedTo ? (
                <div className="admin-assign-wrapper">
                  <select
                    className="form-input admin-assign-select"
                    value={selectedStaff[c._id] || ""}
                    onChange={(e) =>
                      setSelectedStaff({ ...selectedStaff, [c._id]: e.target.value })
                    }
                    disabled={isAssigning[c._id]}
                  >
                    <option value="">Assign Staff</option>
                    {staffList.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                  <button 
                    className="btn-primary admin-assign-btn" 
                    onClick={() => handleAssign(c._id)}
                    disabled={isAssigning[c._id]}
                  >
                    {isAssigning[c._id] ? "Assigning..." : "Assign"}
                  </button>
                </div>
              ) : (
                <div className="admin-assigned-badge">
                  ✓ Already Assigned
                </div>
              )}
            </ComplaintCard>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No complaints found for this status.</p>
        </div>
      )}
    </Layout>
  );
}