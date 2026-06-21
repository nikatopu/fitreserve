import classNames from "classnames";
import style from "./MobileNavbar.module.scss";
import { INavButton } from "..";
import { Link } from "react-router-dom";
import Button from "../../../atoms/Button";

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

  function handleLogin() {
    window.location.href = "/login";
  }

  function handleSignUp() {
    window.location.href = "/signup";
  }

  return (
    <div className={classNames(style.mobileNavbar, isOpen && style.open)}>
      {navButtons.map((button, index) => (
        <Link key={index} to={button.redirectTo} onClick={onClose} className={style.navButton}>
          {button.label}
        </Link>
      ))}

      <div className={style.authButtonsContainer}>
        <Button
          label="Member Login"
          onClick={handleLogin}
          theme="transparent"
        />

        <Button label="Sign Up" onClick={handleSignUp} theme="primary" />
      </div>
    </div>
  );
}
