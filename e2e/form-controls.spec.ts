import { expect, test } from "@playwright/test";

test("auth compound fields render one focus owner and expose the password action", async ({
  page,
}) => {
  await page.goto("/sign-in");

  const identifier = page.getByLabel("Email or mobile number");
  const password = page.locator("#password");
  await identifier.focus();

  const focusLayers = await identifier.evaluate((element) => {
    const input = getComputedStyle(element);
    const shell = getComputedStyle(element.parentElement!);
    return {
      inputBorder: input.borderTopWidth,
      inputOutline: input.outlineStyle,
      inputShadow: input.boxShadow,
      shellOutline: shell.outlineStyle,
      shellShadow: shell.boxShadow,
    };
  });

  expect(focusLayers).toMatchObject({
    inputBorder: "0px",
    inputOutline: "none",
    inputShadow: "none",
    shellOutline: "none",
  });
  expect(focusLayers.shellShadow).not.toBe("none");

  await password.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Show password" })).toBeFocused();
});

test("standalone storefront controls use one stable focus halo", async ({ page }) => {
  await page.goto("/contact");
  const name = page.getByLabel("Name");
  const before = await name.boundingBox();
  await name.focus();
  const after = await name.boundingBox();

  expect(after?.width).toBe(before?.width);
  expect(after?.height).toBe(before?.height);
  const styles = await name.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outline: style.outlineStyle,
      shadow: style.boxShadow,
    };
  });
  expect(styles.outline).toBe("none");
  expect(styles.shadow).not.toBe("none");
});
