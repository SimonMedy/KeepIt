# KeepIt

Mini-application mobile de prise de notes avec Expo, NativeWind et Supabase.

## Prérequis

- Node.js 20 ou plus récent
- pnpm
- Un projet Supabase
- Expo Go sur un téléphone, ou un navigateur pour le test web

## Installation

```bash
git clone <url-du-depot>
cd KeepIt
pnpm install
Copy-Item .env.example .env
```

Ouvrez ensuite `.env` et renseignez les deux valeurs de votre projet Supabase :

```env
EXPO_PUBLIC_SUPABASE_URL=https://votre-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_votre_cle_publique
```

La clé publique se trouve dans Supabase, dans **Connect** ou **Project Settings > API**. Ne jamais ajouter `.env` au dépôt.

## Créer la base de données

Les migrations versionnées créent la table `notes`, les règles RLS et les droits nécessaires.

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref VOTRE_PROJECT_REF
pnpm run db:push
```

Pour repartir de zéro sur un projet de développement uniquement (commande destructive) :

```bash
pnpm exec supabase db reset --linked --no-seed
```

## Lancer et tester

```bash
pnpm start -- --clear
```

Scannez le QR code avec Expo Go ou ouvrez la version web. Vérifiez ce parcours :

1. Créer une note avec le champ d'ajout.
2. Ouvrir la note, puis modifier son titre et son contenu.
3. Ajouter ou retirer la note des favoris.
4. Tester les écrans Favoris et Réglages, dont le thème sombre.
5. Supprimer la note si besoin.

## Fonctionnalités

- Liste Supabase dans une `FlatList`, avec chargement, erreur et liste vide.
- Ajout, modification et suppression avec rafraîchissement de la liste.
- Écran détail et navigation avec passage de la note.
- Bonus : favoris persistants, thème clair et style.

## Scripts utiles

```bash
pnpm start
pnpm run db:push
pnpm run db:push:dry
pnpm run db:status
```
