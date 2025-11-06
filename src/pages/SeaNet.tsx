import { AppFrame } from '../components/AppFrame';

function SeaNet() {
  return (
    <AppFrame>
      <div className="m-6 flex flex-col gap-[var(--space-lg)]">
        {/* Page Header */}
        <div className="flex flex-col gap-[var(--space-sm)]">
          <h1 className="text-heading-lg">SeaNet</h1>
        </div>

        <div className="rounded-lg border border-[var(--color-border-primary-subtle)] p-6">
          <p className="text-body-md text-[var(--color-text-secondary)]">
            SeaNet mapping and network tools will be implemented here.
          </p>
        </div>
      </div>
    </AppFrame>
  );
}

export default SeaNet;
