export default function DashboardNav({ active, setActive, role }) {
  return (
    <div className="dashboard-nav">
      {role === "user" && (
        <>
          <button 
            className={`nav-tab ${active === "form" ? "active" : ""}`}
            onClick={() => setActive("form")}
          >
            Create Complaint
          </button>
          <button 
            className={`nav-tab ${active === "list" ? "active" : ""}`}
            onClick={() => setActive("list")}
          >
            My Complaints
          </button>
        </>
      )}

      {role === "admin" && (
        <>
          <button 
            className={`nav-tab ${active === "all" ? "active" : ""}`}
            onClick={() => setActive("all")}
          >
            All Complaints
          </button>
          <button 
            className={`nav-tab ${active === "pending" ? "active" : ""}`}
            onClick={() => setActive("pending")}
          >
            Pending
          </button>
          <button 
            className={`nav-tab ${active === "resolved" ? "active" : ""}`}
            onClick={() => setActive("resolved")}
          >
            Resolved
          </button>
        </>
      )}

      {role === "staff" && (
        <>
          <button 
            className={`nav-tab ${active === "assigned" ? "active" : ""}`}
            onClick={() => setActive("assigned")}
          >
            Assigned to Me
          </button>
        </>
      )}
    </div>
  );
}