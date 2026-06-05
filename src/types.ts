export interface ContactInfo {
  office: string;
  whatsapp: string;
  email: string;
}

export interface HighlightItem {
  title: string;
  description: string;
}

export interface SchoolInfo {
  id: string;
  name: string;
  shortName: string;
  type: string;
  tagline: string;
  longDescription: string;
  highlights: HighlightItem[];
  bulletPoints: string[];
  contact: ContactInfo;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    bgGlow: string;
    ribbonColor: string;
  };
}

export interface FeatureCard {
  title: string;
  description: string;
  iconName: string;
  longDescription: string;
}

export interface InquiryFormData {
  studentName: string;
  parentName: string;
  phoneNumber: string;
  email: string;
  selectedSchool: string;
  grade: string;
  message: string;
}
