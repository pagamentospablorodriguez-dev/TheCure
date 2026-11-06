import { supabase } from '@/lib/supabase';

const SESSION_KEY = 'thecure_session_id';

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

async function fetchClientIp(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip || null;
  } catch {
    return null;
  }
}

export async function logCureSession(intention: string): Promise<void> {
  try {
    const sessionId = getOrCreateSessionId();
    const ipAddress = await fetchClientIp();

    await supabase.from('cure_sessions').insert({
      session_id: sessionId,
      ip_address: ipAddress,
      intention: intention.trim(),
    });
  } catch (error) {
    console.error('Failed to log session:', error);
  }
}
