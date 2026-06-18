import { useEffect, useState } from "react";
import { getMyComplaints, createComplaint } from "../services/api";
import ComplaintList from "../components/ComplaintList";
import ComplaintForm from "../components/ComplaintForm";
import DashboardNav from "../components/DashboardNav";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [active, setActive] = useState("form");

  const fetchData = async () => {
    try {
      const data = await getMyComplaints();
      setComplaints(data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (formData) => {
    try {
      await createComplaint(formData);
      toast.success("Complaint submitted successfully!");
      await fetchData();
      setActive("list");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to submit complaint");
    }
  };

  return (
    <Layout role="user">
      <div className="dashboard-header animate-fade-in">
        <h1>User Dashboard</h1>
        <p>Manage and track your complaints</p>
      </div>

      <DashboardNav active={active} setActive={setActive} role="user" />

      {active === "form" && (
        <ComplaintForm addComplaint={handleAdd} />
      )}

      {active === "list" && (
        <ComplaintList complaints={complaints} />
      )}
    </Layout>
  );
}