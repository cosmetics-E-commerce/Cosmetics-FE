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
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return {
      ...createSeoHead({
        title: ar ? "عن بيوريزا | فلسفتنا" : "About BioReza | Our Philosophy",
        description: ar
          ? "اكتشفي فلسفة بيوريزا والتزامنا بمنتجات جمال أصلية ومختارة بعناية."
          : "Discover BioReza's philosophy and our commitment to authentic, carefully selected beauty products.",
        path: "/about",
        locale: ar ? "ar" : "en",
        image: images.storyDetail,
      }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "عن بيوريزا" : "About BioReza", path: "/about" },
          ]),
        ),
      ],
    };
  },
  component: AboutBioReza,
});

function AboutBioReza() {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <article className="bio-information-page bio-philosophy" lang={locale} dir={ar ? "rtl" : "ltr"}>
      <div className="bio-information-page__shell">
        <Breadcrumb className="storefront-breadcrumb bio-information-page__breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">{ar ? "الرئيسية" : "Home"}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{ar ? "عن بيوريزا" : "About BioReza"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="bio-philosophy__hero" aria-labelledby="philosophy-statement">
          <div className="bio-philosophy__statement">
            <p className="bio-information-page__eyebrow">
              {ar ? "فلسفة بيوريزا" : "BioReza philosophy"}
            </p>
            <h1 id="philosophy-statement">
              {ar
                ? "الجمال لا يعني امتلاك المزيد، بل اختيار الأفضل."
                : "Beauty isn't about owning more. It's about choosing better."}
            </h1>
          </div>
          <div className="bio-philosophy__media">
            <img
              src={images.storyDetail}
              alt={
                ar
                  ? "ملمس عناية بالبشرة مع تفصيل نباتي"
                  : "A refined skincare texture with a botanical detail"
              }
              width={900}
              height={900}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </section>

        <section className="bio-philosophy__manifesto" aria-labelledby="about-title">
          <h2 id="about-title">{ar ? "فلسفتنا" : "Our philosophy"}</h2>
          <div className="bio-philosophy__copy">
            <p>
              {ar
                ? "في بيوريزا، نؤمن أن الثقة تبدأ من الاطمئنان. لذلك نختار كل منتج بعناية من علامات تلتزم بمعاييرنا في الأصالة والفعالية والجودة."
                : "At BioReza, we believe confidence begins with trust. That's why every product we offer is carefully selected from brands that meet our standards for authenticity, performance, and quality."}
            </p>
            <p>
              {ar
                ? "لا نؤمن بالرفوف اللانهائية أو الخيارات المربكة."
                : "We don't believe in endless shelves or overwhelming choices."}
            </p>
            <p>
              {ar
                ? "نؤمن بوجهة يكون لكل ترشيح فيها هدف، وتشعرين فيها بالرضا عن كل اختيار."
                : "We believe in creating a destination where every recommendation has a purpose and every purchase feels right."}
            </p>
            <p>
              {ar
                ? "سواء كنتِ تكتشفين روتيناً جديداً أو تبحثين عن منتج تحبينه بالفعل، صُممت بيوريزا لتجعل الجمال بسيطاً وأنيقاً وموثوقاً."
                : "Whether you're discovering a new routine or searching for a product you already love, BioReza is built to make beauty simple, elegant, and reliable."}
            </p>
            <p className="bio-philosophy__closing">
              {ar
                ? "لأن الثقة الحقيقية تبدأ عندما تعرفين أنكِ اخترتِ المكان الصحيح."
                : "Because true confidence begins with knowing you chose the right place."}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
