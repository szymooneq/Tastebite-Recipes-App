export default function Item({ title, content }) {
  return (
    <p className="italic">
      <span className="font-bold">{title}:</span> {content}
    </p>
  );
}
