// Browser utility functions
// Following CLAUDE.md guidelines: Use navigator.userAgent instead of deprecated navigator.platform

/**
 * Detects if the user is on macOS, iOS, or iPadOS
 * Uses navigator.userAgent (not deprecated navigator.platform)
 */
export const isMacOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
};
