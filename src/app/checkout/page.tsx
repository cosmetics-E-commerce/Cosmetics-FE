import { Suspense } from 'react';

import { CheckoutGate } from '@/features/checkout/components/checkout-gate';

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutGate />
    </Suspense>
  );
}
