import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';

export function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <Container>
        <h1 className="text-6xl font-extrabold text-adeshina-blue">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-text">Page Not Found</h2>
        <p className="mt-2 text-muted max-w-md mx-auto text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Button to="/" variant="primary">
            Return to Homepage
          </Button>
        </div>
      </Container>
    </div>
  );
}
