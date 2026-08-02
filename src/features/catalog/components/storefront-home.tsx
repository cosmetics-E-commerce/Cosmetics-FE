'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  Award,
  CreditCard,
  Headphones,
  Leaf,
  LockKeyhole,
  Recycle,
  RotateCcw,
  ShieldCheck,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import type {
  PublicCategoryResponse,
  PublicProductResponse,
} from '@cosmetics/contracts';
import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { AddToCartButton } from '@/features/cart/components/add-to-cart-button';
import { listPublicCategories, listPublicProducts } from '@/features/catalog/api/catalog.api';
import { ProductFallbackIcon, SiteFooter, SiteHeader } from '@/features/catalog/components/site-chrome';

const heroProducts = [
  {
    src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=90',
    className: 'left-[40%] top-[19%] h-[55%] w-[16%]',
    alt: 'Serum bottle',
  },
  {
    src: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=90',
    className: 'left-[54%] top-[10%] h-[63%] w-[18%]',
    alt: 'Green skincare bottle',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=90',
    className: 'left-[68%] top-[17%] h-[58%] w-[18%]',
    alt: 'Cleanser tube',
  },
  {
    src: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=90',
    className: 'left-[78%] top-[54%] h-[28%] w-[16%]',
    alt: 'Cream jar',
  },
];

const categoryFallbacks = [
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1600428853876-fb5a850b444f?auto=format&fit=crop&w=500&q=85',
  'https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=500&q=85',
];

const brandNames = ['The Ordinary', 'CeraVe', 'COSRX', 'Beauty of Joseon', 'La Roche-Posay', 'innisfree', 'CAUDALIE', 'BIODERMA'];

