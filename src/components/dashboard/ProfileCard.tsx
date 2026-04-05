"use client";

import { useState, useRef } from "react";
import { Camera, Edit, Loader2, Upload } from "lucide-react";

interface ProfileData {
  name: string;
  className: string;
  school: string;
  medium: string;
  contact: string;
  avatarUrl?: string;
}

const CLASSES = [
  "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
  "Class XI", "Class XII", "Competitive Exam Aspirant", "Working Professional",
];

const MEDIUMS = ["English", "Hindi", "Bengali", "Other"];

export default function ProfileCard({
  initialData,
  onSave,
}: {
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
}) {
  const [form, setForm] = useState<ProfileData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setUploadingPhoto(true);

    try {
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        // Upload to server
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "academia/profiles");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success && data.url) {
          const updatedForm = { ...form, avatarUrl: data.url };
          setForm(updatedForm);
          localStorage.setItem("studentProfile", JSON.stringify(updatedForm));
          onSave(updatedForm);
        } else {
          // Fallback: save base64 locally if upload fails
          const updatedForm = { ...form, avatarUrl: base64 };
          setForm(updatedForm);
          localStorage.setItem("studentProfile", JSON.stringify(updatedForm));
          onSave(updatedForm);
        }

        setUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Photo upload failed:", error);
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Save to localStorage
    localStorage.setItem("studentProfile", JSON.stringify(form));

    // Save to database via API
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // API not connected yet, localStorage is primary
    }

    onSave(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <section className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 shadow-xl shadow-primary/5">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold font-headline text-primary">
          Student Profile
        </h3>
        <Edit className="text-primary-container w-5 h-5" />
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
          <div className="w-28 h-28 rounded-full border-4 border-primary-container p-1 overflow-hidden transition-transform group-hover:scale-105 bg-surface-container-low">
            {form.avatarUrl ? (
              <img
                src={form.avatarUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary-container/20 flex items-center justify-center text-4xl font-bold text-primary">
                {form.name ? form.name.charAt(0).toUpperCase() : "S"}
              </div>
            )}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            disabled={uploadingPhoto}
          >
            {uploadingPhoto ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Camera size={14} />
            )}
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

        <p className="mt-4 text-sm font-bold text-on-surface-variant flex items-center gap-2">
          <Upload size={14} />
          {uploadingPhoto ? "Uploading..." : "Click to update photo"}
        </p>
        <p className="text-[10px] text-on-surface-variant/50 mt-1">
          JPG, PNG or GIF • Max 5MB
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container transition-all outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">
              Class / Level
            </label>
            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container transition-all appearance-none cursor-pointer outline-none"
            >
              <option value="">Select Class</option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">
            School Name
          </label>
          <input
            type="text"
            name="school"
            value={form.school}
            onChange={handleChange}
            placeholder="Enter your school name"
            className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">
              Medium
            </label>
            <select
              name="medium"
              value={form.medium}
              onChange={handleChange}
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container transition-all appearance-none cursor-pointer outline-none"
            >
              <option value="">Select Medium</option>
              {MEDIUMS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase ml-2">
              Contact No
            </label>
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone number"
              maxLength={10}
              className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-container transition-all outline-none"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : saved ? (
              "Updated!"
            ) : (
              "Update Profile"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
