import { IconType } from "react-icons";

export interface SubMenuItem {
  title: string;
  path: string;
  description?: string;
}

export interface NavItem {
  title: string;
  path: string;
  subMenu?: SubMenuItem[];
  description?: string;
}

export interface SocialLink {
  icon: IconType;
  href: string;
  label: string;
  color?: string;
}

export interface HeaderState {
  isMenuOpen: boolean;
  openDropdown: string | null;
  mobileOpenItems: string[];
  isScrolled: boolean;
  mounted: boolean;
}
