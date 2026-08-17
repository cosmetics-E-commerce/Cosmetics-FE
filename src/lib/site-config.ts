export const siteConfig = {
  customerCare: {
    phoneDisplay: "0103 683 6683",
    phoneE164: "+201036836683",
    businessDays: "Saturday through Thursday",
  },
} as const;

export function customerCareTelHref() {
  return `tel:${siteConfig.customerCare.phoneE164}`;
}
