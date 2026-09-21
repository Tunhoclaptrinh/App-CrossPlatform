export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string;
  route?: string;
}
