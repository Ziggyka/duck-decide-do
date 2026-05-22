
-- 1. Notifications: restrict insert to actor_id = auth.uid() and require actor_id
ALTER TABLE public.notifications ALTER COLUMN actor_id SET NOT NULL;

DROP POLICY IF EXISTS "Users create notifications for self or via actor" ON public.notifications;
CREATE POLICY "Users create notifications as themselves"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = actor_id);

-- 2. Friendships: split UPDATE so only addressee can accept
DROP POLICY IF EXISTS "Users can update friendships involving them" ON public.friendships;

CREATE POLICY "Addressee can accept or update friendship"
ON public.friendships
FOR UPDATE
TO authenticated
USING (auth.uid() = addressee_id)
WITH CHECK (auth.uid() = addressee_id);

CREATE POLICY "Requester can cancel or keep pending"
ON public.friendships
FOR UPDATE
TO authenticated
USING (auth.uid() = requester_id)
WITH CHECK (auth.uid() = requester_id AND status <> 'accepted');

-- 3. Profiles: require authentication to view
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- 4. Revoke execute on SECURITY DEFINER helper from anon/authenticated (used only inside RLS policies)
REVOKE EXECUTE ON FUNCTION public.are_friends(uuid, uuid) FROM anon, authenticated, public;
