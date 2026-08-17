import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/lib/products";
import { breadcrumbSchema, createSeoHead, jsonLd } from "@/lib/seo";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import "@/components/content/information-pages.css";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...createSeoHead({
      title: "About BioReza | Our Philosophy",
      description:
        "Discover BioReza's philosophy and our commitment to authentic, carefully selected beauty products.",
      path: "/about",
      locale: "en",
      image: images.storyDetail,
      alternates: false,
    }),
    scripts: [
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About BioReza", path: "/about" },
        ]),
      ),
    ],
  }),
  component: AboutBioReza,
});

function AboutBioReza() {
  return (
    <article className="bio-information-page bio-philosophy" lang="en" dir="ltr">
      <div className="bio-information-page__shell">
        <Breadcrumb className="bio-information-page__breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About BioReza</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="bio-philosophy__hero" aria-labelledby="philosophy-statement">
          <div className="bio-philosophy__statement">
            <p className="bio-information-page__eyebrow">BioReza philosophy</p>
            <h1 id="philosophy-statement">
              Beauty isn't about owning more. It's about choosing better.
            </h1>
          </div>
          <div className="bio-philosophy__media">
            <img
              src={images.storyDetail}
              alt="A refined skincare texture with a botanical detail"
              width={900}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </section>

        <section className="bio-philosophy__manifesto" aria-labelledby="about-title">
          <h2 id="about-title">Our philosophy</h2>
          <div className="bio-philosophy__copy">
            <p>
              At BioReza, we believe confidence begins with trust. That's why every product we offer
              is carefully selected from brands that meet our standards for authenticity,
              performance, and quality.
            </p>
            <p>We don't believe in endless shelves or overwhelming choices.</p>
            <p>
              We believe in creating a destination where every recommendation has a purpose and
              every purchase feels right.
            </p>
            <p>
              Whether you're discovering a new routine or searching for a product you already love,
              BioReza is built to make beauty simple, elegant, and reliable.
            </p>
            <p className="bio-philosophy__closing">
              Because true confidence begins with knowing you chose the right place.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
