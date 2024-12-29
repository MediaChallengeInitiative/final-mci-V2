import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
  FaTiktok
} from "react-icons/fa";
import { NavItem, SocialLink } from "@/interface/nav";

export const navItems: NavItem[] = [
  {
    title: "Home",
    path: "/",
    description: "Welcome to our platform"
  },
  {
    title: "Who We Are",
    path: "/who-we-are",
    description: "Learn about our organization",
    subMenu: [
      {
        title: "Our Staff",
        path: "/who-we-are/staff",
        description: "Meet our dedicated team"
      },
      {
        title: "Our Board",
        path: "/who-we-are/board",
        description: "Meet our board members"
      },
      {
        title: "Our History",
        path: "/who-we-are/history",
        description: "Our journey through time"
      },
      {
        title: "Our Values",
        path: "/who-we-are/values",
        description: "What drives us forward"
      },
      {
        title: "Our Partners",
        path: "/who-we-are/partners",
        description: "Organizations we work with"
      }
    ]
  },
  {
    title: "Programs",
    path: "/programs",
    description: "Explore our initiatives",
    subMenu: [
      {
        title: "Next Generation of Journalists",
        path: "/programs/next-gen-journalists",
        description: "Supporting emerging media talent"
      },
      {
        title: "Media Innovations",
        path: "/programs/media-innovations-for-media-viability",
        description: "Advancing media technology"
      },
      {
        title: "Content Catalyst",
        path: "/programs/content-catalyst",
        description: "Accelerating content creation"
      },
      {
        title: "Digital Literacy",
        path: "/programs/digital-literacy",
        description: "Promoting media literacy"
      }
    ]
  },
  {
    title: "Platforms",
    path: "/platforms",
    description: "Our digital solutions",
    subMenu: [
      {
        title: "MCI Radio",
        path: "/platforms/radio",
        description: "Listen to our broadcasts"
      },
      {
        title: "MCI Academy",
        path: "/platforms/academy",
        description: "Learn with us"
      },
      {
        title: "MCI Media Hub",
        path: "/platforms/media-hub",
        description: "Access our media resources"
      },
      {
        title: "Solutions Now Africa",
        path: "/platforms/solutions-africa",
        description: "African media solutions"
      }
    ]
  },
  {
    title: "Press",
    path: "/press",
    description: "News and updates",
    subMenu: [
      // {
      //   title: "News",
      //   path: "/press/news",
      //   description: "Latest updates"
      // },
      // {
      //   title: "Press Releases",
      //   path: "/press/releases",
      //   description: "Official announcements"
      // },
      // {
      //   title: "Media Kit",
      //   path: "/press/media-kit",
      //   description: "Download our assets"
      // },
      {
        title: "Articles",
        path: "/press/articles",
        description: "Featured stories"
      },
      {
        title: "Blog",
        path: "/press/blogs",
        description: "Insights and thoughts"
      }
    ]
  },
  {
    title: "Contact",
    path: "/contact",
    description: "Get in touch with us"
  }
];

export const socialLinks: SocialLink[] = [
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
    color: "#1DA1F2"
  },
  {
    icon: FaFacebook,
    href: "https://facebook.com",
    label: "Facebook",
    color: "#4267B2"
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "#E4405F"
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "#0A66C2"
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
    color: "#FF0000"
  },
  {
    icon: FaTiktok,
    href: "https://tiktok.com",
    label: "TikTok",
    color: "#000000"
  }
];
