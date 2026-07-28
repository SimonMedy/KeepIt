import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Expo injecte les variables EXPO_PUBLIC_* à la compilation. Les clés
// Supabase récentes commencent par `sb_publishable_` (et non plus seulement
// par `ey...`), il faut donc accepter toute clé non vide fournie par le projet.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim();

const isConfigured = Boolean(
  supabaseUrl && /^https?:\/\//.test(supabaseUrl) && supabaseAnonKey
);

// Ce cache très court évite un écran vide lors du passage entre Notes et Favoris.
// La base reste la source de vérité : chaque écran se rafraîchit en arrière-plan.
let notesCache = null;

export const supabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    })
  : null;

function requireClient() {
  if (!supabaseClient) {
    throw new Error(
      'Supabase n’est pas configuré. Vérifiez EXPO_PUBLIC_SUPABASE_URL et EXPO_PUBLIC_SUPABASE_ANON_KEY dans le fichier .env.'
    );
  }
  return supabaseClient;
}

/** Accès aux notes stockées dans la table publique `notes`. */
export const supabaseService = {
  async getNotes() {
    const { data, error } = await requireClient()
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    notesCache = data ?? [];
    return notesCache;
  },

  getCachedNotes() {
    return notesCache;
  },

  async insertNote(title, content = '') {
    const trimmedTitle = title?.trim();
    if (!trimmedTitle) {
      throw new Error('Le titre de la note ne peut pas être vide.');
    }

    const { data, error } = await requireClient()
      .from('notes')
      .insert({ title: trimmedTitle, content: content.trim() })
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (notesCache) notesCache = [data, ...notesCache];
    return data;
  },

  async deleteNote(id) {
    const { error } = await requireClient().from('notes').delete().eq('id', id);
    if (error) throw new Error(error.message);
    if (notesCache) notesCache = notesCache.filter((note) => note.id !== id);
  },

  async updateNote(id, title, content) {
    const trimmedTitle = title?.trim();
    if (!trimmedTitle) throw new Error('Le titre de la note ne peut pas être vide.');

    const { data, error } = await requireClient()
      .from('notes')
      .update({ title: trimmedTitle, content: content?.trim() || '' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (notesCache) notesCache = notesCache.map((note) => (note.id === id ? data : note));
    return data;
  },
};

export default supabaseClient;
