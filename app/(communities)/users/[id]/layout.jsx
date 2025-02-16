export default function User({ children }) {
  return (
    <div className="container mx-auto min-h-screen p-12">
      <div className="relative space-y-4">{children}</div>
    </div>
  );
}
