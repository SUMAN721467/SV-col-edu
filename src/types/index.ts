export interface Address {
  plotNo: string;
  village: string;
  postOffice: string;
  blockTehsil: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  fullText: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  altEmail: string;
  website: string;
  officeHours: string;
}

export interface Recognition {
  course: string;
  code: string;
  ncteOrderNo: string;
  orderDate: string;
  authority: string;
  intake: number;
  currentAffiliation: string;
  affiliationMemoNo?: string;
  affiliationDate?: string;
  status: string;
}

export interface CollegeInfo {
  name: string;
  shortName: string;
  bengaliName: string;
  managedBy: string;
  establishedYear: number;
  category: string;
  president: string;
  principal: string;
  address: Address;
  contact: ContactInfo;
  recognitions: Recognition[];
}

export interface FacultyQualifications {
  bEd: string;
  mEd: string;
  maEd: string;
  masterSubject: string;
  phd: string;
  netSet: string;
}

export interface FacultyMember {
  slNo: number | string;
  section?: string;
  name: string;
  dob: string;
  age: string;
  category: string;
  designation: string;
  type: string;
  qualifications: FacultyQualifications;
  subject: string;
  experience: string;
  recognizedExp: string;
  initialAppt: string;
  joiningDate: string;
  bio?: string;
  avatar: string;
}

export interface StudentRecord {
  srNo: number;
  appId: string;
  name: string;
  subject: string;
  type: string;
  category: 'GEN' | 'SC' | 'ST' | 'OBC-A' | 'OBC-B';
}

export interface Notice {
  id: number;
  subject?: string;
  badge?: string;
  title: string;
  date: string;
  link?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: string;
}

export interface OfficialDocument {
  id: string;
  srNo?: number;
  title: string;
  subtitle?: string;
  category: string;
  categoryBadgeClass?: string;
  authority?: string;
  orderNo?: string;
  date?: string;
  fileSize?: string;
  pdfPath: string;
  pages?: number;
}

