export interface ArticleFaqItem {
  question: string;
  answer: string;
}

export function ArticleFaq({ items }: { items: ArticleFaqItem[] }) {
  return (
    <section className="faq article-faq" id="sik-sorulan-sorular">
      <h2>Sık sorulan sorular</h2>
      {items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
