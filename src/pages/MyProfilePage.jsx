import { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe2,
  Save,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Pencil,
  X,
  Sparkles,
  Target,
  Handshake,
  Lightbulb,
  BookOpen,
  Eye,
  EyeOff,
  Building2,
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa6";

import { profileApi } from "../api/profileApi";

import { useNavigate } from "react-router-dom";

const personTypes = [
  { value: "farmer", label: "Farmer" },
  { value: "student", label: "Student" },
  { value: "researcher", label: "Researcher" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "innovator", label: "Innovator" },
  { value: "investor", label: "Investor" },
  { value: "partner", label: "Partner" },
  { value: "mentor", label: "Mentor" },
  { value: "volunteer", label: "Volunteer" },
  { value: "trainer", label: "Trainer" },
  { value: "community_member", label: "Community Member" },
  { value: "academic", label: "Academic" },
  { value: "service_provider", label: "Service Provider" },
  { value: "professional", label: "Professional" },
  { value: "other", label: "Other" },
];

const emptyForm = {
  full_name: "",
  person_type: "community_member",
  bio: "",
  role: "",
  what_i_do: "",
  expertise: "",
  what_i_offer: "",
  what_i_need: "",
  interests: "",
  profile_image: "",
  email: "",
  phone: "",
  linkedin_url: "",
  website: "",
  how_to_engage: "",
  is_public: true,
  location_id: "",
};

export default function MyProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await profileApi.myProfile();
      const data = response?.profile || response;

      setProfile(data);

      setForm({
        full_name: data?.full_name || "",
        person_type: data?.person_type || "community_member",
        bio: data?.bio || "",
        role: data?.role || "",
        what_i_do: data?.what_i_do || "",
        expertise: data?.expertise || "",
        what_i_offer: data?.what_i_offer || "",
        what_i_need: data?.what_i_need || "",
        interests: data?.interests || "",
        profile_image: data?.profile_image || "",
        email: data?.email || "",
        phone: data?.phone || "",
        linkedin_url: data?.linkedin_url || "",
        website: data?.website || "",
        how_to_engage: data?.how_to_engage || "",
        is_public: data?.is_public ?? true,
        location_id: data?.location?.id || "",
      });
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load your profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = () => {
    if (!profile) return;

    setForm({
      full_name: profile?.full_name || "",
      person_type: profile?.person_type || "community_member",
      bio: profile?.bio || "",
      role: profile?.role || "",
      what_i_do: profile?.what_i_do || "",
      expertise: profile?.expertise || "",
      what_i_offer: profile?.what_i_offer || "",
      what_i_need: profile?.what_i_need || "",
      interests: profile?.interests || "",
      profile_image: profile?.profile_image || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      linkedin_url: profile?.linkedin_url || "",
      website: profile?.website || "",
      how_to_engage: profile?.how_to_engage || "",
      is_public: profile?.is_public ?? true,
      location_id: profile?.location?.id || "",
    });

    setEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...form,
        location_id: form.location_id || null,
      };

      const response = await profileApi.updateProfile(payload);

      const updatedProfile =
        response?.profile || response;

      setProfile(updatedProfile);

      setForm((prev) => ({
        ...prev,
        full_name: updatedProfile?.full_name || prev.full_name,
        person_type:
          updatedProfile?.person_type || prev.person_type,
        bio: updatedProfile?.bio ?? prev.bio,
        role: updatedProfile?.role ?? prev.role,
        what_i_do:
          updatedProfile?.what_i_do ?? prev.what_i_do,
        expertise:
          updatedProfile?.expertise ?? prev.expertise,
        what_i_offer:
          updatedProfile?.what_i_offer ?? prev.what_i_offer,
        what_i_need:
          updatedProfile?.what_i_need ?? prev.what_i_need,
        interests:
          updatedProfile?.interests ?? prev.interests,
        profile_image:
          updatedProfile?.profile_image ??
          prev.profile_image,
        email: updatedProfile?.email ?? prev.email,
        phone: updatedProfile?.phone ?? prev.phone,
        linkedin_url:
          updatedProfile?.linkedin_url ??
          prev.linkedin_url,
        website:
          updatedProfile?.website ?? prev.website,
        how_to_engage:
          updatedProfile?.how_to_engage ??
          prev.how_to_engage,
        is_public:
          updatedProfile?.is_public ?? prev.is_public,
        location_id:
          updatedProfile?.location?.id ||
          prev.location_id,
      }));

      setSuccess(
        response?.message || "Profile updated successfully."
      );

      setEditing(false);

      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const completeness = useMemo(() => {
    if (!profile) return 0;

    const fields = [
      profile.full_name,
      profile.person_type,
      profile.bio,
      profile.role,
      profile.what_i_do,
      profile.expertise,
      profile.what_i_offer,
      profile.what_i_need,
      profile.interests,
      profile.profile_image,
      profile.email,
      profile.phone,
      profile.how_to_engage,
    ];

    const completed = fields.filter(
      (value) =>
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    ).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAF7]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#07505E] animate-spin mx-auto" />
          <p className="mt-4 text-slate-600">
            Loading your IGATI profile...
          </p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAF7] px-6">
        <div className="max-w-md w-full rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
            <X className="w-7 h-7 text-red-600" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            {error}
          </p>

          <button
            onClick={loadProfile}
            className="mt-6 px-5 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#07505E]/10 text-[#07505E] text-sm font-semibold">
              <User className="w-4 h-4" />
              IGATI Ecosystem Profile
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#073B4C]">
              My Profile
            </h1>

            <p className="mt-2 text-slate-600 max-w-2xl">
              Your profile represents who you are, what you do,
              what you can offer, and how others in the IGATI
              ecosystem can connect with you.
            </p>
          </div>

          {!editing ? (
            <button
              onClick={() => {
                setEditing(true);
                setSuccess("");
                setError("");
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              <X className="w-4 h-4" />
              Cancel Editing
            </button>
          )}


          <button
  onClick={() =>
    navigate("/organisations/register")
  }
  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#07505E] bg-white text-[#07505E] font-semibold hover:bg-[#07505E]/5 transition"
>
  <Building2 className="w-4 h-4" />
  Register Organisation
</button>
        </div>

        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700 mt-0.5" />

            <div>
              <p className="font-semibold text-green-800">
                Profile updated
              </p>

              <p className="text-sm text-green-700 mt-0.5">
                {success}
              </p>
            </div>
          </div>
        )}

        {error && profile && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}


        

        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] gap-8">

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-28 bg-gradient-to-br from-[#073B4C] via-[#07505E] to-[#6C994E]" />

              <div className="px-6 pb-6">
                <div className="-mt-14">
                  <div className="w-28 h-28 rounded-3xl bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                    {profile?.profile_image ? (
                      <img
                        src={profile.profile_image}
                        alt={profile.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <User className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-[#073B4C]">
                      {profile?.full_name}
                    </h2>

                    {profile?.is_verified && (
                      <span
                        title="Verified member"
                        className="inline-flex items-center justify-center"
                      >
                        <ShieldCheck className="w-5 h-5 text-[#6C994E]" />
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm font-medium text-[#07505E]">
                    {profile?.person_type_display ||
                      personTypes.find(
                        (item) =>
                          item.value === profile?.person_type
                      )?.label ||
                      profile?.person_type}
                  </p>

                  {profile?.role && (
                    <p className="mt-2 text-sm text-slate-600">
                      {profile.role}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                  {profile?.email && (
                    <ProfileMeta
                      icon={Mail}
                      value={profile.email}
                    />
                  )}

                  {profile?.phone && (
                    <ProfileMeta
                      icon={Phone}
                      value={profile.phone}
                    />
                  )}

                  {profile?.location?.name && (
                    <ProfileMeta
                      icon={MapPin}
                      value={profile.location.name}
                    />
                  )}

                  {profile?.website && (
                    <ProfileMeta
                      icon={Globe2}
                      value={profile.website}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Completion */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Profile completeness
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Complete your profile to improve discovery.
                  </p>
                </div>

                <div className="text-xl font-bold text-[#07505E]">
                  {completeness}%
                </div>
              </div>

              <div className="mt-4 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#6C994E] transition-all"
                  style={{
                    width: `${completeness}%`,
                  }}
                />
              </div>
            </div>

            {/* Visibility */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#07505E]/10 flex items-center justify-center">
                  {profile?.is_public ? (
                    <Eye className="w-5 h-5 text-[#07505E]" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {profile?.is_public
                      ? "Public Profile"
                      : "Private Profile"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {profile?.is_public
                      ? "Other ecosystem members can discover your profile."
                      : "Your profile is currently hidden from the public directory."}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main>
            {editing ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <FormSection
                  title="Basic Information"
                  description="Tell the ecosystem who you are."
                  icon={User}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Full Name"
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                    />

                    <SelectField
                      label="Member Type"
                      name="person_type"
                      value={form.person_type}
                      onChange={handleChange}
                      options={personTypes}
                    />

                    <InputField
                      label="Current Role / Occupation"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="e.g. Researcher, Farmer, Founder"
                    />

                    <InputField
                      label="Profile Image URL"
                      name="profile_image"
                      value={form.profile_image}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>

                  <TextareaField
                    label="Bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Give a short introduction about yourself..."
                  />
                </FormSection>

                <FormSection
                  title="What I Do"
                  description="Help others understand your skills, work and experience."
                  icon={Briefcase}
                >
                  <TextareaField
                    label="What I Do"
                    name="what_i_do"
                    value={form.what_i_do}
                    onChange={handleChange}
                    placeholder="Describe the work you do..."
                  />

                  <TextareaField
                    label="Skills & Expertise"
                    name="expertise"
                    value={form.expertise}
                    onChange={handleChange}
                    placeholder="e.g. Agriculture, Software Engineering, Research, Business Development..."
                  />
                </FormSection>

                <FormSection
                  title="Value Exchange"
                  description="This information will later help IGATI match people, organisations and opportunities."
                  icon={Handshake}
                >
                  <TextareaField
                    label="What I Offer"
                    name="what_i_offer"
                    value={form.what_i_offer}
                    onChange={handleChange}
                    placeholder="Products, services, skills, expertise, mentorship, knowledge..."
                  />

                  <TextareaField
                    label="What I Need"
                    name="what_i_need"
                    value={form.what_i_need}
                    onChange={handleChange}
                    placeholder="Partners, funding, buyers, mentorship, equipment, knowledge..."
                  />

                  <TextareaField
                    label="Interests"
                    name="interests"
                    value={form.interests}
                    onChange={handleChange}
                    placeholder="What areas or themes are you interested in?"
                  />
                </FormSection>

                <FormSection
                  title="Contact & Engagement"
                  description="Show other ecosystem members how they can reach and engage with you."
                  icon={Globe2}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                    />

                    <InputField
                      label="Phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />

                    <InputField
                      label="LinkedIn URL"
                      name="linkedin_url"
                      value={form.linkedin_url}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                    />

                    <InputField
                      label="Website"
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>

                  <TextareaField
                    label="How People Can Engage With Me"
                    name="how_to_engage"
                    value={form.how_to_engage}
                    onChange={handleChange}
                    placeholder="Describe the kinds of collaborations or connections you welcome..."
                  />

                  <label className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_public"
                      checked={form.is_public}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 accent-[#07505E]"
                    />

                    <div>
                      <p className="font-semibold text-slate-900">
                        Make my profile public
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        Allow other IGATI ecosystem participants
                        to discover and view your profile.
                      </p>
                    </div>
                  </label>
                </FormSection>

                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">

                <ProfileSection
                  title="About Me"
                  icon={User}
                >
                  <ProfileText
                    value={profile?.bio}
                    empty="You have not added a bio yet."
                  />
                </ProfileSection>

                <ProfileSection
                  title="What I Do"
                  icon={Briefcase}
                >
                  <ProfileText
                    value={profile?.what_i_do}
                    empty="You have not described what you do yet."
                  />

                  <InfoBlock
                    title="Skills & Expertise"
                    icon={BookOpen}
                    value={profile?.expertise}
                  />
                </ProfileSection>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <ProfileSection
                    title="What I Offer"
                    icon={Sparkles}
                  >
                    <ProfileText
                      value={profile?.what_i_offer}
                      empty="You have not added what you offer yet."
                    />
                  </ProfileSection>

                  <ProfileSection
                    title="What I Need"
                    icon={Target}
                  >
                    <ProfileText
                      value={profile?.what_i_need}
                      empty="You have not added what you need yet."
                    />
                  </ProfileSection>
                </div>

                <ProfileSection
                  title="Interests"
                  icon={Lightbulb}
                >
                  <ProfileText
                    value={profile?.interests}
                    empty="No interests added yet."
                  />
                </ProfileSection>

                <ProfileSection
                  title="How to Engage With Me"
                  icon={Handshake}
                >
                  <ProfileText
                    value={profile?.how_to_engage}
                    empty="You have not described how other members can engage with you yet."
                  />
                </ProfileSection>

                <ProfileSection
                  title="Contact Information"
                  icon={Globe2}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContactCard
                      icon={Mail}
                      label="Email"
                      value={profile?.email}
                    />

                    <ContactCard
                      icon={Phone}
                      label="Phone"
                      value={profile?.phone}
                    />

                    <ContactCard
                      icon={FaLinkedin}
                      label="LinkedIn"
                      value={profile?.linkedin_url}
                      link
                    />

                    <ContactCard
                      icon={Globe2}
                      label="Website"
                      value={profile?.website}
                      link
                    />
                  </div>
                </ProfileSection>

                {(profile?.themes?.length > 0 ||
                  profile?.communities?.length > 0) && (
                  <ProfileSection
                    title="My Ecosystem"
                    icon={Globe2}
                  >
                    {profile?.themes?.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-800 mb-3">
                          Themes
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {profile.themes.map((theme) => (
                            <span
                              key={theme.id}
                              className="px-3 py-1.5 rounded-full bg-[#07505E]/10 text-[#07505E] text-sm font-medium"
                            >
                              {theme.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {profile?.communities?.length > 0 && (
                      <div className="mt-6">
                        <p className="text-sm font-semibold text-slate-800 mb-3">
                          Communities
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {profile.communities.map(
                            (community) => (
                              <span
                                key={community.id}
                                className="px-3 py-1.5 rounded-full bg-[#6C994E]/10 text-[#52753C] text-sm font-medium"
                              >
                                {community.name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </ProfileSection>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function ProfileMeta({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600 min-w-0">
      <Icon className="w-4 h-4 text-[#07505E] shrink-0" />
      <span className="truncate">
        {value}
      </span>
    </div>
  );
}

function ProfileSection({
  title,
  icon: Icon,
  children,
}) {
  return (
    <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-[#07505E]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#07505E]" />
        </div>

        <h2 className="text-xl font-bold text-[#073B4C]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}) {
  return (
    <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-7">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-[#07505E]/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#07505E]" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#073B4C]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none resize-y transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ProfileText({ value, empty }) {
  return (
    <p className="text-slate-600 leading-7 whitespace-pre-line">
      {value || (
        <span className="italic text-slate-400">
          {empty}
        </span>
      )}
    </p>
  );
}

function InfoBlock({
  title,
  icon: Icon,
  value,
}) {
  if (!value) return null;

  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-[#6C994E]" />

        <p className="text-sm font-bold text-slate-800">
          {title}
        </p>
      </div>

      <p className="text-slate-600 leading-7 whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  link = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#07505E]/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-[#07505E]" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          {value ? (
            link ? (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-medium text-[#07505E] hover:underline break-all"
              >
                {value}
              </a>
            ) : (
              <p className="mt-1 text-sm font-medium text-slate-700 break-all">
                {value}
              </p>
            )
          ) : (
            <p className="mt-1 text-sm text-slate-400">
              Not provided
            </p>
          )}
        </div>
      </div>
    </div>
  );
}