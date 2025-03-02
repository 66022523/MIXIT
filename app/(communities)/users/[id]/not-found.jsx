import { NotFound as EmptyNotFound } from "@/components/empty";

export default function NotFound() {
  return (
    <EmptyNotFound
      title="User not found"
      description="This user may have been moved or deleted."
    />
  );
}