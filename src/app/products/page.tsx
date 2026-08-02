import { CatalogBrowser, type CatalogSearchParams } from '@/features/catalog/components/catalog-browser';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  return <CatalogBrowser mode="products" searchParams={await searchParams} />;
}
