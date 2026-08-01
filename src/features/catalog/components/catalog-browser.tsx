'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Loader2, PackageSearch, ShoppingBag, Star, Tags, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type {
  PublicCategoryResponse,
  PublicProductResponse,
} from '@contracts/catalog/product.schema';
import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { listPublicCategories, listPublicProducts } from '@/features/catalog/api/catalog.api';
import { ProductFallbackIcon, SiteFooter, SiteHeader } from '@/features/catalog/components/site-chrome';
import type { ApiErrorBody } from '@/lib/http/client';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function CatalogBrowser({ mode }: { mode: 'products' | 'categories' }) {
  const productsQuery = useQuery({
    queryKey: ['catalog', 'products'],
    queryFn: listPublicProducts,
    enabled: mode === 'products',
  });

  const categoriesQuery = useQuery({
    queryKey: ['catalog', 'categories'],
    queryFn: listPublicCategories,
    enabled: mode === 'categories',
  });

  const isProducts = mode === 'products';
  const title = isProducts ? 'Products' : 'Categories';
  const subtitle = isProducts
    ? 'Browse premium skincare and beauty without creating an account.'
    : 'Explore beauty categories before signing in.';
  const isLoading = isProducts ? productsQuery.isLoading : categoriesQuery.isLoading;
  const error = (isProducts ? productsQuery.error : categoriesQuery.error) as ApiErrorBody | null;
  const products = productsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];

  return (
    <main className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <motion.section
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="border-b border-black/[.08] bg-[#F5E8D9]"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="text-xs font-semibold uppercase tracking-[.24em] text-sage-dark">
              Public catalogue
            </motion.p>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="mt-4 font-serif text-6xl leading-none">
              {title}
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mt-5 max-w-2xl leading-7 text-muted">
              {subtitle}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex gap-3">
            <Button asChild variant={isProducts ? 'primary' : 'secondary'}>
              <Link href="/products">Products</Link>
            </Button>
            <Button asChild variant={!isProducts ? 'primary' : 'secondary'}>
              <Link href="/categories">Categories</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {isLoading ? (
          <div className="flex min-h-[22rem] items-center justify-center">
            <Loader2 className="animate-spin text-sage" size={30} />
          </div>
        ) : null}

        {!isLoading && error ? (
          <CatalogState
            icon={PackageSearch}
            title="Catalogue is unavailable"
            text="The page is public. The backend API returned an error while loading the catalogue."
          />
        ) : null}

        {!isLoading && !error && isProducts ? <ProductGrid products={products} /> : null}
        {!isLoading && !error && !isProducts ? <CategoryGrid categories={categories} /> : null}
      </section>
      <SiteFooter />
    </main>
  );
}

function ProductGrid({ products }: { products: PublicProductResponse[] }) {
  if (products.length === 0) {
    return (
      <CatalogState
        icon={ShoppingBag}
        title="No published products yet"
        text="Customers can browse this page without an account. Published products from the backend will appear here."
      />
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={fadeUp} transition={{ duration: 0.48 }} whileHover={{ y: -8 }} className="group">
          <LuxuryCard className="overflow-hidden border-black/[.08] bg-[#fffdf8] transition duration-300 group-hover:shadow-[0_24px_60px_rgba(31,31,31,.12)]">
          <div className="relative aspect-[4/4.4] overflow-hidden bg-[#f6efe4]">
            <span className="absolute left-3 top-3 z-10 rounded-sm bg-sage px-2 py-1 text-[10px] font-bold uppercase text-white">New</span>
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.nameEn} fill className="object-contain p-7 mix-blend-multiply transition duration-700 group-hover:scale-110" sizes="25vw" />
            ) : (
              <ProductFallbackIcon />
            )}
          </div>
          <div className="p-5">
            <p className="text-xs text-muted">{product.brand?.name ?? product.category.nameEn}</p>
            <h2 className="mt-1 min-h-10 text-sm font-semibold leading-5">{product.nameEn}</h2>
            <div className="mt-2 flex items-center gap-1 text-[11px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.span key={index} initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                  <Star size={11} className="fill-sage text-sage" />
                </motion.span>
              ))}
              <span className="text-muted">(4.8)</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-base font-semibold">{formatPrice(product.basePrice)}</p>
              <Button asChild size="sm">
                <Link href="/checkout">
                  Make order
                  <ArrowRight size={15} />
                </Link>
              </Button>
            </div>
          </div>
          </LuxuryCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CategoryGrid({ categories }: { categories: PublicCategoryResponse[] }) {
  if (categories.length === 0) {
    return (
      <CatalogState
        icon={Tags}
        title="No published categories yet"
        text="Customers can browse this page without an account. Backend categories will appear here."
      />
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={fadeUp} transition={{ duration: 0.5 }} whileHover={{ y: -7 }} className="group">
          <LuxuryCard className="overflow-hidden border-black/[.08] bg-[#fffdf8] transition duration-300 group-hover:shadow-[0_24px_60px_rgba(31,31,31,.12)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#f6efe4]">
            {category.imageUrl ? (
              <Image src={category.imageUrl} alt={category.nameEn} fill className="object-cover mix-blend-multiply transition duration-700 group-hover:scale-105" sizes="33vw" />
            ) : (
              <div className="grid h-full place-items-center">
                <Tags className="text-sage" size={34} />
              </div>
            )}
          </div>
          <div className="p-6">
            <h2 className="font-serif text-3xl text-sage-dark">{category.nameEn}</h2>
            <p className="mt-3 leading-7 text-muted">Explore products from this public category.</p>
            <p className="mt-5 text-sm font-semibold text-sage-dark">{category.productCount} Products</p>
          </div>
          </LuxuryCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CatalogState({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <LuxuryCard className="my-10 flex min-h-[22rem] flex-col items-center justify-center p-8 text-center">
      <Icon className="text-sage" size={34} />
      <h2 className="mt-7 font-serif text-3xl text-sage-dark">{title}</h2>
      <p className="mt-4 max-w-xl leading-7 text-muted">{text}</p>
    </LuxuryCard>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value / 100 / 50);
}
