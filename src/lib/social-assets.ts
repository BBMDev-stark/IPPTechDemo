export type SocialAsset = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sourceUrl: string;
  sourceLabel: string;
  location: string;
  category: "education" | "commercial";
};

// Public posts from the manufacturer. Captions preserve the verified context.
export const socialAssets = {
  "robogAwards": {
    "src": "/images/social/robog-awards-2026.webp",
    "alt": "Học sinh nhận giải tại ROBOG miền Bắc 2026, cùng robot Cruzr.",
    "caption": "Trao giải ROBOG miền Bắc 2026.",
    "width": 800,
    "height": 530,
    "sourceUrl": "https://www.linkedin.com/posts/ubtechedu-global_ubtecheducation-ugot-robog-activity-7466111168420413441-PM3Q",
    "sourceLabel": "UBTECH Education",
    "location": "Miền Bắc, Việt Nam",
    "category": "education"
  },
  "robogTeam": {
    "src": "/images/social/robog-team-2026.webp",
    "alt": "Đội học sinh chụp ảnh tại ROBOG miền Bắc 2026.",
    "caption": "Đội thi tại ROBOG miền Bắc 2026.",
    "width": 800,
    "height": 533,
    "sourceUrl": "https://www.linkedin.com/posts/ubtechedu-global_ubtecheducation-ugot-robog-activity-7466111168420413441-PM3Q",
    "sourceLabel": "UBTECH Education",
    "location": "Miền Bắc, Việt Nam",
    "category": "education"
  },
  "robogArena": {
    "src": "/images/social/robog-ugot-arena-2026.webp",
    "alt": "Học sinh điều khiển robot UGOT trên sa bàn tại ROBOG miền Bắc 2026.",
    "caption": "Thực hành với UGOT trên sa bàn ROBOG miền Bắc 2026.",
    "width": 800,
    "height": 533,
    "sourceUrl": "https://www.linkedin.com/posts/ubtechedu-global_ubtecheducation-ugot-robog-activity-7466111168420413441-PM3Q",
    "sourceLabel": "UBTECH Education",
    "location": "Miền Bắc, Việt Nam",
    "category": "education"
  },
  "robogPodium": {
    "src": "/images/social/robog-podium-2026.webp",
    "alt": "Học sinh và robot Cruzr trong hoạt động trao giải ROBOG miền Bắc 2026.",
    "caption": "Khoảnh khắc trao giải ROBOG miền Bắc 2026.",
    "width": 800,
    "height": 533,
    "sourceUrl": "https://www.linkedin.com/posts/ubtechedu-global_ubtecheducation-ugot-robog-activity-7466111168420413441-PM3Q",
    "sourceLabel": "UBTECH Education",
    "location": "Miền Bắc, Việt Nam",
    "category": "education"
  },
  "robogProgramming": {
    "src": "/images/social/robog-ugot-programming-2026.webp",
    "alt": "Học sinh sử dụng máy tính bảng với robot UGOT tại ROBOG miền Bắc 2026.",
    "caption": "Học sinh thực hành UGOT tại ROBOG miền Bắc 2026.",
    "width": 800,
    "height": 533,
    "sourceUrl": "https://www.linkedin.com/posts/ubtechedu-global_ubtecheducation-ugot-robog-activity-7466111168420413441-PM3Q",
    "sourceLabel": "UBTECH Education",
    "location": "Miền Bắc, Việt Nam",
    "category": "education"
  },
  "cruzrAirport": {
    "src": "/images/social/cruzr-kunming-airport.webp",
    "alt": "Robot Cruzr tại quầy sân bay Côn Minh, Trung Quốc.",
    "caption": "Cruzr tại sân bay Côn Minh, Trung Quốc.",
    "width": 500,
    "height": 375,
    "sourceUrl": "https://www.linkedin.com/posts/ubtech-commercial-robot_robots-management-ubtech-activity-7085569745432842240-YudB",
    "sourceLabel": "UBTECH Commercial Robots",
    "location": "Côn Minh, Trung Quốc",
    "category": "commercial"
  },
  "cruzrMuseum": {
    "src": "/images/social/cruzr-museum.webp",
    "alt": "Robot Cruzr tương tác với khách trong không gian bảo tàng.",
    "caption": "Ứng dụng Cruzr trong không gian bảo tàng, từ UBTECH Commercial Robots.",
    "width": 826,
    "height": 434,
    "sourceUrl": "https://www.linkedin.com/posts/ubtech-commercial-robot_ubtech-cruzr-techinnovation-activity-7209097332850606080-6gEG",
    "sourceLabel": "UBTECH Commercial Robots",
    "location": "Bối cảnh quốc tế, không phải dự án IPPTech tại Việt Nam",
    "category": "commercial"
  }
} as const satisfies Record<string, SocialAsset>;

export const robogGallery: SocialAsset[] = [socialAssets.robogArena, socialAssets.robogProgramming, socialAssets.robogAwards, socialAssets.robogTeam, socialAssets.robogPodium];

export const commercialGallery: SocialAsset[] = [socialAssets.cruzrMuseum, socialAssets.cruzrAirport];
