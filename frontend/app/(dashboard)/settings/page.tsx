"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User, Mail, Wallet, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import api from "@/lib/api";
import { useRouter } from "next/navigation";
import SettingsSkeleton from "@/components/settings/SettingsSkeleton";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  user_income: number;
}

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/auth/me");

        setProfile(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const handleLogout = () => {
    Cookies.remove("access-token");

    router.push("/auth");
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  if (!profile) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-400">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-400">Account Settings</p>

        <h1 className="text-4xl font-bold text-white">Profile</h1>
      </div>

      {/* Profile Card */}
      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2E62FF]/20">
              <User className="h-10 w-10 text-[#2E62FF]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile.username}
              </h2>

              <p className="text-slate-400">Finance Manager User</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#2E62FF]" />

              <h3 className="font-semibold text-white">Email Address</h3>
            </div>

            <p className="text-slate-300">{profile.email}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-[#111C3D]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Wallet className="h-5 w-5 text-[#10B981]" />

              <h3 className="font-semibold text-white">Monthly Income</h3>
            </div>

            <p className="text-2xl font-bold text-[#10B981]">
              ₹{profile.user_income.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account Information */}
      <Card className="border-slate-800 bg-[#111C3D]">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Account Information
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400">User ID</span>

              <span className="text-white">#{profile.id}</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400">Username</span>

              <span className="text-white">{profile.username}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>

              <span className="font-medium text-[#10B981]">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/20 bg-[#111C3D]">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-red-900">
            Danger Zone
          </h3>

          <Button onClick={handleLogout} variant="destructive">
            <LogOut className="mr-2 h-4 w-4 text-red-400" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
