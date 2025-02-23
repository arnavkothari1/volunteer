export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  INTERESTS: '/interests',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  COLLABORATE: '/collaborate'
} as const;

// Auth route protection
export const publicRoutes = [
  '/auth/login',
  '/auth/register'
];

export const authRoutes = [
  ROUTES.INTERESTS,
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.COLLABORATE
]; 