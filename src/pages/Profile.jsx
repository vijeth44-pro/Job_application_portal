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
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-6">My Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            value={profileForm.name}
            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            placeholder="Phone"
            value={profileForm.phone}
            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            placeholder="Location"
            value={profileForm.location}
            onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            placeholder="Experience"
            value={profileForm.experience}
            onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Skills"
            value={profileForm.skills}
            onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          {/* ✅ RESUME UPLOAD */}
          <div>
            <label className="block font-medium mb-2">Resume (PDF / DOC / DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full"
              required={!profileForm.resume}
            />
            {profileForm.resume && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {profileForm.resume.name}
              </p>
            )}
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
