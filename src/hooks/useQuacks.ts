import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type QuackStatus = "quero_fazer" | "fazendo" | "feito";

export interface ChecklistItem { id: string; text: string; done: boolean }
export interface TaggedFriend { id: string | number; name: string; username?: string }

export interface Quack {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string | null;
  tags: string[];
  status: QuackStatus;
  rating: number;
  checklist: ChecklistItem[];
  tagged_friends: TaggedFriend[];
  responsible_people: TaggedFriend[];
  start_date: string | null;
  end_date: string | null;
  progress: number;
  created_at: string;
  updated_at: string;
  // joined profile
  author?: { username: string; display_name: string | null; avatar_url: string | null } | null;
}

export interface QuackInput {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  status?: QuackStatus;
  rating?: number;
  checklist?: ChecklistItem[];
  tagged_friends?: TaggedFriend[];
  responsible_people?: TaggedFriend[];
  start_date?: string | null;
  end_date?: string | null;
  progress?: number;
}

/**
 * scope:
 *  - "feed"   -> own + friends quacks
 *  - "self"   -> only own quacks
 *  - userId   -> a specific user's quacks
 */
export const useQuacks = (scope: "feed" | "self" | string = "feed") => {
  const { user } = useAuth();
  const [quacks, setQuacks] = useState<Quack[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuacks = useCallback(async () => {
    if (!user) { setQuacks([]); setLoading(false); return; }
    setLoading(true);
    let q = supabase.from("quacks").select("*, author:profiles!quacks_user_id_fkey(username, display_name, avatar_url)").order("created_at", { ascending: false });
    if (scope === "self") q = q.eq("user_id", user.id);
    else if (scope !== "feed") q = q.eq("user_id", scope);
    const { data } = await q;
    setQuacks((data as unknown as Quack[]) ?? []);
    setLoading(false);
  }, [user, scope]);

  useEffect(() => { fetchQuacks(); }, [fetchQuacks]);

  const createQuack = async (input: QuackInput) => {
    if (!user) return { error: new Error("not authenticated") };
    const payload = { ...input, user_id: user.id } as never;
    const { data, error } = await supabase.from("quacks").insert(payload).select("*, author:profiles!quacks_user_id_fkey(username, display_name, avatar_url)").single();
    if (!error && data) setQuacks(prev => [data as unknown as Quack, ...prev]);
    return { data, error };
  };

  const updateQuack = async (id: string, patch: Partial<QuackInput>) => {
    const { data, error } = await supabase.from("quacks").update(patch as never).eq("id", id).select("*, author:profiles!quacks_user_id_fkey(username, display_name, avatar_url)").single();
    if (!error && data) setQuacks(prev => prev.map(q => q.id === id ? (data as unknown as Quack) : q));
    return { data, error };
  };

  const deleteQuack = async (id: string) => {
    const { error } = await supabase.from("quacks").delete().eq("id", id);
    if (!error) setQuacks(prev => prev.filter(q => q.id !== id));
    return { error };
  };

  return { quacks, loading, createQuack, updateQuack, deleteQuack, refetch: fetchQuacks };
};
