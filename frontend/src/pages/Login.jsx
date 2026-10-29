import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  function handleContinue(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setStatus("Enter your email and password to continue.");
      return;
    }

    setStatus(
      "Sign-in is ready for backend connection. No credentials were sent.",
    );
  }

  return (
    <main className="login-page">
      <a className="login-back" href="/" aria-label="Back to overview">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to sanctuary
      </a>

      <section className="login-card" aria-labelledby="login-title">
        <div className="login-brand" aria-hidden="true">
          <div className="login-emblem">
            <span>P</span>
          </div>
          <p>Pecfest / Digital gate</p>
        </div>

        <div className="login-copy">
          <p className="login-kicker">A Mystic Mikado · Official portal</p>
          <h1 id="login-title">Enter the festival</h1>
          <p className="login-intro">
            Sign in to your account to access passes, competitions and your
            personal festival schedule.
          </p>
        </div>

        <div className="login-action">
          <button
            className="google-button"
            type="button"
            onClick={() =>
              setStatus("Google sign-in needs authentication configuration.")
            }
          >
            <svg
              className="google-mark"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.6 12.227c0-.71-.064-1.39-.182-2.045H12v3.868h5.382a4.602 4.602 0 0 1-1.997 3.018v2.51h3.235c1.892-1.742 2.98-4.308 2.98-7.351Z"
              />
              <path
                fill="#34A853"
                d="M12 22c2.7 0 4.964-.895 6.62-2.422l-3.235-2.51c-.896.6-2.04.956-3.385.956-2.605 0-4.81-1.76-5.598-4.123H3.057v2.589A10 10 0 0 0 12 22Z"
              />
              <path
                fill="#FBBC05"
                d="M6.402 13.901A6.013 6.013 0 0 1 6.09 12c0-.66.113-1.302.312-1.901V7.51H3.057A10 10 0 0 0 2 12c0 1.614.386 3.141 1.057 4.49l3.345-2.589Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.976c1.468 0 2.784.505 3.822 1.493l2.868-2.868C16.959 3.01 14.695 2 12 2a10 10 0 0 0-8.943 5.51l3.345 2.589C7.19 7.736 9.395 5.976 12 5.976Z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="login-divider" aria-hidden="true">
            <span>or continue with email</span>
          </div>

          <form onSubmit={handleContinue}>
            <label className="login-field">
              <span>Email address</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="login-field">
              <span>Password</span>
              <span className="password-input">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  minLength={6}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                </button>
              </span>
            </label>

            <div className="login-options">
              <label>
                <input name="remember" type="checkbox" />
                Remember me
              </label>
              <a href="#forgot-password">Forgot password?</a>
            </div>

            {status && (
              <p className="login-status" role="status">
                {status}
              </p>
            )}

            <button className="login-submit" type="submit">
              Sign in
            </button>
          </form>

          <p className="login-signup">
            New to PECFEST? <a href="#create-account">Create an account</a>
          </p>

          <p className="login-privacy">
            By continuing, you agree to the festival terms and privacy policy.
          </p>
        </div>
      </section>
    </main>
  );
}
