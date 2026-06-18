import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardNav from "../components/DashboardNav";
import ComplaintCard from "../components/ComplaintCard";
import { getAssignedComplaints, updateComplaintStatus } from "../services/api";
import { toast } from "react-toastify";

export default function StaffDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [updates, setUpdates] = useState({});
  const [isUpdating, setIsUpdating] = useState({});
  const [active, setActive] = useState("assigned");

  const fetchAssigned = async () => {
    try {
      const data = await getAssignedComplaints();
      if (Array.isArray(data)) {
        setComplaints(data);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.error(err);
      setComplaints([]);
      toast.error(err.message || "Failed to load assigned complaints");
    }
  };

  useEffect(() => {
    fetchAssigned();
  }, []);

  const handleUpdate = async (id) => {
    const { status, message } = updates[id] || {};
    if (!status || !message) {
      toast.warning("Status and update message are required");
      return;
    }

    setIsUpdating((prev) => ({ ...prev, [id]: true }));
    try {
      await updateComplaintStatus(id, { status, message });
      toast.success("Complaint updated successfully!");
      setUpdates((prev) => ({
        ...prev,
        [id]: { status: "", message: "" }
      }));
      fetchAssigned();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsUpdating((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Layout role="staff">
      <div className="dashboard-header animate-fade-in">
        <h1>Staff Dashboard</h1>
        <p>Manage and update your assigned complaints</p>
      </div>

      <DashboardNav active={active} setActive={setActive} role="staff" />

      {complaints.length > 0 ? (
        <div className="cards-container animate-fade-in">
          {complaints.map((c) => (
            <ComplaintCard key={c._id} complaintData={c}>
              {c.status === "resolved" ? (
                <p className="staff-completed-text">✔ Completed</p>
              ) : (
                <div className="staff-update-section">
                  <h4 className="staff-update-title">Update Status</h4>
                  <div className="staff-update-form">
                    <select
                      className="form-input"
                      value={updates[c._id]?.status || ""}
                      onChange={(e) =>
                        setUpdates({
                          ...updates,
                          [c._id]: { ...updates[c._id], status: e.target.value }
                        })
                      }
                      disabled={isUpdating[c._id]}
                    >
                      <option value="">Select New Status</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>

                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter update message..."
                      value={updates[c._id]?.message || ""}
                      onChange={(e) =>
                        setUpdates({
                          ...updates,
                          [c._id]: { ...updates[c._id], message: e.target.value }
                        })
                      }
                      disabled={isUpdating[c._id]}
                    />

                    <button 
                      className="btn-primary" 
                      onClick={() => handleUpdate(c._id)}
                      disabled={c.status === "resolved" || isUpdating[c._id]}
                    >
                      {isUpdating[c._id] ? "Updating..." : "Post Update"}
                    </button>
                  </div>
                </div>
              )}
            </ComplaintCard>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No assigned complaints currently.</p>
        </div>
      )}
    </Layout>
  );
}