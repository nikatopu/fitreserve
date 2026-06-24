import classNames from "classnames";
import style from "./MobileNavbar.module.scss";
import { INavButton } from "..";
import { Link } from "react-router-dom";
import Button from "../../../atoms/Button";
import { useAuth } from "../../../../context/AuthContext";

interface IMobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
  navButtons: INavButton[];
}

export default function MobileNavbar({
  isOpen,
  onClose,
  navButtons,
}: IMobileNavbarProps) {
  const { isAuthenticated, logout } = useAuth();

  function handleLogin() {
    window.location.href = "/login";
  }

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  function handleSignUp() {
    window.location.href = "/signup";
  }

  return (
    <div className={classNames(style.mobileNavbar, isOpen && style.open)}>
      {navButtons.map((button, index) => (
        <Link
          key={index}
          to={button.redirectTo}
          onClick={onClose}
          className={style.navButton}
        >
          {button.label}
        </Link>
      ))}

      <div className={style.authButtonsContainer}>
        {isAuthenticated ? (
          <>
            <Button
              label="My Account"
              onClick={() => {
                window.location.href = "/user";
              }}
              theme="transparent"
            />
            <Button label="Log Out" onClick={handleLogout} theme="primary" />
          </>
        ) : (
          <>
            <Button
              label="Member Login"
              onClick={handleLogin}
              theme="transparent"
            />
            <Button label="Sign Up" onClick={handleSignUp} theme="primary" />
          </>
        )}
      </div>
    </div>
  );
}
