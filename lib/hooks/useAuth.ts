"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAdminStore } from '@/lib/stores/adminStore';

export function useAuth() {
  const router = useRouter();
  const { setUser, logout: logoutStore } = useAdminStore();

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    logoutStore();
    router.push('/admin/login');
  }, [logoutStore, router]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!profile) {
        await supabase.auth.signOut();
        router.push('/admin/login');
        return;
      }

      setUser({ ...session.user, ...profile });
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, setUser, logout]);

  return { logout };
}