-- =====================================================================
-- SCRIPT SQL DE CONFIGURATION SUPABASE POUR KEEPIT (NÉONOTES)
-- =====================================================================
-- À exécuter dans l'éditeur SQL de votre projet Supabase (https://app.supabase.com)
-- ---------------------------------------------------------------------

-- 1. Création de la table `notes`
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Activation de la sécurité au niveau des lignes (Row Level Security - RLS)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Les politiques RLS définissent les lignes accessibles, mais n'accordent pas
-- les privilèges SQL eux-mêmes. Sans ces droits, l'API REST renvoie 401/42501.
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.notes TO anon;

-- 3. Suppression des anciennes politiques si existantes pour éviter les conflits
DROP POLICY IF EXISTS "Autoriser lecture publique des notes" ON public.notes;
DROP POLICY IF EXISTS "Autoriser insertion publique de notes" ON public.notes;
DROP POLICY IF EXISTS "Autoriser modification publique de notes" ON public.notes;
DROP POLICY IF EXISTS "Autoriser suppression publique de notes" ON public.notes;

-- 4. Polices de sécurité publiques (Autorise la lecture/écriture/suppression)
CREATE POLICY "Autoriser lecture publique des notes" 
    ON public.notes FOR SELECT 
    USING (true);

CREATE POLICY "Autoriser insertion publique de notes" 
    ON public.notes FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Autoriser modification publique de notes"
    ON public.notes FOR UPDATE
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Autoriser modification publique de notes" 
    ON public.notes FOR UPDATE 
    USING (true);

CREATE POLICY "Autoriser suppression publique de notes" 
    ON public.notes FOR DELETE 
    USING (true);

-- 5. Index pour accélérer le tri par date de création décroissante
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON public.notes (created_at DESC);

-- 6. Données de démonstration (Données de test initiales)
INSERT INTO public.notes (title, content, created_at)
VALUES 
    (
        'Réunion Stratégie Q3', 
        $$Points abordés durant la réunion :
- Validation du budget marketing Q3
- Refonte de l'interface utilisateur de KeepIt
- Planification du lancement bêta en Septembre.$$,
        NOW() - INTERVAL '2 hours'
    ),
    (
        'Idées de projet Design System', 
        $$Inspirations tirées du guide Material & Tailwind :
- Adopter la couleur Indigo (#6366F1 / #4648D4) comme couleur primaire.
- Utiliser des cartes légèrement arrondies (12px rounded-xl) avec ombre diffusée.
- Police Inter avec hiérarchie typographique stricte.$$,
        NOW() - INTERVAL '1 day'
    ),
    (
        'Liste de courses', 
        $$Acheter pour le dîner du week-end :
- Poulet fermier
- Crème fraîche & Beurre demi-sel
- Pommes de terre grenailles & Carottes fanes
- Baguette tradition bien cuite.$$,
        NOW() - INTERVAL '3 days'
    ),
    (
        'Notes de lecture: Minimalisme', 
        $$La simplicité ne consiste pas à ajouter des choses mineures, mais à supprimer les choses superflues.
Focus sur la clarté et l'efficacité digitale.$$,
        NOW() - INTERVAL '7 days'
    );
