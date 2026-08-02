'use client';

import { Mail, Smartphone } from 'lucide-react';
import type { OtpDeliveryChannel } from '@cosmetics/contracts';
import type { ReactNode } from 'react';

export function OtpChannelPicker({
  value,
  onChange,
}: {
  value: OtpDeliveryChannel;
  onChange: (channel: OtpDeliveryChannel) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="OTP delivery method">
      <ChannelButton
        active={value === 'EMAIL'}
        icon={<Mail size={18} />}
        label="Email"
        onClick={() => onChange('EMAIL')}
      />
      <ChannelButton
        active={value === 'SMS'}
        icon={<Smartphone size={18} />}
        label="SMS"
        onClick={() => onChange('SMS')}
      />
    </div>
  );
}

function ChannelButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      className={`flex h-12 items-center justify-center gap-2 rounded-md border text-sm font-semibold transition ${
        active
          ? 'border-sage bg-sage-soft text-sage-dark'
          : 'border-sage/20 bg-white text-muted hover:border-sage/45'
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
