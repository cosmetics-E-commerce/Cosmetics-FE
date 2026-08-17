import { describe, expect, it } from "vitest";
import {
  getNameInitials,
  isLegacyAvatarPlaceholder,
  resolveAvatar,
  resolveAvatarImage,
} from "./avatar";

describe("customer avatar resolution", () => {
  it.each([
    ["Nehad Moghrabi", "NM"],
    ["Nehad Mohamed Moghrabi", "NM"],
    ["Nehad", "N"],
    ["  Nehad   Moghrabi  ", "NM"],
    ["محمد أحمد", "مأ"],
    ["محمد عبد الرحمن أحمد", "مأ"],
    ["", "?"],
  ])("derives deterministic Unicode initials from %j", (name, expected) => {
    expect(getNameInitials(name)).toBe(expected);
  });

  it("prefers a real uploaded image and resolves a storage key centrally", () => {
    expect(
      resolveAvatar(
        {
          firstName: "Nehad",
          lastName: "Moghrabi",
          profileImage: "public/profiles/2026/08/customer.webp",
        },
        "https://cdn.example.com",
      ),
    ).toEqual({
      displayName: "Nehad Moghrabi",
      imageUrl: "https://cdn.example.com/public/profiles/2026/08/customer.webp",
      initials: "NM",
    });
  });

  it("keeps valid HTTP(S) photos and ignores malformed references", () => {
    expect(resolveAvatarImage("https://assets.example.com/customer.webp")).toBe(
      "https://assets.example.com/customer.webp",
    );
    expect(resolveAvatarImage("javascript:alert(1)")).toBeNull();
    expect(resolveAvatarImage("../../../etc/passwd", "https://cdn.example.com")).toBeNull();
  });

  it.each([
    "/images/default-avatar.png",
    "profile-placeholder.svg",
    "https://api.dicebear.com/9.x/personas/svg?seed=customer",
    "https://www.gravatar.com/avatar/hash",
    "https://randomuser.me/api/portraits/women/1.jpg",
  ])("treats generated or legacy placeholder %s as no customer photo", (value) => {
    expect(isLegacyAvatarPlaceholder(value)).toBe(true);
    expect(resolveAvatarImage(value, "https://cdn.example.com")).toBeNull();
  });
});
