export const Routes = {
  HOME: 'Home',
  DETAILS: 'Details',
  LAYOUT_LAB: 'LayoutLab',
  LOGIN: 'Login',
  REGISTER: 'Register',
  PROFILE: 'Profile',
} as const;

export type RouteNames = (typeof Routes)[keyof typeof Routes];
