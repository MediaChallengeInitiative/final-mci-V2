// data/navigation-data.ts
import { NavItem, SocialLink } from "@/interface/nav";
import { getPlatforms } from "@/lib/api/platforms";
import {
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn
} from "react-icons/fa6";

export const socialLinks: SocialLink[] = [
  {
    icon: FaXTwitter,
    href: "https://x.com/imchallengeug?lang=en",
    label: "X",
    color: "#1DA1F2"
  },
  {
    icon: FaFacebook,
    href: "#",
    label: "Facebook",
    color: "#4267B2"
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/mediachallengeug",
    label: "Instagram",
    color: "#E4405F"
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/mpindi-abaas-b385a121",
    label: "LinkedIn",
    color: "#0A66C2"
  },
  {
    icon: FaYoutube,
    href: "https://www.youtube.com/c/MediaChallengeInitiative",
    label: "YouTube",
    color: "#FF0000"
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@mediachallengeug",
    label: "TikTok",
    color: "#000000"
  }
];

export async function getNavItems(): Promise<NavItem[]> {
  const { data: platforms } = await getPlatforms();

  const baseNavItems: NavItem[] = [
    {
      title: "Home",
      path: "/",
      description: "Welcome to our platform"
    },
    {
      title: "Who We Are",
      path: "/#",
      description: "Learn about our organization",
      subMenu: [
        {
          title: "Our Team",
          path: "/who-we-are/team",
          description: "Meet our dedicated team"
        },
        // {
        //   title: "Our History",
        //   path: "/who-we-are/history",
        //   description: "Our journey through time"
        // },
        // {
        //   title: "Our Values",
        //   path: "/who-we-are/values",
        //   description: "What drives us forward"
        // },
        {
          title: "Our Partners",
          path: "/who-we-are/our-partners",
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
          path: "/programs/next-generation-of-journalists",
          description: "Supporting emerging media talent"
        },
        {
          title: "Media Innovations",
          path: "/programs/media-innovations-for-media-viability",
          description: "Advancing media technology"
        },
        {
          title: "Content Catalyst",
          path: "https://catalyst.mciug.org/",
          description: "Accelerating content creation"
        },
        {
          title: "Digital Literacy",
          path: "/programs/mil4kids",
          description: "Promoting media literacy"
        }
      ]
    },
    {
      title: "Platforms",
      path: "/platforms",
      description: "Our digital solutions",
      subMenu: platforms.map((platform) => ({
        title: platform.name,
        path: platform.link
        // description: platform.description
      }))
    },
    {
      title: "Press",
      path: "#",
      description: "News and updates",
      subMenu: [
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
      path: "/contact-us",
      description: "Get in touch with us"
    }
  ];

  return baseNavItems;
}

// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
//   FaTwitter,
//   FaTiktok
// } from "react-icons/fa";
// import { NavItem, SocialLink } from "@/interface/nav";

// export const navItems: NavItem[] = [
//   {
//     title: "Home",
//     path: "/",
//     description: "Welcome to our platform"
//   },
//   {
//     title: "Who We Are",
//     path: "/who-we-are",
//     description: "Learn about our organization",
//     subMenu: [
//       {
//         title: "Our Staff",
//         path: "/who-we-are/staff",
//         description: "Meet our dedicated team"
//       },
//       {
//         title: "Our Board",
//         path: "/who-we-are/board",
//         description: "Meet our board members"
//       },
//       {
//         title: "Our History",
//         path: "/who-we-are/history",
//         description: "Our journey through time"
//       },
//       {
//         title: "Our Values",
//         path: "/who-we-are/values",
//         description: "What drives us forward"
//       },
//       {
//         title: "Our Partners",
//         path: "/who-we-are/our-partners",
//         description: "Organizations we work with"
//       }
//     ]
//   },
//   {
//     title: "Programs",
//     path: "/programs",
//     description: "Explore our initiatives",
//     subMenu: [
//       {
//         title: "Next Generation of Journalists",
//         path: "/programs/next-generation-of-journalists",
//         description: "Supporting emerging media talent"
//       },
//       {
//         title: "Media Innovations",
//         path: "/programs/media-innovations-for-media-viability",
//         description: "Advancing media technology"
//       },
//       {
//         title: "Content Catalyst",
//         path: "https://catalyst.mciug.org/",
//         description: "Accelerating content creation"
//       },
//       {
//         title: "Digital Literacy",
//         path: "/programs/mil4kids",
//         description: "Promoting media literacy"
//       }
//     ]
//   },
//   {
//     title: "Platforms",
//     path: "/platforms",
//     description: "Our digital solutions",
//     subMenu: [
//       {
//         title: "MCI Radio",
//         path: "https://mciradio.live/",
//         description: "Listen to our broadcasts"
//       },
//       {
//         title: "MCI Academy",
//         path: "https://academy.mciug.org/",
//         description: "Learn with us"
//       },
//       {
//         title: "MCI Media Hub",
//         path: "#",
//         description: "Access our media resources"
//       },
//       {
//         title: "Solutions Now Africa",
//         path: "https://solutionsnow.africa/",
//         description: "African media solutions"
//       }
//     ]
//   },
//   {
//     title: "Press",
//     path: "#",
//     description: "News and updates",
//     subMenu: [
//       {
//         title: "Articles",
//         path: "/press/articles",
//         description: "Featured stories"
//       },
//       {
//         title: "Blog",
//         path: "/press/blogs",
//         description: "Insights and thoughts"
//       }
//     ]
//   },
//   {
//     title: "Contact",
//     path: "#",
//     description: "Get in touch with us"
//   }
// ];

// export const socialLinks: SocialLink[] = [
//   {
//     icon: FaTwitter,
//     href: "https://x.com/imchallengeug?lang=en",
//     label: "X",
//     color: "#1DA1F2"
//   },
//   {
//     icon: FaFacebook,
//     href: "#",
//     label: "Facebook",
//     color: "#4267B2"
//   },
//   {
//     icon: FaInstagram,
//     href: "https://www.instagram.com/mediachallengeug?igsh=d3A3ZHYyem1ocHFu",
//     label: "Instagram",
//     color: "#E4405F"
//   },
//   {
//     icon: FaLinkedinIn,
//     href: "https://www.linkedin.com/in/mpindi-abaas-b385a121/?originalSubdomain=ug",
//     label: "LinkedIn",
//     color: "#0A66C2"
//   },
//   {
//     icon: FaYoutube,
//     href: "https://www.youtube.com/c/MediaChallengeInitiative",
//     label: "YouTube",
//     color: "#FF0000"
//   },
//   {
//     icon: FaTiktok,
//     href: "https://www.tiktok.com/@mediachallengeug?_t=ZM-8tQ7xugzUN3&_r=1",
//     label: "TikTok",
//     color: "#000000"
//   }
// ];
