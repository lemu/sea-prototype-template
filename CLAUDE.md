# Sea Prototype Template

## Project Overview

A React library template configured for rapid prototyping with modern tooling and for building user interfaces within Sea Design Team.

## Tech Stack

- **React 19.1.1** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **Tide UI v0.41.2** - Tide UI component library (@rafal.lemieszewski/tide-ui)

## UI Component Guidelines

### Prefer Tide UI Components

When creating UI elements, **always prefer components from `@rafal.lemieszewski/tide-ui`** over custom implementations or other libraries.

**✅ Preferred:**

```typescript
import {
  Button,
  Input,
  Card,
  CardContent,
  Avatar,
  Icon,
  Badge,
} from "@rafal.lemieszewski/tide-ui";
```

**❌ Avoid:**

- Custom button implementations
- Raw HTML elements for complex UI
- Other UI libraries (unless specifically required)
- Composing icons manually inside buttons (use Button props instead)

### Button Icon Usage

When adding icons to buttons, **always use the `icon` and `iconPosition` props** instead of composing Icon components manually.

**❌ Incorrect:**

```typescript
import { Button, Icon } from "@rafal.lemieszewski/tide-ui";

<Button>
  <Icon name="x" />
</Button>
```

**✅ Correct:**

```typescript
import { Button } from "@rafal.lemieszewski/tide-ui";

// Icon with text
<Button icon="anchor" iconPosition="left">
  Click me
</Button>

// Icon only
<Button icon="x" iconPosition="only" />
```

**Available `iconPosition` values:**

- `"left"` - Icon before text
- `"right"` - Icon after text
- `"only"` - Icon only (no text)

### Benefits

- **Consistent design system** - Maintains visual consistency across the app
- **Accessibility built-in** - Tide UI components follow accessibility standards
- **Theme support** - Components respect the application's theme variables
- **Tested components** - Pre-tested, reliable implementations
- **Reduced bundle size** - Shared component library vs multiple implementations

### When to Create Custom Components

Only create custom components when:

- Tide UI doesn't provide the needed functionality
- Specific business logic requires a wrapper around Tide UI components
- Complex composite components built from multiple Tide UI primitives

**Example of acceptable custom component:**

```typescript
// UserProfileCard.tsx - Business-specific composite
import { Card, CardContent, Avatar, Button } from "@rafal.lemieszewski/tide-ui";

export function UserProfileCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Avatar src={user.avatar} />
        <Button onClick={handleEdit}>Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
```

## Maintenance Guidelines

### Updating Tide UI Version

**IMPORTANT:** When updating the `@rafal.lemieszewski/tide-ui` package version, you MUST also update the version number in:

1. **README.md** - Update the "Tide UI" version in the Tech Stack section
2. **CLAUDE.md** - Update the "Tide UI" version in the Tech Stack section (this file)

**Workflow:**
```bash
# 1. Update package.json version
npm install @rafal.lemieszewski/tide-ui@latest

# 2. Update README.md Tech Stack section
# 3. Update CLAUDE.md Tech Stack section
# 4. Commit all changes together
```

This ensures documentation stays in sync with the actual installed version.

## Browser Compatibility Guidelines

### Avoid Deprecated APIs

When detecting browser/OS features, avoid deprecated APIs:

**❌ Deprecated:**

```typescript
// navigator.platform is deprecated
/Mac|iPod|iPhone|iPad/.test(navigator.platform);
```

**✅ Preferred:**

```typescript
// Use navigator.userAgent instead
/Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
```

**Future-proof approach:**

```typescript
// Check for modern API availability first, fallback gracefully
const isMacOS = () => {
  if (typeof navigator === "undefined") return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
};
```
