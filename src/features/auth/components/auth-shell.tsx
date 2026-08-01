'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { LuxuryCard } from '@/components/ui/luxury-card';

export function AuthShell({
  title,
  subtitle,
  switchLabel,
  switchHref,
  children,
}: {
  title: string;
  subtitle: string;
  switchLabel: string;
  switchHref: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-screen bg-background text-ink lg:grid-cols-[1.03fr_.97fr]">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=90"
          alt="Cosmetics application detail"
          fill
          priority
          className="object-cover opacity-80"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1F1F1F]/78 via-[#586448]/28 to-[#F5E8D9]/20" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-12 left-12 max-w-lg"
        >
          <Link href="/" className="font-serif text-xl uppercase tracking-[.28em] text-white">
            Seniora Beauty
          </Link>
          <p className="mt-8 font-serif text-5xl leading-tight text-white">
            A more intentional beauty ritual begins here.
          </p>
        </motion.div>
      </section>

      <section className="flex items-center justify-center px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: 'easeOut' }}
          className="w-full max-w-xl"
        >
          <LuxuryCard className="w-full border-black/[.08] bg-white/86 p-6 shadow-[0_28px_80px_rgba(31,31,31,.08)] backdrop-blur sm:p-9">
          <Link href="/" className="mb-10 inline-block font-serif text-lg uppercase tracking-[.24em] text-sage-dark lg:hidden">
            Seniora Beauty
          </Link>
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-ink">{title}</h1>
            <p className="mt-4 leading-7 text-muted">{subtitle}</p>
          </div>
          {children}
          <Link href={switchHref} className="mt-7 inline-block text-sm font-medium text-sage-dark transition hover:text-sage">
            {switchLabel}
          </Link>
          </LuxuryCard>
        </motion.div>
      </section>
    </main>
  );
}
