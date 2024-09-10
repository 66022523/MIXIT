import { CircleTall } from "@/components/circle";
import { Empty } from "@/components/empty";

export function UserTabCircles({ profile }) {
  return (
    <>
      {profile.circles?.length ? (
        profile.circles.map((circle, index) => (
          <CircleTall
            id={circle.id}
            coverURL={circle.cover_url}
            iconURL={circle.icon_url}
            name={circle.name}
            description={circle.description}
            key={index}
          />
        ))
      ) : (
        <Empty description="This user is not in any circles yet." />
      )}
    </>
  );
}
