import { Link } from "react-router-dom";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import style from "./TermsOfService.module.scss";

export default function TermsOfService() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Title text="Terms of Service" textAlign="left" size="small" />
        <Paragraph text="Last updated: June 22, 2026" size="small" />
      </div>

      <div className={style.content}>
        <section className={style.section}>
          <h2 className={style.sectionTitle}>Acceptance of Terms</h2>
          <Paragraph text={'By creating a FitReserve account, purchasing a membership, or booking a class, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use our services. We reserve the right to update these Terms at any time; continued use of the platform constitutes acceptance of any revisions.'} />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Membership & Eligibility</h2>
          <Paragraph text="To create an account and purchase a membership you must:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              Be at least 16 years of age (under-18 members require written
              parental consent).
            </li>
            <li className={style.listItem}>
              Provide accurate, current, and complete information during
              registration.
            </li>
            <li className={style.listItem}>
              Maintain the security of your account credentials and notify us
              immediately of any unauthorised access.
            </li>
          </ul>
          <Paragraph text="FitReserve reserves the right to refuse or terminate memberships that violate these Terms or our community standards." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>
            Class Reservations & Cancellations
          </h2>
          <Paragraph text="When booking classes through FitReserve:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              Reservations are confirmed only after you receive a booking
              confirmation via email or in-app notification.
            </li>
            <li className={style.listItem}>
              Cancellations made more than 4 hours before the scheduled class
              will be returned as a credit to your account.
            </li>
            <li className={style.listItem}>
              Late cancellations (within 4 hours) or no-shows will forfeit the
              session credit without refund.
            </li>
            <li className={style.listItem}>
              FitReserve may cancel or reschedule classes due to trainer
              availability, low enrolment, or circumstances beyond our control;
              affected members will receive a full credit.
            </li>
          </ul>
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Payment & Billing</h2>
          <Paragraph text="All memberships and session packs are billed in advance. By providing payment information, you authorise FitReserve to charge the applicable fees to your chosen payment method. Memberships renew automatically unless cancelled at least 48 hours before the renewal date. Refunds are issued solely at FitReserve's discretion and in accordance with applicable consumer law." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Health & Safety Disclaimer</h2>
          <Paragraph text="Physical exercise carries inherent risk of injury. By using FitReserve services, you acknowledge that:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              You have consulted a qualified medical professional prior to
              commencing any training programme if you have a known health
              condition.
            </li>
            <li className={style.listItem}>
              You will disclose relevant medical conditions and injuries to your
              trainer before each session.
            </li>
            <li className={style.listItem}>
              You accept sole responsibility for your physical condition and any
              injuries sustained during training, to the fullest extent
              permitted by law.
            </li>
          </ul>
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Code of Conduct</h2>
          <Paragraph text="All members are expected to maintain a respectful, inclusive environment. FitReserve expressly prohibits:" />
          <ul className={style.list}>
            <li className={style.listItem}>
              Harassment, discrimination, or threatening behaviour directed at
              any person on our premises or platform.
            </li>
            <li className={style.listItem}>
              Use of prohibited substances on or near FitReserve facilities.
            </li>
            <li className={style.listItem}>
              Unauthorised recording or photography of other members or staff.
            </li>
          </ul>
          <Paragraph text="Violations may result in immediate suspension or permanent termination of membership without refund." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Intellectual Property</h2>
          <Paragraph text="All content on the FitReserve platform — including training programmes, written materials, video content, logos, and interface designs — is the exclusive property of FitReserve or its licensors and is protected by copyright law. You may not reproduce, distribute, or create derivative works from any FitReserve content without express written permission." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Limitation of Liability</h2>
          <Paragraph text="To the maximum extent permitted by applicable law, FitReserve shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, our services. Our total aggregate liability for any claim related to these Terms or our services shall not exceed the amount you paid to FitReserve in the 90 days preceding the event giving rise to the claim." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Governing Law</h2>
          <Paragraph text="These Terms are governed by and construed in accordance with the laws of the jurisdiction in which FitReserve is incorporated, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the courts of that jurisdiction." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Changes to Terms</h2>
          <Paragraph text="We may revise these Terms at any time. When we make material changes, we will notify you at least 14 days in advance via the email address associated with your account. If you continue to use FitReserve after the effective date of the revised Terms, you are deemed to have accepted them." />
        </section>

        <div className={style.divider} />

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Contact Us</h2>
          <Paragraph text="For questions about these Terms, please contact:" />
          <ul className={style.list}>
            <li className={style.listItem}>Email: legal@fitreserve.com</li>
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
                agreed to these Terms. See also our{" "}
                <Link to="/privacy-policy" className={style.link}>
                  Privacy Policy
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
