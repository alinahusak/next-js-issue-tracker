import { Status } from "@prisma/client";
import prisma from "./client";

const issues: { title: string; description: string; status: Status }[] = [
  {
    title: "Login button unresponsive on Safari",
    description:
      "Clicking **Sign in with Google** on Safari 17 does nothing. The click handler fires but the redirect never happens. Works in Chrome and Firefox.",
    status: "OPEN",
  },
  {
    title: "Issue list is slow with 500+ records",
    description:
      "Loading `/issues` takes about 4 seconds once the table grows past 500 rows. Suspect the missing index on `status`.",
    status: "IN_PROGRESS",
  },
  {
    title: "Markdown editor loses content on tab switch",
    description:
      "Switching browser tabs while writing a description clears the editor. Draft state should survive remounts.",
    status: "OPEN",
  },
  {
    title: "Pagination resets filters",
    description:
      "Going to page 2 drops the `status` query parameter, so the filter silently resets to *All*.",
    status: "CLOSED",
  },
  {
    title: "Status badge colors fail contrast check",
    description:
      "The yellow *In Progress* badge sits at a 2.1:1 contrast ratio against white. WCAG AA requires 4.5:1 for small text.",
    status: "OPEN",
  },
  {
    title: "Delete confirmation dialog is not keyboard accessible",
    description:
      "Focus is not trapped inside the dialog and `Escape` does not close it. Screen reader users cannot reach the cancel button.",
    status: "IN_PROGRESS",
  },
  {
    title: "Assignee dropdown shows deleted users",
    description:
      "Users removed from the workspace still appear in the assignee select. Filter them out server side.",
    status: "OPEN",
  },
  {
    title: "Issue detail page 500s on missing description",
    description:
      "Legacy rows have `NULL` descriptions and the markdown renderer throws. Coerce to an empty string before rendering.",
    status: "CLOSED",
  },
  {
    title: "Edit form does not warn about unsaved changes",
    description:
      "Navigating away from a half-edited issue discards everything with no prompt. Add a `beforeunload` guard.",
    status: "OPEN",
  },
  {
    title: "Dashboard chart mislabels the x-axis",
    description:
      "The bar chart labels are shifted by one position, so *Closed* issues appear under the *Open* column.",
    status: "IN_PROGRESS",
  },
  {
    title: "Add full-text search across issues",
    description:
      "Users want to search titles and descriptions from the issues toolbar. Consider a MySQL `FULLTEXT` index.",
    status: "OPEN",
  },
  {
    title: "Support bulk status updates",
    description:
      "Selecting multiple rows and setting them all to *Closed* in one action would save a lot of clicking during triage.",
    status: "OPEN",
  },
  {
    title: "Email notification on issue assignment",
    description:
      "When an issue is assigned, send the assignee an email with the title, status and a direct link.",
    status: "IN_PROGRESS",
  },
  {
    title: "Keyboard shortcut for creating an issue",
    description:
      "Pressing `c` anywhere on the issues page should open the new issue form, matching common tracker conventions.",
    status: "OPEN",
  },
  {
    title: "Dark mode support",
    description:
      "The Radix theme is hardcoded to `appearance=\"light\"`. Respect `prefers-color-scheme` and add a manual toggle.",
    status: "OPEN",
  },
  {
    title: "Export issues to CSV",
    description:
      "Add an export button that downloads the current filtered view as CSV for reporting.",
    status: "CLOSED",
  },
  {
    title: "Add comments to issues",
    description:
      "A discussion thread per issue, with markdown support and the author's avatar.",
    status: "OPEN",
  },
  {
    title: "Labels and tags",
    description:
      "Free-form colored labels so teams can group issues beyond the three built-in statuses.",
    status: "OPEN",
  },
  {
    title: "Due dates and overdue indicator",
    description:
      "Let users set a due date and highlight overdue issues in red on the list view.",
    status: "IN_PROGRESS",
  },
  {
    title: "Activity log per issue",
    description:
      "Record status changes, assignments and edits with a timestamp and actor so history is auditable.",
    status: "OPEN",
  },
  {
    title: "Rate limit the issues API",
    description:
      "`POST /api/issues` accepts unlimited requests. Add per-session rate limiting to prevent spam.",
    status: "OPEN",
  },
  {
    title: "Validate description length server side",
    description:
      "The client caps descriptions at 65535 characters but the API does not, so oversized payloads reach Prisma and fail with a driver error.",
    status: "IN_PROGRESS",
  },
  {
    title: "Session cookie missing SameSite attribute",
    description:
      "Set `SameSite=Lax` explicitly on the session cookie rather than relying on browser defaults.",
    status: "CLOSED",
  },
  {
    title: "Restrict issue deletion to authenticated users",
    description:
      "`DELETE /api/issues/:id` currently works without a session. Add an auth check to the route handler.",
    status: "OPEN",
  },
  {
    title: "Sanitize markdown output",
    description:
      "Raw HTML in descriptions is rendered as-is, which allows script injection. Sanitize before rendering.",
    status: "IN_PROGRESS",
  },
  {
    title: "Mobile layout breaks below 375px",
    description:
      "The issues table overflows horizontally on small phones. Hide secondary columns instead of scrolling.",
    status: "OPEN",
  },
  {
    title: "Loading skeleton height jumps",
    description:
      "The skeleton rows are taller than the real ones, so the page shifts noticeably once data arrives.",
    status: "OPEN",
  },
  {
    title: "Navbar active link is hard to see",
    description:
      "The active route uses the same gray as inactive links. Bump the weight and darken the color.",
    status: "CLOSED",
  },
  {
    title: "Empty state for the issues list",
    description:
      "A brand new workspace shows an empty table with headers. Show an illustration and a *Create your first issue* call to action.",
    status: "OPEN",
  },
  {
    title: "Toast notifications for successful actions",
    description:
      "Creating, editing or deleting an issue gives no feedback beyond the redirect. Add a toast.",
    status: "IN_PROGRESS",
  },
  {
    title: "Form focus is lost after validation error",
    description:
      "When submission fails, focus stays on the submit button instead of moving to the first invalid field.",
    status: "OPEN",
  },
  {
    title: "Spinner keeps spinning after network error",
    description:
      "If the POST request fails, `isSubmitting` is never reset in some code paths and the button stays disabled.",
    status: "CLOSED",
  },
  {
    title: "Add tests for the issues API",
    description:
      "No coverage for `POST`, `PATCH` or `DELETE` on `/api/issues`. Add integration tests against a test database.",
    status: "OPEN",
  },
  {
    title: "Set up CI pipeline",
    description:
      "Run lint, type-check and tests on every pull request before merging to `main`.",
    status: "IN_PROGRESS",
  },
  {
    title: "Remove the artificial delay from the issue detail page",
    description:
      "`await delay(2000)` was added to demo the loading skeleton and is still in the production code path.",
    status: "OPEN",
  },
  {
    title: "Extract duplicate query logic",
    description:
      "The same `findMany` filter is copy-pasted across three pages. Move it into a shared helper.",
    status: "OPEN",
  },
  {
    title: "Upgrade to the latest Next.js release",
    description:
      "The project is pinned to Next 13. Evaluate the migration effort and the breaking changes involved.",
    status: "OPEN",
  },
  {
    title: "Document the local setup in the README",
    description:
      "New contributors have to guess which environment variables are required and how to run migrations.",
    status: "CLOSED",
  },
  {
    title: "Add a health check endpoint",
    description:
      "`GET /api/health` should verify database connectivity so uptime monitoring can probe it.",
    status: "IN_PROGRESS",
  },
  {
    title: "Seed script for local development",
    description:
      "Provide realistic sample data so the list view and pagination can be exercised without manual entry.",
    status: "OPEN",
  },
];

async function main() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  for (const [index, issue] of issues.entries()) {
    await prisma.issue.create({
      data: {
        ...issue,
        createdAt: new Date(now - (issues.length - index) * day),
      },
    });
  }

  console.log(`Seeded ${issues.length} issues.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
