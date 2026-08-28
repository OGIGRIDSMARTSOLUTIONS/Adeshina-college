export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  items: NavItem[];
}
