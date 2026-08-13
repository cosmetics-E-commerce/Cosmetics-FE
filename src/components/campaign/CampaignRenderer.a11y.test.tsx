import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import {
  popupCampaignDefaults,
  popupPublishedCampaignSchema,
} from "../../../vendor/cosmetics-contracts/index.js";
import { CampaignRenderer } from "./CampaignRenderer";

const campaign = popupPublishedCampaignSchema.parse({
  id: "1ea4ff7b-c507-42e5-bd0b-d3530f7509dd",
  variantId: "468f5a74-e056-44f6-9d52-20fef8acf55e",
  version: 1,
  type: popupCampaignDefaults.type,
  priority: 50,
  startsAt: null,
  endsAt: null,
  timezone: "Africa/Cairo",
  recurringSchedule: null,
  presentation: popupCampaignDefaults.presentation,
  appearance: popupCampaignDefaults.appearance,
  targeting: popupCampaignDefaults.targeting,
  trigger: popupCampaignDefaults.trigger,
  frequency: popupCampaignDefaults.frequency,
  collision: popupCampaignDefaults.collision,
  primaryAction: { type: "CLOSE" },
  secondaryAction: popupCampaignDefaults.secondaryAction,
  form: popupCampaignDefaults.form,
  countdown: popupCampaignDefaults.countdown,
  content: popupCampaignDefaults.variants[0]?.content[0],
  direction: "ltr",
  image: null,
  coupon: null,
  product: null,
  category: null,
});

describe("CampaignRenderer accessibility", () => {
  it("renders a labelled dialog and dismisses with Escape", async () => {
    const dismiss = vi.fn();
    const { container } = render(
      <CampaignRenderer
        campaign={campaign}
        locale="en"
        presentation="CENTER_MODAL"
        visitorId="088f8678-3714-4c6b-a4c4-2702e32905a3"
        sessionId="ed1925a9-197f-4702-a1d8-782657478027"
        device="desktop"
        page="/"
        onDismiss={dismiss}
        onPrimary={vi.fn()}
        onSecondary={vi.fn()}
        onCopyCoupon={vi.fn()}
        onConvert={vi.fn()}
      />,
    );
    expect(screen.getByRole("dialog", { name: campaign.content.headline })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    expect((await axe.run(container.ownerDocument.body)).violations).toEqual([]);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(dismiss).toHaveBeenCalledOnce();
  });

  it("returns focus to the opener after a close action", async () => {
    function Harness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open offer
          </button>
          {open ? (
            <CampaignRenderer
              campaign={campaign}
              locale="en"
              presentation="CENTER_MODAL"
              visitorId="088f8678-3714-4c6b-a4c4-2702e32905a3"
              sessionId="ed1925a9-197f-4702-a1d8-782657478027"
              device="desktop"
              page="/"
              onDismiss={() => setOpen(false)}
              onPrimary={vi.fn()}
              onSecondary={vi.fn()}
              onCopyCoupon={vi.fn()}
              onConvert={vi.fn()}
            />
          ) : null}
        </>
      );
    }

    render(<Harness />);
    const opener = screen.getByRole("button", { name: "Open offer" });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.click(await screen.findByRole("button", { name: "Close" }));
    await vi.waitFor(() => expect(opener).toHaveFocus());
  });

  it("closes an expired campaign-end countdown using synchronized server time", async () => {
    const dismiss = vi.fn();
    const expiring = popupPublishedCampaignSchema.parse({
      ...campaign,
      endsAt: new Date(Date.now() + 60_000).toISOString(),
      countdown: { enabled: true, mode: "CAMPAIGN_END" },
    });
    render(
      <CampaignRenderer
        campaign={expiring}
        locale="en"
        presentation="CENTER_MODAL"
        visitorId="088f8678-3714-4c6b-a4c4-2702e32905a3"
        sessionId="ed1925a9-197f-4702-a1d8-782657478027"
        device="desktop"
        page="/"
        serverTimeOffsetMs={120_000}
        onDismiss={dismiss}
        onPrimary={() => true}
        onSecondary={() => true}
        onCopyCoupon={vi.fn()}
        onConvert={vi.fn()}
      />,
    );
    await vi.waitFor(() => expect(dismiss).toHaveBeenCalledTimes(1));
  });
});
