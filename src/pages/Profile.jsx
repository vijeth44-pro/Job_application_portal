import React, { useState, useEffect } from 'react';

const Profile = ({ currentUser, onUpdateProfile }) => {
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    resume: null
  });

  useEffect(() => {
    if (currentUser?.profile) {
      setProfileForm(currentUser.profile);
    }
  }, [currentUser]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfileForm({
        ...profileForm,
        resume: {
          name: file.name,
          type: file.type,
          data: reader.result
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto 
        bg-white/80 backdrop-blur-xl
        border border-blue-100
        rounded-xl
        shadow-md hover:shadow-xl
        transition-all duration-300
        p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-slate-900">
          My Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Inputs */}
          {["name", "phone", "location", "experience"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={profileForm[field]}
              onChange={(e) =>
                setProfileForm({ ...profileForm, [field]: e.target.value })
              }
              className="w-full px-4 py-3 
                bg-white/90
                border border-blue-100
                rounded-lg
                shadow-sm
                focus:outline-none
                focus:ring-2 focus:ring-blue-400/40
                focus:border-blue-400
                transition-all duration-200"
              required
            />
          ))}

          {/* Skills */}
          <textarea
            placeholder="Skills"
            value={profileForm.skills}
            onChange={(e) =>
              setProfileForm({ ...profileForm, skills: e.target.value })
            }
            className="w-full px-4 py-3 
              bg-white/90
              border border-blue-100
              rounded-lg
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-blue-400/40
              focus:border-blue-400
              transition-all duration-200"
            required
          />

          {/* Resume Upload */}
          <div>
            <label className="block font-medium mb-2 text-slate-700">
              Resume (PDF / DOC / DOCX)
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full 
                border border-blue-100
                rounded-lg
                file:mr-4 file:px-4 file:py-2
                file:rounded-lg file:border-0
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                transition-all duration-200"
              required={!profileForm.resume}
            />

            {profileForm.resume && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {profileForm.resume.name}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            className="w-full py-3
              bg-gradient-to-r from-blue-700 to-blue-500
              text-white font-semibold
              rounded-lg
              shadow-md
              hover:shadow-lg
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200"
          >
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;
