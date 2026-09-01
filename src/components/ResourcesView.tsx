import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Download,
  Star,
  Bookmark,
  FileText,
  Filter,
  CheckCircle2,
  UploadCloud,
  X,
  Sparkles,
  Share2,
  Layers,
  ArrowDownToLine,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudyResource, ResourceType, StudentProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/mockCampusData';

interface ResourcesViewProps {
  resources?: StudyResource[];
  profile?: StudentProfile;
  onToggleBookmark?: (category: 'announcements' | 'events' | 'resources' | 'clubs', id: string) => void;
  onUploadResource?: (newRes: StudyResource) => void;
  selectedResource?: StudyResource | null;
  onOpenResource?: (resource: StudyResource | null) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources = [],
  profile = INITIAL_STUDENT_PROFILE,
  onToggleBookmark = (_category: 'announcements' | 'events' | 'resources' | 'clubs', _id: string) => {},
  onUploadResource = (_newRes: StudyResource) => {},
  selectedResource = null,
  onOpenResource = (_resource: StudyResource | null) => {},
}) => {
  const currentProfile = profile || INITIAL_STUDENT_PROFILE;
  const resourcesList = resources || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>(6);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState('Distributed Systems');
  const [uploadSubjectCode, setUploadSubjectCode] = useState('CS601');
  const [uploadType, setUploadType] = useState<ResourceType>('Lecture Notes');
  const [uploadSemester, setUploadSemester] = useState(6);
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTags, setUploadTags] = useState('Distributed, Cloud, Notes');

  const resourceTypes = ['All', 'Lecture Notes', 'Previous Exam Papers', 'Lab Manual', 'Cheatsheet', 'Reference E-Book'];

  const filteredResources = useMemo(() => {
    return resourcesList
      .filter((res) => {
        const matchesSearch =
          res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          res.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (res.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesSemester =
          selectedSemester === 'all' || res.semester === selectedSemester;
        const matchesType =
          selectedType === 'All' || res.type === selectedType;
        return matchesSearch && matchesSemester && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [resourcesList, searchQuery, selectedSemester, selectedType, sortBy]);

  const handleDownload = (res: StudyResource) => {
    setDownloadingId(res.id);
    setTimeout(() => {
      setDownloadingId(null);
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 },
      });
      alert(`Downloaded: ${res.title} (${res.fileFormat} • ${res.fileSize})`);
    }, 800);
  };

  const handleFormUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: StudyResource = {
      id: `res-${Date.now()}`,
      title: uploadTitle,
      subject: uploadSubject,
      subjectCode: uploadSubjectCode,
      department: 'Computer Science & Engineering',
      semester: uploadSemester,
      type: uploadType,
      fileFormat: 'PDF',
      fileSize: '4.8 MB',
      pageCount: 45,
      downloadsCount: 1,
      rating: 5.0,
      reviewsCount: 1,
      authorStudent: `${profile.name} (Contributor)`,
      authorVerified: true,
      uploadDate: 'Just Now',
      description: uploadDescription,
      tags: uploadTags.split(',').map((t) => t.trim()),
      previewKeyTopics: [
        'Unit 1 Key Foundations and Derivations',
        'Solved Questions and Diagrams',
        'Important Mid-Term Formulas',
      ],
    };

    onUploadResource(newRes);
    setShowUploadModal(false);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setUploadTitle('');
    setUploadDescription('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Study Hub & Notes Repository
              </h1>
              <p className="text-xs text-slate-400">
                Peer-verified lecture notes, solved 5-year PYQs, formula cheatsheets & lab manuals
              </p>
            </div>
          </div>
        </div>

        {/* Upload Notes CTA & Search */}
        <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects, codes, topics..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            id="upload-notes-modal-trigger"
            className="px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Notes</span>
          </button>
        </div>
      </div>

      {/* Semester Filter Tabs Bar */}
      <div className="flex items-center justify-between gap-4 p-3 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Semester:</span>
          </span>
          {[
            { label: 'All Semesters', value: 'all' as const },
            { label: 'Sem 1', value: 1 },
            { label: 'Sem 2', value: 2 },
            { label: 'Sem 3', value: 3 },
            { label: 'Sem 4', value: 4 },
            { label: 'Sem 5', value: 5 },
            { label: 'Sem 6 (Current)', value: 6 },
            { label: 'Sem 7', value: 7 },
            { label: 'Sem 8', value: 8 },
          ].map((sem) => (
            <button
              key={sem.label}
              onClick={() => setSelectedSemester(sem.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedSemester === sem.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {sem.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 border-l border-slate-800 pl-3">
          <span className="text-xs text-slate-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
          >
            <option value="popular">Most Downloaded</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Resource Type Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {resourceTypes.map((t) => {
          const isActive = selectedType === t;
          return (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => {
          const isBookmarked = (currentProfile.bookmarkedItemIds?.resources || []).includes(res.id);
          const isDownloading = downloadingId === res.id;

          return (
            <div
              key={res.id}
              onClick={() => onOpenResource(res)}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 cursor-pointer transition-all hover:shadow-xl hover:shadow-indigo-950/30 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Top Badge & Bookmark */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-indigo-300 border border-slate-700 rounded font-mono">
                      {res.subjectCode}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded">
                      {res.type}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark('resources', res.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {res.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {res.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-950 text-slate-400 rounded-md border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                    <span>{res.rating}</span>
                    <span className="text-slate-500">({res.reviewsCount})</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {res.downloadsCount.toLocaleString()} downloads • {res.fileSize}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenResource(res);
                    }}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Inspect</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(res);
                    }}
                    disabled={isDownloading}
                    className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <ArrowDownToLine className="w-3.5 h-3.5" />
                        <span>{res.fileFormat}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detailed Resource Inspection Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150 relative">
            
            <button
              onClick={() => onOpenResource(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded">
                  {selectedResource.type}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-slate-800 text-slate-300 rounded font-mono">
                  {selectedResource.subjectCode}
                </span>
                <span className="text-xs text-slate-400">
                  Semester {selectedResource.semester}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {selectedResource.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Uploaded by {selectedResource.authorStudent} on {selectedResource.uploadDate}
              </p>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl text-xs text-center">
              <div>
                <span className="text-slate-500 text-[10px] block">Format & Size</span>
                <span className="font-bold text-slate-200">{selectedResource.fileFormat} • {selectedResource.fileSize}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Peer Rating</span>
                <span className="font-bold text-emerald-400">★ {selectedResource.rating} / 5.0</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Total Downloads</span>
                <span className="font-bold text-slate-200">{selectedResource.downloadsCount.toLocaleString()}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Coursework Summary</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                {selectedResource.description}
              </p>
            </div>

            {/* Included Topics Checklist */}
            {selectedResource.previewKeyTopics && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Syllabus Chapters Covered</h4>
                <div className="space-y-1.5">
                  {selectedResource.previewKeyTopics.map((topic, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => onToggleBookmark('resources', selectedResource.id)}
                className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 border border-slate-700 rounded-xl"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    (currentProfile.bookmarkedItemIds?.resources || []).includes(selectedResource.id)
                      ? 'fill-amber-400 text-amber-400'
                      : ''
                  }`}
                />
              </button>

              <button
                onClick={() => handleDownload(selectedResource)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Download Full {selectedResource.fileFormat} Pack</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload Notes Peer Contribution Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 animate-in zoom-in-95 duration-150 relative shadow-2xl">
            
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex p-2 rounded-xl bg-indigo-500/20 text-indigo-400 mb-1">
                <UploadCloud className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Share Study Material</h3>
              <p className="text-xs text-slate-400">
                Contribute verified notes, formulas, or PYQ solutions to the batch repository.
              </p>
            </div>

            <form onSubmit={handleFormUpload} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Distributed Systems Units 1-5 Handwritten Formulas"
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject Code</label>
                  <input
                    type="text"
                    required
                    value={uploadSubjectCode}
                    onChange={(e) => setUploadSubjectCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as ResourceType)}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Previous Exam Papers">Previous Exam Papers</option>
                    <option value="Lab Manual">Lab Manual</option>
                    <option value="Cheatsheet">Cheatsheet</option>
                    <option value="Reference E-Book">Reference E-Book</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Semester</label>
                  <select
                    value={uploadSemester}
                    onChange={(e) => setUploadSemester(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description & Key Topics
                </label>
                <textarea
                  rows={3}
                  required
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  placeholder="Summary of formulas, solved exercises, exam tips covered..."
                  className="w-full p-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Drag Drop Mock Box */}
              <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl p-4 text-center cursor-pointer bg-slate-950/40">
                <FileText className="w-6 h-6 text-slate-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-300">Drag and drop your PDF / ZIP document here</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Supports PDF, ZIP, DOCX up to 50MB</p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Publish to Campus Study Hub</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
