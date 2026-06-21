import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import Button from "../../atoms/Button";

interface INavButton {
  label: string;
  redirectTo: string;
}

export default function Header() {
  const navButtons: INavButton[] = [
    {
      label: "Programs",
      redirectTo: "/programs",
    },
    {
      label: "Trainers",
      redirectTo: "/trainers",
    },
    {
      label: "Schedule",
      redirectTo: "/schedule",
    },
    {
      label: "Memberships",
      redirectTo: "/membership",
    },
  ];

  function handleLogin() {
    window.location.href = "/login";
  }

  function handleSignUp() {
    window.location.href = "/signup";
  }

  return (
    <header className={style.header}>
      <Link to="/" className={style.logoLink}>
        <img
          src="/text-logo.svg"
          alt="FitReserve Logo"
          className={style.logo}
        />
      </Link>

      <div className={style.navButtonsContainer}>
        {navButtons.map((button) => (
          <Link
            key={button.label}
            to={button.redirectTo}
            className={style.navButton}
          >
            {button.label}
          </Link>
        ))}
      </div>

      <div className={style.authButtonsContainer}>
        <Button label="Member Login" onClick={handleLogin} theme="transparent" />
        <Button label="Sign Up" onClick={handleSignUp} theme="primary" />
      </div>
    </header>
  );
}
