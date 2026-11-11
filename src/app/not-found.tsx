import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ink pt-24">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Container className="relative">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-white sm:text-7xl">This area is off limits.</h1>
        <p className="mt-6 max-w-lg text-lg text-mist">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
