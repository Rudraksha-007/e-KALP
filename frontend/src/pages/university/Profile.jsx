import React, { useState, useEffect } from "react";
import { Mail, Hash, Building2, BadgeCheck } from "lucide-react";
import Layout from "./Layout";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/api";

/**
 * ------------------------------------------------------------------
 *  SPOC PROFILE
 *  Live data from GET /user/{role}/me (SpocResponse):
 *    { role, id, email, name, uni_id, registration_number, subject_expertise }
 * ------------------------------------------------------------------
 */

function initialsFromName(name) {
  return (
    name
      ?.split(/\s+/)
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-neutral-100 last:border-none">
      <div className="w-9 h-9 rounded-lg bg-neutral-100 text-neutral-500 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-mono font-bold tracking-[0.1em] text-neutral-400">
          {label.toUpperCase()}
        </p>
        <p className="text-sm font-semibold text-neutral-900 mt-0.5 break-all">{value ?? "—"}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user: sessionUser } = useAuth();
  const [profile, setProfile] = useState(sessionUser ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Prefer the role stored in the session so this works for any account type.
    const role = sessionUser?.type ?? "spocuni";

    authApi
      .me(role)
      .then((res) => {
        if (cancelled) return;
        setProfile(res.data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load profile.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sessionUser?.type]);

  if (loading && !profile) {
    return (
      <Layout pageTitle="My Profile">
        <p className="text-sm text-neutral-500">Loading profile…</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout pageTitle="My Profile">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          {error}
        </div>
      </Layout>
    );
  }

  const expertise = profile?.subject_expertise ?? [];

  return (
    <Layout pageTitle="My Profile">
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 text-white text-xl font-bold flex items-center justify-center shrink-0">
          {initialsFromName(profile?.name)}
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-neutral-950">{profile?.name ?? "—"}</h2>
          <p className="text-sm text-neutral-500 mt-1 font-mono">
            {profile?.email ?? "—"}
          </p>
          <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-mono font-bold tracking-wide text-orange-600 bg-orange-50 px-2.5 py-1">
            <BadgeCheck className="w-3.5 h-3.5" />
            {(profile?.role ?? "spocuni").toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 rounded-2xl border border-neutral-200 bg-white px-6 py-4">
          <InfoRow icon={Mail} label="Email" value={profile?.email} />
          <InfoRow icon={Hash} label="User ID" value={profile?.id} />
          <InfoRow icon={Building2} label="University ID" value={profile?.uni_id} />
          <InfoRow
            icon={BadgeCheck}
            label="Registration Number"
            value={profile?.registration_number}
          />
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
          <p className="text-[11px] font-mono font-bold tracking-[0.1em] text-neutral-400 mb-3">
            SUBJECT EXPERTISE
          </p>
          {expertise.length === 0 ? (
            <p className="text-sm text-neutral-500">No subject expertise set.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {expertise.map((subject) => (
                <span
                  key={subject}
                  className="text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full px-2.5 py-1"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}