import { useState } from "react";
import Spinner from "../components/ui/Spinner";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUserSkills } from "../hooks/useUserSkills";
import { useUpdateCurrentUser } from "../hooks/useUpdateCurrentUser";

const ProfilePage = () => {
  const { profile, loading } = useCurrentUser();
  const { mutate: updateUser, isPending } = useUpdateCurrentUser();
  const { skills } = useUserSkills();

  const [activeTab, setActiveTab] = useState<"profile" | "skills">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<typeof profile | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (loading) return <Spinner />;
  if (!profile) return null;

  return (
    <div className="py-10 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="flex items-center gap-1 p-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              activeTab === "profile"
                ? "bg-white text-black font-medium"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Profile
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              activeTab === "skills"
                ? "bg-white text-black font-medium"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Skills
          </button>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Personal Info</h2>

                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!form) return;

                        updateUser(
                          {
                            username: form.username,
                            firstName: form.firstName,
                            lastName: form.lastName,
                          },
                          {
                            onSuccess: () => {
                              setIsEditing(false);
                              setForm(null);
                              setErrors({});
                            },
                            onError: (err: any) => {
                              const message = err.response?.data?.message;
                              const newErrors: Record<string, string> = {};

                              if (Array.isArray(message)) {
                                message.forEach((msg: string) => {
                                  const lower = msg.toLowerCase();

                                  if (lower.includes("username")) {
                                    newErrors.username = msg;
                                  } else if (lower.includes("first name")) {
                                    newErrors.firstName = msg;
                                  } else if (lower.includes("last name")) {
                                    newErrors.lastName = msg;
                                  }
                                });
                              } else if (typeof message === "string") {
                                newErrors.username = message;
                              }

                              setErrors(newErrors);
                            },
                          },
                        );
                      }}
                      disabled={isPending}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Saving..." : "Save"}
                    </button>

                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setForm(null);
                        setErrors({});
                      }}
                      disabled={isPending}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setForm(profile);
                      setErrors({});
                    }}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/25 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-xs text-white/40 uppercase mb-1.5">
                    Username
                  </p>
                  {isEditing ? (
                    <>
                      <input
                        value={form?.username ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;

                          setForm((prev) =>
                            prev ? { ...prev, username: value } : prev,
                          );

                          setErrors((prev) => {
                            const { username, ...rest } = prev;
                            return rest;
                          });
                        }}
                        className={`w-full px-3 py-2 rounded-lg bg-white/5 border text-sm text-white outline-none transition-colors ${
                          errors.username
                            ? "border-red-500"
                            : "border-white/10 focus:border-indigo-500/50"
                        }`}
                      />
                      {errors.username && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.username}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-white">{profile.username}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-white/40 uppercase mb-1.5">
                    Email
                  </p>
                  <p className="text-sm text-white">{profile.email}</p>
                </div>

                <div>
                  <p className="text-xs text-white/40 uppercase mb-1.5">
                    First Name
                  </p>
                  {isEditing ? (
                    <>
                      <input
                        value={form?.firstName ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;

                          setForm((prev) =>
                            prev ? { ...prev, firstName: value } : prev,
                          );

                          setErrors((prev) => {
                            const { firstName, ...rest } = prev;
                            return rest;
                          });
                        }}
                        className={`w-full px-3 py-2 rounded-lg bg-white/5 border text-sm text-white outline-none transition-colors ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-white/10 focus:border-indigo-500/50"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.firstName}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-white">{profile.firstName}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-white/40 uppercase mb-1.5">
                    Last Name
                  </p>
                  {isEditing ? (
                    <>
                      <input
                        value={form?.lastName ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;

                          setForm((prev) =>
                            prev ? { ...prev, lastName: value } : prev,
                          );

                          setErrors((prev) => {
                            const { lastName, ...rest } = prev;
                            return rest;
                          });
                        }}
                        className={`w-full px-3 py-2 rounded-lg bg-white/5 border text-sm text-white outline-none transition-colors ${
                          errors.lastName
                            ? "border-red-500"
                            : "border-white/10 focus:border-indigo-500/50"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.lastName}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-white">{profile.lastName}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills" && <div>Skills content</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
