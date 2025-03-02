import { RectangleStackIcon } from "@heroicons/react/24/outline";

import RequestCircleForm from "@/components/forms/circles/request";
import { Section } from "@/components/section";

export default function RequestCirclePage() {
  return (
    <>
      <Section
        Icon={RectangleStackIcon}
        title="Request New Circle"
        description="Let's add a new game circle that doesn't exist."
      />
      <div className="card bg-base-100">
        <div className="card-body">
          <RequestCircleForm />
        </div>
      </div>
    </>
  );
}
