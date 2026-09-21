export const Routes = {
  WEATHER: 'Weather',
  HOME: 'Home',
  DETAILS: 'Details',

  LOGIN: 'Login',
  REGISTER: 'Register',
  PROFILE: 'Profile',
} as const;

export type RouteNames = (typeof Routes)[keyof typeof Routes];
