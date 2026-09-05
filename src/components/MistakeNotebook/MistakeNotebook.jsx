import React, { useState } from 'react';
import { BookX, Plus, Trash2, Tag, Filter, CheckCircle2, AlertTriangle, BookOpen, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MISTAKE_TYPES = [
  "Concept mistake",
  "Calculation mistake",
  "Silly mistake",
  "Time-management mistake",
  "Formula mistake"
];

export function MistakeNotebook() {
  const { mistakes, addMistake, deleteMistake } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    subject: 'Physics',
    topic: '',
    question: '',
    mistakeType: 'Concept mistake',
    description: '',
    correctMethod: '',
    learned: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.topic || !form.description) return;
    addMistake(form);
    setForm({
      subject: 'Physics',
      topic: '',
      question: '',
      mistakeType: 'Concept mistake',
      description: '',
      correctMethod: '',
      learned: ''
    });
    setShowAddForm(false);
  };

  // Filter mistakes
  const filteredMistakes = mistakes.filter((m) => {
    const matchesSubject = selectedSubjectFilter === 'All' || m.subject === selectedSubjectFilter;
    const matchesType = selectedTypeFilter === 'All' || m.mistakeType === selectedTypeFilter;
    const matchesQuery = searchQuery === '' || 
      m.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesType && matchesQuery;
  });

  // Analytics counts
  const physicsCount = mistakes.filter((m) => m.subject === 'Physics').length;
  const chemistryCount = mistakes.filter((m) => m.subject === 'Chemistry').length;
  const mathsCount = mistakes.filter((m) => m.subject === 'Maths').length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
            <BookX className="w-4 h-4" />
            <span>Error Protocol & Learning Log</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Kishore's Mistake Notebook</h2>
          <p className="text-xs text-slate-400 mt-1">
            Tag errors, document correct methods, and build an unshakeable JEE problem-solving technique.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-500/20 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Mistake</span>
        </button>
      </div>

      {/* Analytics Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Physics Mistakes</div>
            <div className="text-2xl font-extrabold text-blue-400 mt-0.5">{physicsCount}</div>
          </div>
          <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-bold">Physics</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Chemistry Mistakes</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">{chemistryCount}</div>
          </div>
          <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-bold">Chemistry</span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Maths Mistakes</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-0.5">{mathsCount}</div>
          </div>
          <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-bold">Maths</span>
        </div>
      </div>

      {/* Log Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-red-500/40 p-6 rounded-3xl space-y-4 animate-fadeIn">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Add Mistake Log Entry</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Topic Name</label>
              <input
                type="text"
                placeholder="e.g. Electrostatics / Integration"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Mistake Type</label>
              <select
                value={form.mistakeType}
                onChange={(e) => setForm({ ...form, mistakeType: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              >
                {MISTAKE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Question Reference / Context</label>
            <input
              type="text"
              placeholder="e.g. JEE Main 2023 Q14 (Axial electric field formula)"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">What went wrong (Mistake Description)</label>
              <textarea
                placeholder="Describe your error..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 h-24"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Correct Method & Solution Path</label>
              <textarea
                placeholder="Write the correct formula or step..."
                value={form.correctMethod}
                onChange={(e) => setForm({ ...form, correctMethod: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 h-24"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Key Takeaway ("What I Learned")</label>
            <input
              type="text"
              placeholder="e.g. Always write down formula before substituting numericals!"
              value={form.learned}
              onChange={(e) => setForm({ ...form, learned: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg"
            >
              Save to Notebook
            </button>
          </div>
        </form>
      )}

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search topic or question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5"
          >
            <option value="All">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
          </select>

          <select
            value={selectedTypeFilter}
            onChange={(e) => setSelectedTypeFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5"
          >
            <option value="All">All Mistake Types</option>
            {MISTAKE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Mistake Entries List */}
      <div className="space-y-4">
        {filteredMistakes.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl text-center text-slate-400 text-xs">
            No mistakes match your filter criteria.
          </div>
        ) : (
          filteredMistakes.map((m) => (
            <div key={m.id} className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-slate-700 transition">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    m.subject === 'Physics' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    m.subject === 'Chemistry' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {m.subject}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">{m.topic}</h4>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                    {m.mistakeType}
                  </span>
                  <button
                    onClick={() => deleteMistake(m.id)}
                    className="text-slate-500 hover:text-red-400 transition p-1"
                    title="Delete mistake entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {m.question && (
                <div className="text-xs text-indigo-300 font-medium bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-400">Question Ref:</span> {m.question}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-red-400 block mb-1">❌ What Went Wrong:</span>
                  <p className="text-slate-300">{m.description}</p>
                </div>

                <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-emerald-400 block mb-1">✅ Correct Solution Method:</span>
                  <p className="text-slate-300">{m.correctMethod}</p>
                </div>
              </div>

              {m.learned && (
                <div className="flex items-center space-x-2 text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong>Key Takeaway:</strong> {m.learned}</span>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}
