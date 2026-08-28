export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
}

export interface AdmissionInfo {
  applicationOpen: boolean;
  steps: AdmissionStep[];
  generalNotice: string;
}

// Admission requirements and guidelines will be populated with verified institutional details
export const admissionInfo: AdmissionInfo = {
  applicationOpen: false,
  steps: [],
  generalNotice: 'Official admission guidelines and application schedules will be announced here.',
};
