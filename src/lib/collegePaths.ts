export const COLLEGE_IDS = ['health-technology', 'education'] as const;

export type CollegeId = (typeof COLLEGE_IDS)[number];

export function isCollegeId(value: string | undefined): value is CollegeId {
  return COLLEGE_IDS.includes(value as CollegeId);
}

export function collegeBasePath(collegeId: CollegeId): string {
  return `/colleges/${collegeId}`;
}

export function collegePath(
  collegeId: CollegeId,
  segment:
    | ''
    | 'about'
    | 'programmes'
    | 'admissions'
    | 'news'
    | 'contact'
    | 'apply' = ''
): string {
  const base = collegeBasePath(collegeId);
  return segment ? `${base}/${segment}` : base;
}
