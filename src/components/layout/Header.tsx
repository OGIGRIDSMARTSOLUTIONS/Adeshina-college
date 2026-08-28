import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { mainNavItems } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { Container } from '@/components/common/Container';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collegesDropdownOpen, setCollegesDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Brand / Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-adeshina-blue">
              {siteConfig.institutionName}
            </span>
            <span className="text-xs uppercase tracking-widest text-muted">
              {siteConfig.location}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {mainNavItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setCollegesDropdownOpen(true)}
                    onMouseLeave={() => setCollegesDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center text-sm font-medium py-2 transition-colors ${
                        location.pathname.startsWith(item.path)
                          ? 'text-adeshina-blue font-semibold'
                          : 'text-text hover:text-adeshina-blue'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                    {collegesDropdownOpen && (
                      <div className="absolute left-0 top-full w-64 bg-surface rounded-md shadow-lg border border-gray-100 py-2 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-sm text-text hover:bg-gray-50 hover:text-adeshina-blue"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-adeshina-blue font-semibold'
                      : 'text-text hover:text-adeshina-blue'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text hover:text-adeshina-blue p-2"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {mainNavItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-text hover:bg-gray-50 hover:text-adeshina-blue rounded-md"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-6 space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-sm text-muted hover:text-adeshina-blue rounded-md"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
