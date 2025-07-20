import PropTypes from "prop-types";

import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../../mutations/users/logout";

const Header = ({ user }) => {
  const [logout] = useMutation(LOGOUT_MUTATION);

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (err) {
      console.error("Backend logout failed:", err);
    }
  };

  return (
    <header>
      <div className="welcome-text">Welcome {user.name}</div>
      <button type="button" className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;
