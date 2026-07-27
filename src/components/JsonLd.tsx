// Renders a JSON-LD structured-data block. Server component — the script is
// emitted straight into the HTML so crawlers and LLMs read it without executing JS.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, first-party content built from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
