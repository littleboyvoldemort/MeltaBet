import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { getMyAccount } from "@/lib/betting.functions";
import { DEMO_MATCHES } from "@/lib/demo-matches";
import { LEGACY_MERCHANT_SETTING_KEY, MERCHANT_SETTING_KEY } from "@/lib/settings";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading };
}

export function useAccount(enabled: boolean) {
  const fetchAccount = useServerFn(getMyAccount);
  return useQuery({
    queryKey: ["account"],
    queryFn: () => fetchAccount(),
    enabled,
  });
}

export function useInvalidateAccount() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["account"] });
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["bets"] });
  };
}

export function useDepositWallet() {
  return useQuery({
    queryKey: ["deposit-wallet"],
    queryFn: async () => {
      const { data: current, error: currentError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", MERCHANT_SETTING_KEY)
        .maybeSingle();

      if (!currentError && current?.value) return current.value;

      const { data: legacy, error: legacyError } = await supabase
        .from("settings")
        .select("value")
        .eq("key", LEGACY_MERCHANT_SETTING_KEY)
        .maybeSingle();

      if (legacyError && currentError) {
        console.warn("[settings] Supabase unavailable:", currentError.message);
        return "";
      }

      const value = current?.value ?? legacy?.value ?? "";
      // Ignore legacy crypto placeholder addresses
      if (value.startsWith("0x")) return "";
      return value;
    },
    retry: false,
    staleTime: 60_000,
  });
}

export type Match = {
  id: string;
  league: string;
  home_team: string;
  away_team: string;
  start_time: string;
  odds_home: number;
  odds_draw: number;
  odds_away: number;
  is_open: boolean;
};

export function useMatches() {
  return useQuery({
    queryKey: ["matches"],
    queryFn: async (): Promise<{ matches: Match[]; isDemo: boolean }> => {
      const { data, error } = await supabase
        .from("matches")
        .select("id, league, home_team, away_team, start_time, odds_home, odds_draw, odds_away, is_open")
        .order("start_time", { ascending: true });

      if (error) {
        console.warn("[matches] Supabase unavailable, using demo data:", error.message);
        return { matches: DEMO_MATCHES, isDemo: true };
      }

      const matches = (data ?? []).map((m) => ({
        ...m,
        odds_home: Number(m.odds_home),
        odds_draw: Number(m.odds_draw),
        odds_away: Number(m.odds_away),
      }));

      if (matches.length === 0) {
        return { matches: DEMO_MATCHES, isDemo: true };
      }

      return { matches, isDemo: false };
    },
    retry: false,
    staleTime: 60_000,
  });
}

export { useMutation };
