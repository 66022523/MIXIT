import { Section } from "@/components/section";
import {
  BookOpenIcon,
  IdentificationIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import { getUser } from "@/libs/queries/auth";

export default async function PrivacySettings() {
  const { user } = await getUser();

  return (
    <div className="space-y-4">
      <Section
        Icon={LockClosedIcon}
        title="Privacy"
        description="Configure your privacy settings."
      />
      {user && (
        <div className="card bg-base-100">
          <div className="card-body space-y-4">
            <Section
              Icon={IdentificationIcon}
              title="Profile"
              description="Privacy settings for your profile."
            />
            <div className="space-y-2 rounded-box bg-base-200 p-2">
              <div className="form-control rounded-box bg-base-100 p-4">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Show the country you&apos;re in on your profile.
                  </span>
                  <input
                    type="checkbox"
                    className="toggle checked:border-primary checked:bg-base-100 checked:[--tglbg:oklch(var(--p))] hover:opacity-80"
                  />
                </label>
              </div>
              <div className="form-control rounded-box bg-base-100 p-4">
                <label className="label cursor-pointer">
                  <span className="label-text">
                    Show your grade level experience on your profile
                  </span>
                  <input
                    type="checkbox"
                    className="toggle checked:border-primary checked:bg-base-100 checked:[--tglbg:oklch(var(--p))] hover:opacity-80"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="card bg-base-100">
        <div className="card-body space-y-4">
          <Section
            Icon={BookOpenIcon}
            title="Legal"
            description="Your privacy is about the law."
          />
          <div className="space-y-2 rounded-box bg-base-200 p-2">
            <div className="form-control rounded-box bg-base-100 p-4">
              <label className="label cursor-pointer">
                <span className="label-text">Terms of service</span>
                <input
                  type="checkbox"
                  className="toggle checked:border-primary checked:bg-base-100 checked:[--tglbg:oklch(var(--p))] hover:opacity-80"
                />
              </label>
            </div>
            <div className="form-control rounded-box bg-base-100 p-4">
              <label className="label cursor-pointer">
                <span className="label-text">Privacy policy</span>
                <input
                  type="checkbox"
                  className="toggle checked:border-primary checked:bg-base-100 checked:[--tglbg:oklch(var(--p))] hover:opacity-80"
                />
              </label>
            </div>
            <div className="form-control rounded-box bg-base-100 p-4">
              <label className="label cursor-pointer">
                <span className="label-text">Cookies policy</span>
                <input
                  type="checkbox"
                  className="toggle checked:border-primary checked:bg-base-100 checked:[--tglbg:oklch(var(--p))]"
                  defaultChecked
                  disabled
                />
              </label>
              <div className="label">
                <span className="label-text-alt">
                  The website will not be able to continue to function if the
                  cookie policy is not accepted.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
