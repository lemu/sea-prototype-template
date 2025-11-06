import { Link } from 'react-router';
import { Card } from '@rafal.lemieszewski/tide-ui';
import { AppFrame } from '../components/AppFrame';

function Home() {
  return (
    <AppFrame>
      <div className="flex flex-col items-center justify-center p-8">
        <Card className="p-8 w-full max-w-2xl">
          <h1 className="text-heading-lg text-center">Home</h1>
          <div className="flex flex-col items-center gap-4 mt-4">
            <p>
              Welcome to your home page with dynamic breadcrumbs and full sidebar navigation!
            </p>
            <p className="text-caption-sm text-[var(--color-text-secondary)]">
              Try the keyboard shortcuts:
            </p>
            <ul className="text-caption-sm text-[var(--color-text-secondary)] list-disc list-inside">
              <li><strong>Cmd/Ctrl+K</strong> - Open command palette</li>
              <li><strong>[</strong> - Toggle sidebar collapse</li>
            </ul>
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-caption-sm text-[var(--color-text-secondary)]">
                Quick links:
              </p>
              <Link to="/freight-planner" className="text-[var(--color-text-brand)] hover:underline">
                → Freight Planner
              </Link>
              <Link to="/agreements" className="text-[var(--color-text-brand)] hover:underline">
                → Agreements
              </Link>
              <Link to="/global-market" className="text-[var(--color-text-brand)] hover:underline">
                → Global Market
              </Link>
              <Link to="/" className="text-[var(--color-text-brand)] hover:underline mt-2">
                Back to Welcome
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </AppFrame>
  );
}

export default Home;
