import ComplaintCard from "./ComplaintCard";

export default function ComplaintList({ complaints }) {
  return (
    <div className="animate-fade-in">
      {complaints.length === 0 ? (
        <div className="empty-state">
          <p>No complaints found.</p>
        </div>
      ) : (
        <div className="cards-container">
          {complaints.map((c) => (
            <ComplaintCard key={c._id} complaintData={c} />
          ))}
        </div>
      )}
    </div>
  );
}