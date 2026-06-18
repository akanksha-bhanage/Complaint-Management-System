export default function Sidebar({ role }) {
  // We're using DashboardNav for the sub-tabs, so Sidebar can just be a static 
  // overview or general links for now.
  
  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        <div className="sidebar-link active">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
          Dashboard
        </div>
        {/* Placeholder for future links like Profile, Settings, etc */}
        <div className="sidebar-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Profile
        </div>
      </div>
    </aside>
  );
}
