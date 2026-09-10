import { useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    window.location.href = "/customer/dashboard";
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
              required
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
              required
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
            <a href="#" className="text-primary font-medium hover:underline">
              Forgot password?
            </a>
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
          <a href="#" className="text-[#242424] font-semibold hover:underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;