-- 1) Restrict settings to signed-in users only
DROP POLICY IF EXISTS "settings public read" ON public.settings;
REVOKE SELECT ON public.settings FROM anon;
CREATE POLICY "settings authenticated read" ON public.settings FOR SELECT TO authenticated USING (true);

-- 2) has_role: switch to SECURITY INVOKER (reads caller's own role rows only)
DROP POLICY IF EXISTS "admin read roles" ON public.user_roles;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;