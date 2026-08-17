import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/about${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      statusCode: 308,
    });
  },
});