const particles = [
  { left: '8%', top: '22%', delay: 0 },
  { left: '18%', top: '70%', delay: 0.4 },
  { left: '38%', top: '16%', delay: 0.2 },
  { left: '48%', top: '82%', delay: 0.8 },
  { left: '66%', top: '13%', delay: 0.1 },
  { left: '78%', top: '75%', delay: 0.6 },
  { left: '90%', top: '26%', delay: 0.3 },
  { left: '95%', top: '62%', delay: 0.9 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function StorefrontHome() {
  const productsQuery = useQuery({
    queryKey: ['catalog', 'products', 'home'],
    queryFn: () => listPublicProducts({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
  });
  const categoriesQuery = useQuery({
    queryKey: ['catalog', 'categories', 'home'],
    queryFn: () => listPublicCategories({ limit: 7, sortOrder: 'asc' }),
  });
  const products = productsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const featuredProducts = products.slice(0, 5);

  return (
    <main className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <Hero />
      <BenefitsRow />
      <CategoryRail categories={categories} />
      <NewArrivals products={featuredProducts} />
      <MiddlePromos products={products} />
      <ServicePromises />
      <BrandStrip />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.4 });
  const y = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.4 });
  const glowX = useTransform(x, (value) => value * -0.7);
  const glowY = useTransform(y, (value) => value * -0.7);

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 30);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 24);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.section
      className="relative overflow-hidden border-b border-black/[.08] bg-[#F5E8D9]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_4%_35%,rgba(111,123,93,.18),transparent_18rem),radial-gradient(circle_at_92%_28%,rgba(111,123,93,.12),transparent_20rem)]" />
      <motion.div style={{ x: glowX, y: glowY }} className="absolute left-0 top-40 h-44 w-28 rounded-full bg-sage/15 blur-2xl" />
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-sage/30"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.25, 0.75, 0.25], y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
      <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
        <div className="z-10 py-16">
          <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="text-xs font-semibold uppercase tracking-[.22em] text-ink">
            Luxury skincare & beauty
          </motion.p>
          <h1 className="mt-5 max-w-xl font-serif text-[4.5rem] leading-[.94] tracking-normal text-ink md:text-[6rem]">
            <motion.span variants={fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="block">
              Elevate
            </motion.span>
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
              className="block text-sage"
            >
              Your Beauty
            </motion.span>
          </h1>
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="mt-8 flex items-center gap-5">
            <span className="h-px w-24 bg-sage/30" />
            <motion.span animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3.2, repeat: Infinity }}>
              <Leaf size={18} className="text-sage" />
            </motion.span>
          </motion.div>
          <motion.p variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="mt-7 max-w-sm text-lg leading-8 text-ink/80">
            Premium skincare and beauty products for every glow, every day.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: 'easeOut' }} className="mt-8 flex items-center gap-5">
            <Button asChild className="uppercase shadow-[0_18px_35px_rgba(88,100,72,.18)]">
              <Link href="/products">
                Shop now
                <ArrowRight size={17} />
              </Link>
            </Button>
            <motion.span
              animate={{ opacity: [0.45, 1, 0.45], y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden h-10 w-px bg-sage/35 sm:block"
            />
          </motion.div>
        </div>

        <motion.div style={{ x, y }} className="relative hidden h-[540px] lg:block">
          <div className="absolute bottom-16 right-10 h-24 w-[74%] rounded-[50%] bg-[#cfc2ad]/50 blur-sm" />
          <div className="absolute bottom-24 right-8 h-16 w-[68%] rounded-full bg-[#d9cbb8]" />
          {heroProducts.map((product, index) => (
            <motion.div
              key={product.alt}
              className={`absolute ${product.className}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: [0, -8 - index * 2, 0],
                scale: 1,
                rotate: [0, index % 2 === 0 ? 1.5 : -1.5, 0],
              }}
              transition={{
                opacity: { duration: 0.55, delay: 0.35 + index * 0.08 },
                scale: { duration: 0.55, delay: 0.35 + index * 0.08 },
                y: { duration: 4.8 + index * 0.4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 5.2 + index * 0.35, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Image src={product.src} alt={product.alt} fill priority className="object-contain drop-shadow-[0_20px_28px_rgba(70,58,44,.18)]" sizes="18vw" />
            </motion.div>
          ))}
          <div className="absolute right-0 top-12 h-80 w-40">
            <Image
              src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=500&q=85"
              alt="Green plant in glass vase"
              fill
              className="object-cover opacity-75 mix-blend-multiply"
              sizes="14vw"
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute right-8 top-8 grid h-24 w-24 place-items-center rounded-full border border-sage/25 bg-white/80 text-center text-[10px] font-bold uppercase tracking-[.18em] text-sage-dark shadow-[0_16px_35px_rgba(31,31,31,.08)] backdrop-blur"
          >
            Glow Sale
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function BenefitsRow() {
  const benefits = [
    { icon: Award, title: '100% Authentic', text: 'Original Products' },
    { icon: CreditCard, title: 'Secure Payment', text: 'Multiple Options' },
    { icon: ShieldCheck, title: 'Fast Delivery', text: 'Across Egypt' },
    { icon: RotateCcw, title: 'Easy Returns', text: '14 Days Return' },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="border-b border-black/[.06] bg-[#f4ede2]"
    >
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <motion.div key={benefit.title} variants={fadeUp} transition={{ duration: 0.45 }} className="flex items-center justify-center gap-4 text-sm">
            <motion.span whileHover={{ rotate: -8, scale: 1.12 }} className="grid h-10 w-10 place-items-center rounded-full border border-sage/20 bg-white/55">
              <benefit.icon className="text-sage" size={22} />
            </motion.span>
            <span>
              <span className="block font-semibold text-ink">{benefit.title}</span>
              <span className="block text-xs text-muted">{benefit.text}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function CategoryRail({ categories }: { categories: PublicCategoryResponse[] }) {
  const display = categories.length > 0 ? categories : [];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="mx-auto max-w-7xl px-5 py-10 sm:px-8"
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-8 flex items-center justify-center gap-5">
        <span className="h-px w-20 bg-sage/25" />
        <h2 className="text-center text-sm font-semibold uppercase tracking-[.24em]">Shop by category</h2>
        <span className="h-px w-20 bg-sage/25" />
      </motion.div>
      <div className="grid grid-cols-2 gap-7 sm:grid-cols-4 lg:grid-cols-7">
        {display.map((category, index) => (
          <motion.div key={category.id} variants={fadeUp} transition={{ duration: 0.5 }}>
            <Link href={`/products?categorySlug=${category.slug}`} className="group text-center">
              <motion.div
                whileHover={{ y: -7, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto grid aspect-square w-28 place-items-center overflow-hidden rounded-full border border-sage/35 bg-gradient-to-br from-white via-[#f8f3ea] to-sage-soft/45 shadow-[0_16px_36px_rgba(31,31,31,.06)]"
              >
              {category.imageUrl ? (
                <Image src={category.imageUrl} alt={category.nameEn} width={112} height={112} className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-110" />
              ) : (
                <Image src={categoryFallbacks[index % categoryFallbacks.length]} alt={category.nameEn} width={112} height={112} className="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-110" />
              )}
              </motion.div>
              <h3 className="mt-4 text-xs font-semibold uppercase transition group-hover:text-sage-dark">{category.nameEn}</h3>
              <p className="mt-1 text-xs text-muted">{category.productCount} Products</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function NewArrivals({ products }: { products: PublicProductResponse[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="mx-auto max-w-7xl px-5 pb-8 sm:px-8"
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-2xl uppercase">New arrivals</h2>
        <Link href="/products" className="text-xs font-semibold uppercase tracking-[.12em] text-sage-dark">View all</Link>
      </motion.div>
      <div className="grid gap-4 lg:grid-cols-[repeat(5,minmax(0,1fr))_1.9fr]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
        <motion.div variants={fadeUp} transition={{ duration: 0.55 }} whileHover={{ y: -4 }}>
          <LuxuryCard id="offers" className="relative min-h-[300px] overflow-hidden bg-sage text-white">
          <Image
            src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85"
            alt="Green beauty event"
            fill
            className="object-cover opacity-55"
            sizes="40vw"
          />
          <div className="relative z-10 p-8">
            <p className="text-xs font-semibold uppercase tracking-[.22em]">Limited time only</p>
            <h3 className="mt-7 max-w-xs font-serif text-4xl leading-tight">Green Beauty Event</h3>
            <p className="mt-6 text-sm leading-6 text-white/85">Up to 30% Off on selected items</p>
            <Button asChild variant="secondary" className="mt-7">
              <Link href="/products">
                Shop the sale
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          </LuxuryCard>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ProductCard({ product, compact = false }: { product: PublicProductResponse; compact?: boolean }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5 }} whileHover={{ y: -8 }} className="group">
      <LuxuryCard className="overflow-hidden border-black/[.08] bg-[#fffdf8] transition duration-300 group-hover:shadow-[0_24px_60px_rgba(31,31,31,.12)]">
      <div className="relative aspect-[4/4.4] overflow-hidden bg-[#f6efe4]">
        <span className="absolute left-3 top-3 z-10 rounded-sm bg-sage px-2 py-1 text-[10px] font-bold uppercase text-white">New</span>
        <span className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/70 text-sage opacity-0 shadow-sm backdrop-blur transition duration-300 group-hover:opacity-100">
          <Leaf size={17} />
        </span>
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.nameEn} fill className="object-contain p-6 mix-blend-multiply transition duration-700 group-hover:scale-110" sizes={compact ? '16vw' : '25vw'} />
        ) : (
          <ProductFallbackIcon />
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted">{product.brand?.name ?? product.category.nameEn}</p>
        <h3 className="mt-1 min-h-10 text-sm font-semibold leading-5">{product.nameEn}</h3>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-sage-dark">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.65, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
            >
              <Star size={11} className="fill-sage text-sage" />
            </motion.span>
          ))}
          <span className="text-muted">(4.8)</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-base font-semibold text-sage-dark">{formatPiastres(product.basePrice)}</p>
          <AddToCartButton
            compact
            variantId={product.variants[0]?.id}
            label={`Add ${product.nameEn} to cart`}
            className="h-8 w-8 group-hover:translate-x-0.5"
          />
        </div>
      </div>
      </LuxuryCard>
    </motion.div>
  );
}

function MiddlePromos({ products }: { products: PublicProductResponse[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className="mx-auto grid max-w-7xl gap-4 px-5 py-4 sm:px-8 lg:grid-cols-[.9fr_2.35fr]"
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5 }} whileHover={{ y: -4 }}>
        <LuxuryCard className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[.1em]">Bestsellers</h2>
          <Link href="/products" className="text-xs uppercase text-sage-dark">View all</Link>
        </div>
        <div className="space-y-5">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="grid grid-cols-[54px_1fr_auto] items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-md bg-cream">
                {product.imageUrl ? <Image src={product.imageUrl} alt={product.nameEn} fill className="object-contain p-1 mix-blend-multiply" sizes="54px" /> : <ProductFallbackIcon />}
              </div>
              <div>
                <h3 className="line-clamp-1 text-sm font-semibold">{product.nameEn}</h3>
                <p className="text-xs text-muted">{product.category.nameEn}</p>
                <div className="mt-1 flex text-sage">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={10} className="fill-sage" />)}
                </div>
              </div>
              <p className="text-sm font-semibold">{formatPiastres(product.basePrice)}</p>
            </div>
          ))}
        </div>
        </LuxuryCard>
      </motion.div>

      <motion.div variants={fadeUp} transition={{ duration: 0.55 }} whileHover={{ y: -4 }}>
        <LuxuryCard className="grid overflow-hidden bg-[#f5efe3] md:grid-cols-[.8fr_1.2fr_.75fr]">
        <div className="relative min-h-64">
          <Image src="https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=900&q=85" alt="Featured cream" fill className="object-cover mix-blend-multiply transition duration-700 hover:scale-105" sizes="30vw" />
        </div>
        <div className="px-8 py-10">
          <p className="text-xs font-semibold uppercase tracking-[.18em]">Featured collection</p>
          <h2 className="mt-4 font-serif text-4xl text-sage-dark">Nature. Science. Glow.</h2>
          <p className="mt-4 leading-7 text-muted">Clean ingredients. Powerful results. For healthy, radiant skin.</p>
          <Button asChild variant="secondary" className="mt-7">
            <Link href="/products">Discover more <ArrowRight size={16} /></Link>
          </Button>
        </div>
        <div className="space-y-7 border-sage/15 px-8 py-10 md:border-l">
          <MiniPromise icon={Leaf} title="Clean Ingredients" text="Nature + Science" />
          <MiniPromise icon={ShieldCheck} title="Dermatologically Tested" text="Safe for all skin types" />
          <MiniPromise icon={Recycle} title="Sustainable Beauty" text="Good for you & the planet" />
        </div>
        </LuxuryCard>
      </motion.div>
    </motion.section>
  );
}

function ServicePromises() {
  const items = [
    { icon: Leaf, title: 'Premium Quality', text: 'Carefully curated top quality products' },
    { icon: Award, title: 'Trusted Brands', text: '100% authentic and original' },
    { icon: LockKeyhole, title: 'Secure Shopping', text: 'Your data is safe with us' },
    { icon: Headphones, title: 'Customer Support', text: 'We are here for you 24/7' },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="mx-auto max-w-7xl px-5 py-8 sm:px-8"
    >
      <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} className="mb-8 font-serif text-2xl uppercase">Top sellers</motion.h2>
      <div className="grid divide-y divide-sage/15 border-y border-sage/15 md:grid-cols-4 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <motion.div key={item.title} variants={fadeUp} transition={{ duration: 0.45 }} className="px-8 py-7 text-center">
            <motion.div whileHover={{ y: -4, rotate: -6 }} className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-sage/20 bg-white/40">
              <item.icon className="text-sage" size={24} />
            </motion.div>
            <h3 className="mt-5 text-xs font-semibold uppercase tracking-[.14em]">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-muted">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function BrandStrip() {
  return (
    <motion.section
      id="brands"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      className="mx-auto max-w-7xl px-5 pb-10 sm:px-8"
    >
      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-sage/15 bg-surface md:grid-cols-4 lg:grid-cols-8">
        {brandNames.map((brand) => (
          <motion.div key={brand} variants={fadeUp} whileHover={{ backgroundColor: '#F5E8D9', color: '#586448' }} className="grid h-16 place-items-center border-b border-r border-sage/10 px-5 font-serif text-xl text-ink/85 last:border-r-0">
            {brand}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function MiniPromise({ icon: Icon, title, text }: { icon: typeof Leaf; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <motion.span whileHover={{ scale: 1.12, rotate: -8 }}>
        <Icon className="mt-1 text-sage" size={22} />
      </motion.span>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-muted">{text}</p>
      </div>
    </div>
  );
}

function formatPiastres(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value / 100 / 50);
}
