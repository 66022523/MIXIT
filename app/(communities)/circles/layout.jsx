export default function Layout({ children }) {
  return (
    <div className="container mx-auto space-y-4 p-4 lg:space-y-12 lg:p-12">
      {children}
    </div>
  );
}
