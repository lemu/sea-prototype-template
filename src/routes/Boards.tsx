import { AppFrame } from '../components/AppFrame';

function Boards() {
  return (
    <AppFrame>
      <div className="m-6 flex flex-col gap-[var(--space-l)]">
        <div className="flex flex-col gap-[var(--space-s)]">
          <h1 className="text-heading-lg">Boards</h1>
        </div>
        <div className="rounded-l border border-[var(--color-border-primary-subtle)] p-6">
          <p className="text-body-md text-[var(--color-text-secondary)]">
            Boards will be implemented here.
          </p>
        </div>
      </div>
    </AppFrame>
  );
}

export default Boards;
