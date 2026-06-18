export default function ComplaintCard({ complaintData, children }) {
  const c = complaintData;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3>{c.title || "Untitled"}</h3>
        <span className={`badge ${c.status || "pending"}`}>
          {c.status || "Pending"}
        </span>
      </div>
      
      <div className="card-meta">
        <span>📅 {formatDate(c.date || c.createdAt)}</span>
        {c.type && <span>🏷️ {c.type}</span>}
      </div>

      {c.userId?.name && (
        <div className="card-creator-info">
          <strong>Submitted by:</strong> {c.userId.name} ({c.userId.email})
        </div>
      )}

      <p className="card-description">{c.description}</p>
      
      {(c.assignedTo?.name || (c.updates && c.updates.length > 0)) && (
        <div className="card-actions">
          {c.assignedTo?.name && (
            <p className="staff-assign">
              <strong>Assigned to:</strong> {c.assignedTo.name} ({c.assignedTo.email})
            </p>
          )}

          {c.updates && c.updates.length > 0 && (
            <div className="update-timeline">
              <strong>Timeline Updates</strong>
              {c.updates.map((u) => (
                <div key={u._id} className="update-item">
                  <div className="update-date">{formatDate(u.date)}</div>
                  <div className="update-message">{u.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {children && (
        <div className={`card-actions ${c.updates?.length ? "has-updates" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
}