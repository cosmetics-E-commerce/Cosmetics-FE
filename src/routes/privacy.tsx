import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/privacy-policy${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      statusCode: 308,
    });
  },
});
