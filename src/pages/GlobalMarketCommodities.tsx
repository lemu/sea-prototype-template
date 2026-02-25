import { AppFrame } from '../components/AppFrame';

function GlobalMarketCommodities() {
  return (
    <AppFrame>
      <div className="m-6 flex flex-col gap-[var(--space-lg)]">
        <div className="flex flex-col gap-[var(--space-sm)]">
          <h1 className="text-heading-lg">Commodities</h1>
        </div>
        <div className="rounded-lg border border-[var(--color-border-primary-subtle)] p-6">
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Commodities data and analytics will be implemented here.
          </p>
        </div>
      </div>
    </AppFrame>
  );
}

export default GlobalMarketCommodities;
