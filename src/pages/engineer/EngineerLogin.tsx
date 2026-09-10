import { useState } from "react";
import { Layers, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EngineerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to engineer dashboard
    window.location.href = "/engineer/dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-lg bg-[#083F3C] flex items-center justify-center">
              <Layers size={20} className="text-white" />
            </div>
            <span className="font-display text-[22px] font-semibold text-[#242424] tracking-tight">
              Hover Lens
            </span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-display text-[32px] sm:text-[38px] font-bold text-[#242424] leading-tight mb-2">
            Engineer Login
          </h1>
          <p className="text-sm text-[#505050] mb-8">
            Access your schedule, job details, and upload reports.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
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
                className="h-12 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C] focus-visible:ring-offset-0"
                required
              />
            </div>

            <div className="space-y-2">
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
                className="h-12 border-[#D3D3D3] rounded-lg text-sm focus-visible:ring-[#083F3C] focus-visible:ring-offset-0"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#083F3C] hover:bg-[#083F3C]/90 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <LockKeyhole size={16} />
              Login
            </Button>
          </form>

          {/* Footer Links */}
          <div className="flex items-center justify-between mt-6 text-sm">
            <a href="#" className="text-[#505050] hover:text-[#242424] hover:underline">
              Forgot password?
            </a>
            <a href="#" className="text-[#505050] hover:text-[#242424] hover:underline">
              Create account
            </a>
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
        {/* Optional overlay for better contrast if needed */}
      </div>
    </div>
  );
};

export default EngineerLogin;