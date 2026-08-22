/**
 * Renders a JSON-LD block.
 *
 * Schema objects are built in `lib/schema.ts` from our own typed content,
 * never from user input, so serialising them directly is safe — but we still
 * escape `<` so a stray sequence can never close the script tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
