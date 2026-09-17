import { SupabaseAuthGuard } from './supabase-auth.guard.js';

describe('SupabaseAuthGuard', () => {
  it('should be defined', () => {
    expect(new SupabaseAuthGuard({} as any)).toBeDefined();
  });
});
