import { NavLink } from 'react-router-dom';

const SidePanel = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  return (
    <div className="side-panel">
      <NavLink to="/dashboard" className="side-panel-link">Dashboard</NavLink>
      {role === 'admin' && (
        <>
          <NavLink to="/user-list" className="side-panel-link">User List</NavLink>
          <NavLink to="/admin-settings" className="side-panel-link">Admin Settings</NavLink>
        </>
      )}
      {role === 'user' && (
        <>
          <NavLink to="/user-settings" className="side-panel-link">User Settings</NavLink>
        </>
      )}
    </div>
  );
};

export default SidePanel;
