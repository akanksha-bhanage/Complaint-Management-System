import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children, role }) {
  return (
    <div className="layout">
      <Sidebar role={role} />
      <div className="main">
        <Navbar role={role} />
        <div className="content">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}