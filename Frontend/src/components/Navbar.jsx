import { useNavigate } from "react-router-dom";

export default function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        HostelCare
      </div>
      
      <div className="navbar-right">
        {role && (
          <>
            <span className="user-info">Role: {role.charAt(0).toUpperCase() + role.slice(1)}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
