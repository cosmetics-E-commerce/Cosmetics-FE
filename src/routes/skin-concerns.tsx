import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/skin-concerns")({
  component: Outlet,
});
