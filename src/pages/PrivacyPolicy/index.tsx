import { Link } from "react-router-dom";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import style from "./PrivacyPolicy.module.scss";

export default function PrivacyPolicy() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Title text="Privacy Policy" textAlign="left" size="small" />
        <Paragraph text="Last updated: June 22, 2026" size="small" />
      </div>

      <div className={style.content}>
        <section className={style.section}>
          <h2 className={style.sectionTitle}>Introduction</h2>
          <Paragraph text={'FitReserve ("we," "our," or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our services, website, and facilities. By accessing FitReserve, you agree to the practices described in this policy.'} />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Information We Collect</h2>
          <Paragraph text="We collect information you provide directly to us, including:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              <b>Personal details</b> — name, email address, phone number, and
              date of birth when you create an account or make a reservation.
            </li>
            <li className={style.listItem}>
              <b>Health information</b> — fitness goals, medical conditions, and
              injury history that you voluntarily share to help our trainers
              personalise your experience.
            </li>
            <li className={style.listItem}>
              <b>Payment information</b> — billing address and payment method
              details, processed securely through our third-party payment
              processor.
            </li>
            <li className={style.listItem}>
              <b>Usage data</b> — class attendance history, session preferences,
              app interactions, and device identifiers collected automatically
              when you use our platform.
            </li>
          </ul>
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>How We Use Your Information</h2>
          <Paragraph text="We use the information we collect to:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              Provide, operate, and improve our services and facilities.
            </li>
            <li className={style.listItem}>
              Process memberships, reservations, and payments.
            </li>
            <li className={style.listItem}>
              Send booking confirmations, reminders, and service notifications.
            </li>
            <li className={style.listItem}>
              Personalise training recommendations and class suggestions.
            </li>
            <li className={style.listItem}>
              Comply with legal obligations and enforce our policies.
            </li>
          </ul>
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Data Sharing</h2>
          <Paragraph text="We do not sell your personal information. We may share it with:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              <b>Service providers</b> — payment processors, email platforms,
              and analytics tools that operate under strict confidentiality
              agreements.
            </li>
            <li className={style.listItem}>
              <b>Trainers and staff</b> — to the extent necessary to deliver
              the services you have booked.
            </li>
            <li className={style.listItem}>
              <b>Legal authorities</b> — when required by law, court order, or
              to protect the safety of our members and staff.
            </li>
          </ul>
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Data Retention</h2>
          <Paragraph text="We retain your personal data for as long as your account remains active or as needed to provide services. Inactive accounts are purged after 36 months. Payment records are retained for 7 years to satisfy statutory accounting requirements. You may request earlier deletion at any time (see Your Rights below)." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Your Rights</h2>
          <Paragraph text="Depending on your jurisdiction, you have the right to:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              Access a copy of the personal data we hold about you.
            </li>
            <li className={style.listItem}>
              Request correction of inaccurate or incomplete information.
            </li>
            <li className={style.listItem}>
              Request deletion of your account and associated data.
            </li>
            <li className={style.listItem}>
              Object to or restrict certain processing activities.
            </li>
            <li className={style.listItem}>
              Receive your data in a portable, machine-readable format.
            </li>
          </ul>
          <Paragraph text="To exercise any of these rights, contact us at privacy@fitreserve.com. We will respond within 30 days." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Cookies & Tracking</h2>
          <Paragraph text="We use essential cookies to keep you signed in and remember your preferences. We also use analytics cookies to understand how members use the platform. You can disable non-essential cookies via your browser settings; however, some features may not function correctly without them." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Security</h2>
          <Paragraph text="We implement industry-standard technical and organisational measures — including encryption in transit and at rest, access controls, and regular security audits — to protect your information. No transmission over the internet is completely secure; we cannot guarantee absolute security, but we are committed to minimising risk." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Children's Privacy</h2>
          <Paragraph text="FitReserve services are intended for individuals 16 years of age and older. We do not knowingly collect personal data from children under 16. If you believe we have inadvertently collected such data, please contact us immediately and we will delete it promptly." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Changes to This Policy</h2>
          <Paragraph text="We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. When we make material changes, we will notify you by email or by posting a prominent notice on our platform at least 14 days before the changes take effect." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Contact Us</h2>
          <Paragraph text="If you have questions or concerns about this Privacy Policy or our data practices, please reach out:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              Email: privacy@fitreserve.com
            </li>
            <li className={style.listItem}>
              Address: FitReserve HQ, 14 Meridian Lane, Floor 3
            </li>
          </ul>
        </section>

        <div className={style.divider} />

        <div className={style.footer}>
          <Paragraph
            text={
              <>
                By using FitReserve, you acknowledge that you have read and
                understood this Privacy Policy. See also our{" "}
                <Link to="/terms-of-service" className={style.link}>
                  Terms of Service
                </Link>
                .
              </>
            }
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
