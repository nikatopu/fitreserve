import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Title from "../../components/atoms/Title";
import Paragraph from "../../components/atoms/Paragraph";
import Button from "../../components/atoms/Button";
import style from "./Login.module.scss";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      await login({ email, password });
      toast.success("Welcome back.");
      navigate("/membership");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className={style.header}>
          <Title text="Member Login" size="small" textAlign="left" />
          <Paragraph
            text="Sign in to access your membership and bookings."
            size="small"
          />
        </div>

        <form className={style.form} onSubmit={handleSubmit} noValidate>
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
              autoComplete="current-password"
            />
          </div>

          <div className={style.actions}>
            <Button
              label={isSubmitting ? "Signing in…" : "Sign In"}
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
                {"Don't have an account? "}
                <Link to="/signup" className={style.link}>
                  Create one
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
