export interface AppUser {
  uid: string;
  email: string | null;
  name: string;
  role: 'admin' | 'user' | 'moderator';
  phone?: string;
  isActive: boolean;
}