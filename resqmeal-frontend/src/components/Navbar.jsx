 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { useAuth } from "../contexts/AuthContext";
 import { Leaf, Menu, X, LogOut, User, Bell } from "lucide-react";
 import { useState } from "react";
 import { Button } from "react-bootstrap";
import { useNotifications } from "../contexts/NotificationContext";
import "./navbar.css";
//  import NotificationBell from "./NotificationBell";
 

 const Navbar = () => {
   const { isAuthenticated, user, logout } = useAuth();
   const navigate = useNavigate();
   const [mobileOpen, setMobileOpen] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);
   const location = useLocation();
   const { notifications, readOne } = useNotifications();
   const unreadCount = notifications.filter(n => !n.isRead).length;

  //  const unreadCount = Notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navLinks = isAuthenticated
    ? [
         { to: "/dashboard", label: "Dashboard" },
        { to: "/donations", label: "Donations" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ];

   const isActive = (path) => location.pathname === path;

   return (
     <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top">
       <div className="container">

        {/* Logo */}
       <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="bg-success text-white rounded p-2">
             <Leaf size={18} />
          </div>
          <strong>
             Res<span className="text-success">QMeal</span>
           </strong>
         </Link>

         {/* Mobile toggle */}
       <button
         className="navbar-toggler"
         onClick={() => setMobileOpen(!mobileOpen)}
       >
         {mobileOpen ? <X /> : <Menu />}
       </button>

        {/* Desktop Nav */}
       <div className={`collapse navbar-collapse ${mobileOpen ? "show" : ""}`}>
         <ul className="navbar-nav mx-auto mb-2 mb-md-0">
           {navLinks.map(link => (
             <li key={link.to} className="nav-item">
               <Link
                 to={link.to}
                  className={`nav-link ${
                    isActive(link.to) ? "active fw-semibold" : ""
                  }`}
                  onClick={() => setMobileOpen(false)}                >
                  {link.label}
                </Link>
              </li>
             ))}
           </ul>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="position-relative">
                  <button
                    className="notification-btn"
                    onClick={() => setShowNotifications(!showNotifications)}
                    aria-label="Notifications"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="notification-badge">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="notification-dropdown">
                      <div className="notification-header">
                        Notifications {unreadCount > 0 && `(${unreadCount} new)`}
                      </div>
                      <div className="notification-list">
                        {notifications.filter(n => !n.isRead).length > 0 ? (
                          notifications.filter(n => !n.isRead).map(n => (
                            <div
                              key={n._id || n.id}
                              className="notification-item unread"
                              onClick={() => {
                                readOne(n._id || n.id);
                                setShowNotifications(false); // Close dropdown after reading
                              }}
                            >
                              <div className="notification-message">{n.message}</div>
                              {n.createdAt && (
                                <div className="notification-time">
                                  {new Date(n.createdAt).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="notification-empty">
                            No new notifications
                          </div>
                        )}
                        {notifications.filter(n => n.isRead).length > 0 && (
                          <div className="notification-section">
                            <div className="notification-section-title">Read</div>
                            {notifications.filter(n => n.isRead).map(n => (
                              <div
                                key={n._id || n.id}
                                className="notification-item read"
                                onClick={() => setShowNotifications(false)}
                              >
                                <div className="notification-message">{n.message}</div>
                                {n.createdAt && (
                                  <div className="notification-time">
                                    {new Date(n.createdAt).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
               {/* <NotificationBell  /> */}

               {/* Profile */}
               <Link to="/profile" className="text-decoration-none">
                 <div className="d-flex align-items-center gap-2 bg-light rounded-pill px-3 py-1">
                   <User size={16} />
                   <span className="fw-medium">{user?.name}</span>
                   <span className="badge bg-success text-uppercase">
                     {user?.role}
                   </span>
                 </div>
               </Link>

                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                 <LogOut size={16} className="me-1" /> Logout
               </Button>
             </>
           ) : (
             <>
               <Link to="/login">
                 <Button variant="outline-secondary" size="sm">
                   Sign In
                 </Button>
               </Link>
               <Link to="/register">
                 <Button variant="success" size="sm">
                   Get Started
                 </Button>
               </Link>
             </>
           )}
         </div>
       </div>
     </div>
   </nav>
 );
};

 export default Navbar;
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;