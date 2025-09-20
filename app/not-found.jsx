import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="error-page">
            <h1 className="display-1">404</h1>
            <h2>Page Not Found</h2>
            <p className="lead">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="mt-4">
              <Link href="/" className="btn btn-primary me-3">
                Go Home
              </Link>
              <Link href="/properties-for-sale" className="btn btn-outline-primary me-3">
                Properties for Sale
              </Link>
              <Link href="/properties-for-rent" className="btn btn-outline-primary">
                Properties for Rent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

