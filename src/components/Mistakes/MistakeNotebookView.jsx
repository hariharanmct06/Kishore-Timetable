import React, { useState } from 'react';
import { BookX, Plus, Trash2, ChevronDown, ChevronUp, AlertTriangle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const MISTAKE_TYPES = [
  "Concept",
  "Calculation",
  "Formula",
  "Silly Mistake",
  "Time Management"
];

export function MistakeNotebookView() {
  const { mistakes, addMistake, deleteMistake } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    subject: 'Physics',
    topic: '',
    question: '',
    mistakeType: 'Concept',
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
      mistakeType: 'Concept',
      description: '',
      correctMethod: '',
      learned: ''
    });
    setShowAddForm(false);
  };

  const filteredMistakes = mistakes.filter((m) => {
    const matchesSubject = selectedSubjectFilter === 'All' || m.subject === selectedSubjectFilter;
    const matchesQuery = searchQuery === '' || 
      m.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-3xl backdrop-blur-md flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-red-400 uppercase tracking-wider">
            <BookX className="w-4 h-4" />
            <span>ERROR PROTOCOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">Kishore's Mistake Notebook</h2>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3.5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition flex items-center space-x-1.5 min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Log Mistake</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-red-500/40 p-5 rounded-3xl space-y-3 text-xs animate-fadeIn">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Log Mistake Entry</span>
          </h3>

          <div className="space-y-2">
            <div>
              <label className="text-slate-400 block mb-1">Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Topic Name</label>
              <input
                type="text"
                placeholder="e.g. Electrostatics"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Mistake Type</label>
              <select
                value={form.mistakeType}
                onChange={(e) => setForm({ ...form, mistakeType: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                {MISTAKE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Question Reference</label>
            <input
              type="text"
              placeholder="e.g. JEE Main 2023 Q14"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">What went wrong</label>
            <textarea
              placeholder="Describe your error..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white h-20"
              required
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Correct Solution Method</label>
            <textarea
              placeholder="Correct formula or step..."
              value={form.correctMethod}
              onChange={(e) => setForm({ ...form, correctMethod: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white h-20"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1">Key Takeaway ("What I Learned")</label>
            <input
              type="text"
              placeholder="Key lesson..."
              value={form.learned}
              onChange={(e) => setForm({ ...form, learned: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold"
            >
              Save to Notebook
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search mistake notebook..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Accordion Entries */}
      <div className="space-y-2.5">
        {filteredMistakes.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center text-slate-400 text-xs">
            No mistakes found matching search.
          </div>
        ) : (
          filteredMistakes.map((m) => {
            const isExpanded = expandedId === m.id;
            return (
              <div key={m.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all">
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : m.id)}
                  className="p-4 flex items-center justify-between cursor-pointer space-x-2 select-none"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      m.subject === 'Physics' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      m.subject === 'Chemistry' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {m.subject}
                    </span>

                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-100 truncate">{m.topic}</h4>
                      <p className="text-[10px] text-red-400 font-semibold truncate">⚠️ {m.mistakeType}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMistake(m.id); }}
                      className="text-slate-500 hover:text-red-400 p-1"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 bg-slate-950/50 space-y-2.5 text-xs animate-fadeIn">
                    {m.question && (
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="font-bold text-indigo-300">Question:</span> {m.question}
                      </div>
                    )}

                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-red-400 block">❌ Mistake:</span>
                      <p className="text-slate-300">{m.description}</p>
                    </div>

                    {m.correctMethod && (
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                        <span className="font-bold text-emerald-400 block">✅ Correct Method:</span>
                        <p className="text-slate-300">{m.correctMethod}</p>
                      </div>
                    )}

                    {m.learned && (
                      <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-300 font-medium">
                        <strong>What I Learned:</strong> {m.learned}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
