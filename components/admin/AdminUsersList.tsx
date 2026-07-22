"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { inputClass } from "@/components/admin/form-controls";
import { inviteAdmin, removeAdmin } from "@/lib/actions/admins";

type Profile = { id: string; email: string; full_name: string | null };

export function AdminUsersList({ profiles, currentUserId }: { profiles: Profile[]; currentUserId: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await inviteAdmin(email);
      if (result.error) setError(result.error);
      else setEmail("");
    });
  }

  return (
    <div>
      <div className="divide-y divide-border border-t border-b border-border">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex items-center justify-between py-3 text-sm">
            <span>
              {profile.full_name || profile.email}
              {profile.id === currentUserId && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
            </span>
            {profile.id !== currentUserId && (
              <button
                type="button"
                aria-label={`Remove ${profile.email}`}
                onClick={() => {
                  if (confirm(`Remove ${profile.email}? They will lose admin access immediately.`)) {
                    startTransition(async () => {
                      await removeAdmin(profile.id);
                    });
                  }
                }}
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" strokeWidth={1.5} />
              </button>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleInvite} className="mt-5 flex gap-3">
        <input
          type="email"
          required
          placeholder="new-admin@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass + " mt-0"}
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 bg-primary px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase hover:bg-[var(--gold)] hover:text-primary disabled:opacity-50"
        >
          Invite
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
