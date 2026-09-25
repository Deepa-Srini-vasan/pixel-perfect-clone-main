import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminLogin = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("admin@plumtek.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm lg:grid-cols-2">
          <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[4px] text-primary-foreground/75">Administration</p>
              <h1 className="mt-4 max-w-md font-heading text-4xl font-bold leading-tight">Manage products, quotes, and catalog content from one place.</h1>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7 text-primary-foreground/90">
                Login to edit products, upload images, and keep the storefront synced with the database.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground">Admin Login</h2>
              <p className="mt-2 text-sm text-muted-foreground">Use your admin credentials to access the dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="adminEmail">Email</label>
                <input
                  id="adminEmail"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="adminPassword">Password</label>
                <input
                  id="adminPassword"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[2px] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-xs text-muted-foreground">
              Local default: <span className="font-semibold text-foreground">admin@plumtek.com</span> / <span className="font-semibold text-foreground">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
