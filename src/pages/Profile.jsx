import React, { useState, useEffect } from 'react';

const Profile = ({ currentUser, onUpdateProfile }) => {
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    gender: '',
    education: '',
    category: '',
    resume: null
  });

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.profile?.name || currentUser.name || '',
        phone: currentUser.profile?.phone || currentUser.phone || '',
        location: currentUser.profile?.location || '',
        experience: currentUser.profile?.experience || '',
        skills: currentUser.profile?.skills || '',
        gender: currentUser.profile?.gender || '',
        education: currentUser.profile?.education || '',
        category: currentUser.profile?.category || '',
        resume: currentUser.profile?.resume || null
      });
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
    <div className="min-h-screen py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div
        className="max-w-3xl mx-auto 
        bg-white/30 backdrop-blur-2xl
        border border-white/40
        rounded-3xl
        shadow-[0_10px_40px_rgba(0,0,0,0.1)]
        p-10
        transition-all duration-500
        hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]
        animate-fadeIn"
      >
        <h2 className="text-4xl font-bold mb-10 text-slate-900 tracking-tight">
          My Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Text Inputs */}
          {["name", "phone", "location", "experience", "education", "category"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={profileForm[field]}
              onChange={(e) =>
                setProfileForm({ ...profileForm, [field]: e.target.value })
              }
              className="w-full px-5 py-4
                bg-white/50 backdrop-blur-md
                border border-white/50
                rounded-2xl
                shadow-inner
                focus:outline-none
                focus:ring-2 focus:ring-blue-500/40
                focus:shadow-[0_0_25px_rgba(37,99,235,0.2)]
                transition-all duration-300"
              required
            />
          ))}

          {/* Gender Dropdown */}
          <select
            value={profileForm.gender}
            onChange={(e) =>
              setProfileForm({ ...profileForm, gender: e.target.value })
            }
            className="w-full px-5 py-4
              bg-white/50 backdrop-blur-md
              border border-white/50
              rounded-2xl
              shadow-inner
              focus:outline-none
              focus:ring-2 focus:ring-blue-500/40
              focus:shadow-[0_0_25px_rgba(37,99,235,0.2)]
              transition-all duration-300"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          {/* Skills */}
          <textarea
            placeholder="Skills"
            value={profileForm.skills}
            onChange={(e) =>
              setProfileForm({ ...profileForm, skills: e.target.value })
            }
            className="w-full px-5 py-4
              bg-white/50 backdrop-blur-md
              border border-white/50
              rounded-2xl
              shadow-inner
              focus:outline-none
              focus:ring-2 focus:ring-blue-500/40
              focus:shadow-[0_0_25px_rgba(37,99,235,0.2)]
              transition-all duration-300"
            required
          />

          {/* Resume Upload */}
          <div>
            <label className="block font-semibold mb-3 text-slate-800">
              Resume (PDF / DOC / DOCX)
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full 
                border border-white/50
                bg-white/40 backdrop-blur-md
                rounded-2xl
                file:mr-4 file:px-5 file:py-3
                file:rounded-xl file:border-0
                file:bg-gradient-to-r file:from-blue-600 file:to-blue-500
                file:text-white file:font-medium
                hover:file:from-blue-700 hover:file:to-blue-600
                transition-all duration-300"
              required={!profileForm.resume}
            />

            {profileForm.resume && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                Uploaded: {typeof profileForm.resume === 'string'
                  ? profileForm.resume.split('/').pop()
                  : profileForm.resume?.name}
              </p>
            )}
          </div>

          {/* Premium Liquid Glass Button */}
          <button
            className="relative w-full py-4
              rounded-2xl
              font-semibold text-white text-lg
              bg-gradient-to-br from-blue-500/90 to-blue-700/70
              backdrop-blur-xl
              border border-white/30
              shadow-[0_15px_50px_rgba(37,99,235,0.4)]
              hover:shadow-[0_20px_70px_rgba(37,99,235,0.6)]
              hover:scale-[1.03]
              active:scale-[0.97]
              transition-all duration-300 ease-out
              overflow-hidden"
          >
            <span className="relative z-10">Save Profile</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default Profile;
