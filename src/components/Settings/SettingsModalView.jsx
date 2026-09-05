import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, User, Download, Upload, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNotifications } from '../../hooks/useNotifications';

export function SettingsModalView({ isOpen, onClose }) {
  const { userProfile, setUserProfile } = useApp();
  const { requestPermission } = useNotifications();

  const [profileForm, setProfileForm] = useState(userProfile);
  const [saveMessage, setSaveMessage] = useState('');

  if (!isOpen) return null;

  const handleToggleNotification = async (key) => {
    if (!profileForm.notificationsEnabled && key === 'notificationsEnabled') {
      const granted = await requestPermission();
      if (!granted) {
        alert("Please enable notification permissions in your browser settings.");
      }
    }
    setProfileForm((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile(profileForm);
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => {
      setSaveMessage('');
      onClose();
    }, 800);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('kishore_jee_os_groundup_v2') || '{}');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kishore_jee_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed && typeof parsed === 'object') {
            localStorage.setItem('kishore_jee_os_groundup_v2', JSON.stringify(parsed));
            alert("Data imported! Reloading...");
            window.location.reload();
          }
        } catch (err) {
          alert("Invalid backup file format.");
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 p-5 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative space-y-5 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <SettingsIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">System Settings & Profile</h2>
            <p className="text-xs text-slate-400">Kishore's preferences and alerts</p>
          </div>
        </div>

        {saveMessage && (
          <div className="p-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-xl text-center">
            {saveMessage}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-2.5">
            <h3 className="font-bold text-slate-300 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Profile</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Target Exam</label>
                <input
                  type="text"
                  value={profileForm.exam}
                  onChange={(e) => setProfileForm({ ...profileForm, exam: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <h3 className="font-bold text-slate-300 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <Bell className="w-4 h-4 text-indigo-400" />
              <span>Reminders</span>
            </h3>

            <div className="space-y-2">
              {[
                { key: 'notificationsEnabled', label: '🔔 Browser Desktop Notifications' },
                { key: 'audioAlertsEnabled', label: '🔊 Audio Sound Chimes' },
                { key: 'remindStudySessions', label: '⏰ Study Session Reminder' },
                { key: 'remindBreaks', label: '☕ Break Reminder' },
                { key: 'remindMock', label: '🧪 Saturday Mock Test Reminder' },
                { key: 'remindSleep', label: '🌙 11:00 PM Sleep Reminder' }
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 cursor-pointer text-slate-200 min-h-[44px]">
                  <span className="font-medium">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={profileForm[item.key] !== false}
                    onChange={() => handleToggleNotification(item.key)}
                    className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 h-5 w-5"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleExportData}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 flex items-center justify-center space-x-1.5 transition min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>

              <label className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 flex items-center justify-center space-x-1.5 transition cursor-pointer text-center min-h-[44px]">
                <Upload className="w-4 h-4" />
                <span>Import JSON</span>
                <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold min-h-[44px]"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
