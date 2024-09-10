export function UserAchievement({ profile }) {
  return (
    <div className="grid auto-cols-max grid-flow-col gap-4">
      <div className="card bg-base-100">
        <div className="card-body flex-row gap-4 p-4">
          <h2 className="card-title rounded-box bg-base-200 p-4 text-4xl text-primary">
            {profile.level || 0}
          </h2>
          <div className="content-center">
            <p>
              <b>Experiences</b>: {profile.exp || 0} / 200
            </p>
            <progress
              className="progress progress-primary w-56"
              value={profile.exp || 0}
              max="200"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col items-center">
        <div className="z-[2] size-20 place-content-center rounded-full bg-primary text-center text-primary-content">
          1
        </div>
        <div className="z-[1] -ml-10 size-20 place-content-center rounded-full bg-accent text-center text-accent-content">
          2
        </div>
        <div className="z-0 -ml-10 size-20 place-content-center rounded-full bg-secondary text-center text-secondary-content">
          3
        </div>
      </div>
    </div>
  );
}