import { Section } from "@/components/section";
import { EnvelopeIcon, KeyIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

import config from "@/config"

export default function SecuritySettings() {
  return (
    <div className="space-y-4">
      <Section
        Icon={ShieldCheckIcon}
        title="Security"
        description="Protect your account from bad actors."
      />
      <form className="card bg-base-100" id="email">
        <div className="card-body space-y-4">
          <Section
            Icon={EnvelopeIcon}
            title="Email"
            description="Change your email."
          />
          <label className="form-control w-full">
            <div className="input input-bordered flex items-center gap-2">
              <EnvelopeIcon className="size-4 opacity-70" />
              <input
                type="email"
                className="grow"
                placeholder="New Email"
                required
              />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="input input-bordered flex items-center gap-2">
              <EnvelopeIcon className="size-4 opacity-70" />
              <input
                type="password"
                className="grow"
                placeholder="Confirm New Email"
                required
              />
            </div>
          </label>
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              <LockClosedIcon className="size-5" /> Update Email
            </button>
          </div>
        </div>
      </form>
      <form className="card bg-base-100" id="password">
        <div className="card-body space-y-4">
          <Section
            Icon={EnvelopeIcon}
            title="Password"
            description="Change your password."
          />
          <label className="form-control w-full">
            <div className="input input-bordered flex items-center gap-2">
              <EnvelopeIcon className="size-4 opacity-70" />
              <input
                type="password"
                className="grow"
                placeholder="New Password"
                pattern={config.validation.password_regex.source}
                minLength={config.validation.min_password}
                required
              />
            </div>
            <div className="label">
              <span className="label-text-alt">
                Minimum {config.validation.min_password} characters, lowercase,
                uppercase letters, digits and symbols
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="input input-bordered flex items-center gap-2">
              <EnvelopeIcon className="size-4 opacity-70" />
              <input
                type="password"
                className="grow"
                placeholder="Confirm New Password"
                required
              />
            </div>
          </label>
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              <LockClosedIcon className="size-5" /> Update Password
            </button>
          </div>
        </div>
      </form>
      <form className="card bg-base-100">
        <div className="card-body space-y-4">
          <Section
            Icon={KeyIcon}
            title="MFA"
            description="Multi-Factor Authentication (MFA)"
          />
          <p>
            Enable multi-step verification to increase the security of your
            account through the authenticator app.
          </p>
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              Enable TOTP Factor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
