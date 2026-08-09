import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getRequestLocale = createServerFn({ method: "GET" }).handler(() =>
  getCookie("bioreza.locale") === "ar" ? "ar" : "en",
);
