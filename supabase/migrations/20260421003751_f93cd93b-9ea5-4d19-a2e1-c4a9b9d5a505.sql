-- Fix function search_path
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Restrict notifications insert
DROP POLICY IF EXISTS "Anyone authenticated can create notifications" ON public.notifications;
CREATE POLICY "Users create notifications for self or via actor"
  ON public.notifications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = actor_id OR auth.uid() = user_id);