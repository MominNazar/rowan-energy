import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showError("Please enter both email and password");
      return;
    }

    const session = JSON.stringify({
      email: email.trim(),
      loggedInAt: new Date().toISOString(),
    });

    if (rememberMe) {
      localStorage.setItem("customerAuth", session);
      sessionStorage.removeItem("customerAuth");
    } else {
      sessionStorage.setItem("customerAuth", session);
      localStorage.removeItem("customerAuth");
    }

    navigate("/customer/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAEAEA] p-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-sm p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <LockKeyhole size={22} className="text-white" />
          </div>
        </div>

        <h1 className="font-display text-2xl font-semibold text-[#242424] text-center mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-[#989898] text-center mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[#242424]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-border focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-[#242424]">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 border-border focus-visible:ring-primary"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#505050] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => showSuccess("Password reset link sent (demo)")}
              className="text-primary font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white rounded-md text-sm font-semibold"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-[#989898]">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => showSuccess("Account creation coming soon (demo)")}
            className="text-[#242424] font-semibold hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
