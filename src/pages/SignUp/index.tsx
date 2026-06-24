import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import Button from "../../components/atoms/Button";
import style from "./SignUp.module.scss";

export default function SignUp() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    navigate("/membership");
    return null;
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      toast.success("Account created. Welcome to FitReserve.");
      navigate("/membership");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <Title text="Create Account" size="small" textAlign="left" />
          <Paragraph
            text="Join FitReserve and begin your cinematic fitness journey."
            size="small"
          />
        </div>

        <form className={style.form} onSubmit={handleSubmit} noValidate>
          <div className={style.row}>
            <div className={style.field}>
              <label htmlFor="firstName" className={style.label}>
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={style.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                required
                autoComplete="given-name"
              />
            </div>

            <div className={style.field}>
              <label htmlFor="lastName" className={style.label}>
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={style.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className={style.field}>
            <label htmlFor="email" className={style.label}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={style.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className={style.field}>
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={style.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />
          </div>

          <div className={style.actions}>
            <Button
              label={isSubmitting ? "Creating account…" : "Create Account"}
              onClick={() => {}}
              type="submit"
              theme="primary"
              disabled={isSubmitting}
            />
          </div>
        </form>

        <div className={style.footer}>
          <Paragraph
            text={
              <>
                {"Already a member? "}
                <Link to="/login" className={style.link}>
                  Sign in
                </Link>
              </>
            }
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
