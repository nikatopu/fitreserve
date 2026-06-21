import { Link } from "react-router-dom";
import Paragraph from "../../atoms/Paragraph";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.leftContainer}>
        <img
          src="/text-logo.svg"
          alt="FitReserve Logo"
          className={style.logo}
        />

        <Paragraph
          text={`© ${new Date().getFullYear()} FitReserve. All rights reserved.`}
        />
      </div>

      <div className={style.rightContainer}>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <a
          href="https://wa.me/595070861"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Support
        </a>
        <a
          href="https://www.google.com/maps/search/FitReserve"
          target="_blank"
          rel="noopener noreferrer"
        >
          Studio Locations
        </a>
      </div>
    </footer>
  );
}
