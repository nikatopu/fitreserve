"use client";

import { Link } from "react-router-dom";
import style from "./Header.module.scss";
import Button from "../../atoms/Button";
import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import { useAuth } from "../../../context/AuthContext";

export interface INavButton {
  label: string;
  redirectTo: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

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

  async function handleLogout() {
    await logout();
    window.location.href = "/";
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
        {isAuthenticated ? (
          <>
            <Button
              label="My Account"
              onClick={() => { window.location.href = "/user"; }}
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

      <Button
        label={
          <>
            {mobileMenuOpen && (
              // SVG X
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="var(--text-color)"
                className={style.mobileMenuIcon}
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 4.22a.75.75 0 011.06 0L12 10.94l6.72-6.72a.75.75 0 111.06 1.06L13.06 12l6.72 6.72a.75.75 0 11-1.06 1.06L12 13.06l-6.72 6.72a.75.75 0 01-1.06-1.06L10.94 12 4.22 5.28a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            {!mobileMenuOpen && (
              // SVG Hamburger Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="var(--text-color)"
                className={style.mobileMenuIcon}
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </>
        }
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        theme="transparent"
        className={style.mobileMenuButton}
      />

      <MobileNavbar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navButtons={navButtons}
      />
    </header>
  );
}
