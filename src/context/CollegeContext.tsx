import { createContext, useContext, ReactNode } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { colleges } from '@/data/colleges';
import { College } from '@/types/college';
import { CollegeId, isCollegeId, collegePath } from '@/lib/collegePaths';

type PathSegment =
  | ''
  | 'about'
  | 'programmes'
  | 'admissions'
  | 'news'
  | 'contact'
  | 'apply';

interface CollegeContextValue {
  college: College;
  collegeId: CollegeId;
  path: (segment?: PathSegment) => string;
}

const CollegeContext = createContext<CollegeContextValue | null>(null);

export function CollegeProvider({ children }: { children: ReactNode }) {
  const { collegeId: rawId } = useParams<{ collegeId: string }>();

  if (!isCollegeId(rawId)) {
    return <Navigate to="/" replace />;
  }

  const college = colleges.find((c) => c.id === rawId);
  if (!college) {
    return <Navigate to="/" replace />;
  }

  const value: CollegeContextValue = {
    college,
    collegeId: rawId,
    path: (segment = '') => collegePath(rawId, segment),
  };

  return <CollegeContext.Provider value={value}>{children}</CollegeContext.Provider>;
}

export function useCollege(): CollegeContextValue {
  const ctx = useContext(CollegeContext);
  if (!ctx) {
    throw new Error('useCollege must be used within CollegeProvider');
  }
  return ctx;
}

/** Works on Group pages (null) and inside a college mini-site */
export function useOptionalCollege(): CollegeContextValue | null {
  return useContext(CollegeContext);
}

/** Resolve links for Group or college scope */
export function useScopedPath() {
  const college = useOptionalCollege();

  const path = (segment: PathSegment = '') => {
    if (college) return college.path(segment);
    if (!segment) return '/';
    if (segment === 'programmes' || segment === 'admissions' || segment === 'apply') {
      return '/#colleges';
    }
    return `/${segment}`;
  };

  return { college, path, isGroup: !college };
}
