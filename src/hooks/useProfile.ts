import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  avatar_skin: string | null;
  level: number;
  xp: number;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) { setProfile(null); setLoading(false); return; }
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    setProfile(data as Profile | null);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const updateProfile = async (patch: Partial<Profile>) => {
    if (!user) return { error: new Error("not authenticated") };
    const { data, error } = await supabase.from("profiles").update(patch).eq("id", user.id).select().single();
    if (!error && data) setProfile(data as Profile);
    return { data, error };
  };

  return { profile, loading, updateProfile, refetch: fetchProfile };
};
