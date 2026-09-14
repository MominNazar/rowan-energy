import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showSuccess, showError } from "@/utils/toast";

const EngineerLogin = () => {
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
      localStorage.setItem("engineerAuth", session);
      sessionStorage.removeItem("engineerAuth");
    } else {
      sessionStorage.setItem("engineerAuth", session);
      localStorage.removeItem("engineerAuth");
    }

    showSuccess("Logged in successfully");
    navigate("/engineer/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row min-w-0 w-full">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-4 sm:p-8 lg:p-12 min-w-0 w-full">
        <div className="w-full max-w-[420px] min-w-0">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8 sm:mb-10">
            <div className="w-9 h-9 rounded-lg bg-[#083F3C] flex items-center justify-center shrink-0">
              <Layers size={20} className="text-white" />
            </div>
            <span className="font-display text-[22px] font-semibold text-[#242424] tracking-tight">
              Hover Lens
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-display text-[28px] sm:text-[38px] font-bold text-[#242424] leading-tight mb-2 break-words">
            Engineer Login
          </h1>
          <p className="text-sm text-[#505050] mb-8">
            Access your schedule, job details, and upload reports.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 w-full min-w-0">
            <div className="space-y-2 min-w-0">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#242424]"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C] focus-visible:ring-offset-0"
                required
              />
            </div>

            <div className="space-y-2 min-w-0">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#242424]"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C] focus-visible:ring-offset-0"
                required
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#505050] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 shrink-0 rounded border-[#D3D3D3] accent-[#083F3C] cursor-pointer"
              />
              Remember me
            </label>

            <Button
              type="submit"
              className="w-full h-12 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <LockKeyhole size={16} />
              Login
            </Button>
          </form>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-6 text-sm">
            <button
              type="button"
              onClick={() => showSuccess("Password reset link sent (demo)")}
              className="text-[#505050] hover:text-[#242424] hover:underline"
            >
              Forgot password?
            </button>
            <button
              type="button"
              onClick={() => showSuccess("Account creation coming soon (demo)")}
              className="text-[#505050] hover:text-[#242424] hover:underline"
            >
              Create account
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Drone Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden min-h-[500px] lg:min-h-screen">
        <img
          src="/drone-background.jpg"
          alt="Drone flying over forest"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default EngineerLogin;
