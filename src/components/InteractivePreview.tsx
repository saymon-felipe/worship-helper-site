/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Music, MessageSquare, Users, Settings, Plus, Trash2, 
  Check, Lock, Unlock, Send, Shield, Activity, Sparkles, Clock, 
  BookOpen, UserPlus, ExternalLink, Minimize2, Maximize2, AlertTriangle, ChevronRight, Building,
  Megaphone, Bell, Home, SlidersHorizontal, Wifi, Signal, Battery, ArrowLeft,
  Tag, Contact, Search, Pencil, X
} from 'lucide-react';
import { 
  INITIAL_USERS, INITIAL_SONGS, INITIAL_EVENTS, 
  INITIAL_ANNOUNCEMENTS, INITIAL_PERMISSIONS 
} from '../data';
import { User, Song, Event, Announcement, PermissionSettings, UserRole, Comment } from '../types';

import iconLogo from '../../assets/worship-helper-icon.png';

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLATS: { [key: string]: string } = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
const CHORD_PATTERN = /^([A-G](?:#|b)?)((?:m|maj|min|dim|aug|sus|add|º|°|[#b0-9()+-])*)(?:\/([A-G](?:#|b)?))?$/;
const AVAILABLE_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function normalizeNote(note: string) {
    return FLATS[note] || note;
}

function transposeNote(note: string, steps: number) {
    const normalized = normalizeNote(note);
    const index = NOTES.indexOf(normalized);
    if (index === -1) return note;
    return NOTES[(index + steps + 12 * 10) % 12];
}

function isChordToken(token: string) {
    return CHORD_PATTERN.test(token.replace(/[()[\],]/g, ""));
}

function isChordLine(line: string) {
    const tokens = line.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return false;
    const chordTokens = tokens.filter(isChordToken).length;
    return chordTokens > 0 && chordTokens / tokens.length >= 0.65;
}

function transposeChord(token: string, steps: number) {
    const wrapperStart = token.match(/^[()[\],]*/)?.[0] || "";
    const wrapperEnd = token.match(/[()[\],]*$/)?.[0] || "";
    const cleanToken = token.replace(/^[()[\],]*/, "").replace(/[()[\],]*$/, "");
    const match = cleanToken.match(CHORD_PATTERN);

    if (!match) return token;

    const root = transposeNote(match[1], steps);
    const suffix = match[2] || "";
    const bass = match[3] ? "/" + transposeNote(match[3], steps) : "";

    return `${wrapperStart}${root}${suffix}${bass}${wrapperEnd}`;
}

function transposeLine(line: string, steps: number) {
    if (steps === 0) return line;
    return line.replace(/\S+/g, (token) => transposeChord(token, steps));
}

function getToneRoot(tone: string) {
    const match = String(tone || "").trim().match(/^([A-G](?:#|b)?)/);
    return match ? normalizeNote(match[1]) : "";
}

function transposeCipherText(cipherText: string, fromTone: string, toTone: string): string {
    const originalRoot = getToneRoot(fromTone);
    const targetRoot = getToneRoot(toTone);
    if (!originalRoot || !targetRoot) return cipherText;

    const originalIndex = NOTES.indexOf(originalRoot);
    const targetIndex = NOTES.indexOf(targetRoot);
    if (originalIndex === -1 || targetIndex === -1) return cipherText;

    let steps = targetIndex - originalIndex;
    if (steps > 6) steps -= 12;
    else if (steps < -6) steps += 12;

    if (steps === 0) return cipherText;

    return cipherText.split("\n").map(line => {
        return isChordLine(line) ? transposeLine(line, steps) : line;
    }).join("\n");
}

export default function InteractivePreview() {
  // State management
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [permissions, setPermissions] = useState<PermissionSettings>(INITIAL_PERMISSIONS);

  // Simulation State
  const [activeUser, setActiveUser] = useState<User>(INITIAL_USERS[1]); // Default to Ana Cláudia (Leader)
  const [activeTab, setActiveTab] = useState<'inicio' | 'biblioteca' | 'painel'>('inicio');
  const [painelSubTab, setPainelSubTab] = useState<'membros' | 'permissões'>('membros');
  const [deviceMode, setDeviceMode] = useState<'phone' | 'tablet'>('phone');
  const [subView, setSubView] = useState<'chords' | 'members' | 'matrix' | 'events' | null>(null);
  const [configActiveTab, setConfigActiveTab] = useState<'tags' | 'roles'>('roles');
  
  // Selection States
  const [selectedEventId, setSelectedEventId] = useState<string>(INITIAL_EVENTS[0].id);
  const [selectedSongId, setSelectedSongId] = useState<string>(INITIAL_SONGS[0].id);
  const [songModalOpen, setSongModalOpen] = useState(false);
  const [fullscreenChord, setFullscreenChord] = useState(false);
  const [activeSongKey, setActiveSongKey] = useState<string>('G');

  // Input States
  const [newCommentText, setNewCommentText] = useState('');
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<UserRole>('musician');
  const [newMemberTags, setNewMemberTags] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);

  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventType, setNewEventType] = useState('Culto Regular');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Permission Check Helpers
  const hasPermission = (action: keyof PermissionSettings): boolean => {
    return permissions[action].includes(activeUser.role);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'leader': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
      case 'musician': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'observer': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  const translateRole = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Pastor (Admin)';
      case 'leader': return 'Líder';
      case 'musician': return 'Músico';
      case 'observer': return 'Mídia / Técnico';
    }
  };

  // Actions
  const handleAddComment = (context: 'global' | 'event-specific', targetSongId: string, eventId?: string) => {
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: 'cmt-' + Date.now(),
      authorName: activeUser.name,
      authorAvatar: activeUser.avatar,
      content: newCommentText,
      timestamp: 'Agora mesmo'
    };

    if (context === 'global') {
      setSongs(prevSongs => prevSongs.map(song => {
        if (song.id === targetSongId) {
          return { ...song, globalComments: [newComment, ...song.globalComments] };
        }
        return song;
      }));
    } else if (context === 'event-specific' && eventId) {
      setEvents(prevEvents => prevEvents.map(evt => {
        if (evt.id === eventId) {
          return {
            ...evt,
            songs: evt.songs.map(es => {
              if (es.songId === targetSongId) {
                return { ...es, comments: [newComment, ...es.comments] };
              }
              return es;
            })
          };
        }
        return evt;
      }));
    }

    setNewCommentText('');
  };

  const handleAddAnnouncement = () => {
    if (!hasPermission('manage_announcements')) return;
    if (!newAnnouncementTitle.trim() || !newAnnouncementContent.trim()) return;

    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      title: newAnnouncementTitle,
      content: newAnnouncementContent,
      authorName: activeUser.name,
      authorRole: translateRole(activeUser.role),
      date: 'Hoje',
      comments: []
    };

    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setShowAddAnnouncement(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (!hasPermission('manage_announcements')) return;
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  const handleAddMember = () => {
    if (!hasPermission('invite_members')) return;
    if (!newMemberName.trim()) return;

    const newUsr: User = {
      id: 'usr-' + Date.now(),
      name: newMemberName,
      role: newMemberRole,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`, // placeholder
      tags: newMemberTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setUsers([...users, newUsr]);
    setNewMemberName('');
    setNewMemberTags('');
    setShowAddMember(false);
  };

  const handleRemoveMember = (id: string) => {
    if (!hasPermission('remove_members')) return;
    if (id === activeUser.id) {
      alert('Você não pode se remover do ministério!');
      return;
    }
    setUsers(users.filter(u => u.id !== id));
  };

  const handleAddEvent = () => {
    if (!hasPermission('create_events')) return;
    if (!newEventName.trim() || !newEventDate.trim()) return;

    const newEvt: Event = {
      id: 'evt-' + Date.now(),
      name: newEventName,
      date: newEventDate,
      type: newEventType,
      description: newEventDesc,
      songs: [
        { songId: 's1', key: 'F', comments: [] },
        { songId: 's2', key: 'G', comments: [] }
      ],
      roster: [
        { userId: 'u2', role: 'Ministro de Louvor (Vocal)' },
        { userId: 'u3', role: 'Guitarra Solo' }
      ]
    };

    setEvents([...events, newEvt]);
    setSelectedEventId(newEvt.id);
    setNewEventName('');
    setNewEventDate('');
    setNewEventDesc('');
    setShowAddEvent(false);
  };

  const togglePermission = (action: keyof PermissionSettings, role: UserRole) => {
    setPermissions(prev => {
      const current = prev[action];
      const updated = current.includes(role)
        ? current.filter(r => r !== role)
        : [...current, role];
      return { ...prev, [action]: updated };
    });
  };

  const currentEvent = events.find(e => e.id === selectedEventId) || events[0];
  const currentSong = songs.find(s => s.id === selectedSongId) || songs[0];

  return (
    <div id="demo-section" className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md overflow-hidden shadow-2xl relative">
      
      {/* Simulation title spacer */}
      <div className="bg-slate-900 border-b border-slate-800 p-4">
        <span className="text-xs text-cyan-400 font-mono tracking-widest uppercase block">Simulador Interativo</span>
        <p className="text-sm font-semibold text-white">Navegue pelas três telas principais do aplicativo Worship Helper:</p>
      </div>

      {/* Device size toggle switch */}
      <div className="flex flex-col items-center justify-center py-4 bg-slate-950 border-b border-slate-900 gap-2">
        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Simular Dispositivo do Altar</span>
        <div className="bg-slate-900/80 p-1 rounded-full border border-slate-800 flex items-center relative">
          <button
            onClick={() => setDeviceMode('phone')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative z-10 ${
              deviceMode === 'phone' ? 'text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Celular (Móvel)
            {deviceMode === 'phone' && (
              <motion.div
                layoutId="device-active-bg"
                className="absolute inset-0 bg-cyan-500 rounded-full -z-10 shadow-lg shadow-cyan-500/20"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative z-10 ${
              deviceMode === 'tablet' ? 'text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tablet (Púlpito)
            {deviceMode === 'tablet' && (
              <motion.div
                layoutId="device-active-bg"
                className="absolute inset-0 bg-cyan-500 rounded-full -z-10 shadow-lg shadow-cyan-500/20"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Interactive Device Chassis Area */}
      <div className="p-8 bg-slate-950 flex justify-center items-center">
        
        {/* Device Bezel container */}
        <div 
          className={`border-slate-900 shadow-2xl relative flex flex-col bg-[#0b0c16] transition-all duration-500 overflow-hidden ${
            deviceMode === 'phone' 
              ? 'w-[375px] h-[780px] rounded-[48px] border-[12px]' 
              : 'w-[700px] h-[860px] rounded-[36px] border-[16px]'
          }`}
        >
          {/* Status Bar */}
          <div className="h-9 px-6 flex items-center justify-between text-white/80 text-[11px] font-medium select-none bg-[#090a12] border-b border-slate-900/20 shrink-0 relative">
            
            {/* Clock */}
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

            {/* Notch centered (Phone only) */}
            {deviceMode === 'phone' && (
              <div className="w-28 h-4 bg-slate-900 rounded-full absolute left-1/2 -translate-x-1/2 top-1.5 border border-slate-800/30" />
            )}

            {/* Signal & Battery icons */}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 text-white/70" />
              <Wifi className="w-3.5 h-3.5 text-white/70" />
              <Battery className="w-4 h-4 text-white/70" />
            </div>
          </div>

          {/* App Header (Top navbar inside the simulated app) */}
          <div className="h-14 px-4 bg-[#090a12] border-b border-slate-900 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <img src={iconLogo} alt="Worship Helper Icon" className="w-7 h-7 object-contain" />
            </div>

            <div className="flex items-center gap-1.5 cursor-pointer">
              <img 
                src={activeUser.avatar} 
                alt={activeUser.name} 
                className="w-7 h-7 rounded-full border border-slate-800 object-cover"
                referrerPolicy="no-referrer"
              />
              <ChevronRight className="w-3 h-3 text-slate-450 rotate-90" />
            </div>
          </div>

          {/* Device Main Viewport Body */}
          <div className="flex-1 overflow-y-auto bg-[#07080e] p-4 text-slate-200 scrollbar-none flex flex-col pb-20">
            
            <AnimatePresence mode="wait">
              
              {/* SUBVIEW 1: CHORDS VIEW */}
              {subView === 'chords' && (
                <motion.div
                  key="chords-sub"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 flex-1 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 sticky top-0 bg-[#07080e] z-20 -mx-4 px-4 pt-1">
                    <button 
                      onClick={() => setSubView(null)}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Modo Cifra</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-display">{currentSong.title}</h3>
                    <p className="text-xs text-slate-400">{currentSong.artist}</p>
                  </div>

                  {/* Transposer Button bar */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-900">
                    <span className="text-[10px] text-slate-400 font-mono uppercase shrink-0">Tom:</span>
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-900 gap-1 shrink-0">
                      {AVAILABLE_KEYS.map(key => (
                        <button
                          key={key}
                          onClick={() => setActiveSongKey(key)}
                          className={`px-2 py-1 rounded text-xs font-bold transition-all duration-200 cursor-pointer ${
                            activeSongKey === key 
                              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lyrics chords area */}
                  <div className="relative">
                    <pre className="font-mono text-xs text-slate-300 bg-slate-950 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-900 max-h-96 whitespace-pre">
                      {transposeCipherText(currentSong.chords[currentSong.originalKey], currentSong.originalKey, activeSongKey)}
                    </pre>
                  </div>

                  {/* Song comments section inside Mobile view */}
                  <div className="space-y-3 pt-3 border-t border-slate-900">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      Comentários
                    </h4>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Adicione observações..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment('global', currentSong.id);
                        }}
                        className="flex-1 bg-slate-950 text-xs px-3 py-2 rounded border border-slate-900 text-white focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        onClick={() => handleAddComment('global', currentSong.id)}
                        className="bg-cyan-500 text-slate-950 px-3 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2 mt-2 max-h-36 overflow-y-auto pr-1">
                      {currentSong.globalComments.map(cmt => (
                        <div key={cmt.id} className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-900 text-[11px] flex gap-2">
                          <img src={cmt.authorAvatar} alt={cmt.authorName} className="w-5 h-5 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-white mr-1.5">{cmt.authorName}</span>
                            <span className="text-[9px] text-slate-500">{cmt.timestamp}</span>
                            <p className="text-slate-350 mt-1">{cmt.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SUBVIEW 2: MEMBERS LIST */}
              {subView === 'members' && (
                <motion.div
                  key="members-sub"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 flex-1 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 sticky top-0 bg-[#07080e] z-20 -mx-4 px-4 pt-1">
                    <button 
                      onClick={() => setSubView(null)}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Equipe</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Integrantes do Ministério</h3>
                    {hasPermission('invite_members') && (
                      <button
                        onClick={() => setShowAddMember(true)}
                        className="p-1 rounded-full bg-cyan-500 text-slate-950 hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Add Member Form inline */}
                  {showAddMember && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-3"
                    >
                      <input
                        type="text"
                        placeholder="Nome"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded border border-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                      <select
                        value={newMemberRole}
                        onChange={(e) => setNewMemberRole(e.target.value as any)}
                        className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded border border-slate-900 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="musician">Músico</option>
                        <option value="leader">Líder</option>
                        <option value="observer">Técnico / Mídia</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Tags, ex: Violão, Teclado (virgulas)"
                        value={newMemberTags}
                        onChange={(e) => setNewMemberTags(e.target.value)}
                        className="w-full bg-slate-950 text-white text-xs px-3 py-2 rounded border border-slate-900 focus:outline-none focus:border-cyan-500"
                      />
                      <div className="flex justify-end gap-2 text-[10px]">
                        <button onClick={() => setShowAddMember(false)} className="px-2 py-1 text-slate-400 hover:text-white cursor-pointer">Cancelar</button>
                        <button onClick={handleAddMember} className="px-3 py-1 bg-cyan-500 text-slate-950 font-bold rounded cursor-pointer">Adicionar</button>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                    {users.map(u => (
                      <div 
                        key={u.id}
                        className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl flex items-center justify-between group hover:border-slate-800 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-slate-800" />
                          <div>
                            <p className="text-xs font-bold text-white">{u.name}</p>
                            <span className={`text-[8px] uppercase font-mono px-1 rounded inline-block mt-0.5 ${getRoleBadgeColor(u.role)}`}>
                              {translateRole(u.role)}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {u.tags.map((t, idx) => (
                                <span key={idx} className="text-[8px] bg-slate-900 text-slate-400 px-1 py-0.5 rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {hasPermission('remove_members') && (
                          <button
                            onClick={() => handleRemoveMember(u.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SUBVIEW 3: CONFIGURAÇÕES DA IGREJA (Redesigned matching screenshot) */}
              {subView === 'matrix' && (
                <motion.div
                  key="matrix-sub"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 flex-1 flex flex-col justify-between"
                >
                  {/* Sticky Header with Voltar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900 sticky top-0 bg-[#07080e] z-20 -mx-4 px-4 pt-1">
                    <button 
                      onClick={() => setSubView(null)}
                      className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white cursor-pointer focus:outline-none"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>
                    <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Configurações</span>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white font-display">Configurações da Igreja</h3>
                    <p className="text-xs text-slate-400">Personalize tags de usuários, funções e permissões da equipe.</p>
                  </div>

                  {/* Tags vs Funções Switcher (matching screenshot) */}
                  <div className="bg-slate-900/60 p-1 rounded-full border border-slate-900 flex items-center relative select-none">
                    <button
                      onClick={() => setConfigActiveTab('tags')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer focus:outline-none relative z-10 ${
                        configActiveTab === 'tags' ? 'text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      Tags de usuários
                      {configActiveTab === 'tags' && (
                        <motion.div
                          layoutId="config-tab-active-bg"
                          className="absolute inset-0 bg-cyan-550 rounded-full -z-10 shadow-[0_0_12px_rgba(6,182,212,0.3)] bg-cyan-500"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setConfigActiveTab('roles')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer focus:outline-none relative z-10 ${
                        configActiveTab === 'roles' ? 'text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Contact className="w-3.5 h-3.5" />
                      Funções
                      {configActiveTab === 'roles' && (
                        <motion.div
                          layoutId="config-tab-active-bg"
                          className="absolute inset-0 bg-cyan-550 rounded-full -z-10 shadow-[0_0_12px_rgba(6,182,212,0.3)] bg-cyan-500"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </div>

                  {/* Main configuration container card */}
                  <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-5 space-y-4 shadow-xl">
                    
                    {configActiveTab === 'roles' ? (
                      <>
                        {/* Header: Funções */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                              <Contact className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">Funções dos integrantes</h4>
                              <p className="text-[9px] text-slate-400">Cargos, responsabilidades e permissões de acesso</p>
                            </div>
                          </div>
                          <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center text-[10px] text-cyan-400 font-mono font-bold">
                            1
                          </span>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-slate-950 rounded-xl border border-slate-900 px-3 py-2.5 flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-slate-500" />
                          <input 
                            type="text" 
                            placeholder="Filtrar funções..." 
                            className="bg-transparent text-[11px] text-white focus:outline-none w-full"
                          />
                        </div>

                        {/* Roles List */}
                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                          
                          {/* Card: Baterista (matching screenshot) */}
                          <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-white">Baterista</h5>
                              <div className="flex items-center gap-2">
                                <button className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-[9px] text-slate-450">6 permissões</p>
                            
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {[
                                'Gerenciar eventos', 'Criar eventos', 'Editar eventos',
                                'Gerenciar avisos', 'Publicar avisos', 'Remover avisos'
                              ].map(perm => (
                                <span key={perm} className="text-[8px] text-emerald-450 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded-full">
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Add function button */}
                        <button className="w-full py-3 bg-[#20214a] hover:bg-[#28295a] text-white text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/5 mt-4">
                          <Plus className="w-4 h-4" />
                          <span>Adicionar função</span>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Header: Tags */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">
                              <Tag className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">Tags dos integrantes</h4>
                              <p className="text-[9px] text-slate-400">Identifique instrumentos, vocais e funções práticas</p>
                            </div>
                          </div>
                          <span className="w-5 h-5 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center text-[10px] text-cyan-400 font-mono font-bold">
                            8
                          </span>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-slate-950 rounded-xl border border-slate-900 px-3 py-2.5 flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-slate-500" />
                          <input 
                            type="text" 
                            placeholder="Filtrar tags..." 
                            className="bg-transparent text-[11px] text-white focus:outline-none w-full"
                          />
                        </div>

                        {/* Tags list (Pills wrap) */}
                        <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl space-y-3">
                          <span className="text-[9px] text-slate-450 block font-mono">Tags ativas:</span>
                          <div className="flex flex-wrap gap-2">
                            {[
                              'Violão', 'Teclado', 'Baixo', 'Bateria', 'Guitarra',
                              'Vocal Principal', 'Backing Vocal', 'Ministro'
                            ].map(tg => (
                              <span key={tg} className="text-[10px] text-cyan-400 bg-cyan-950/10 border border-cyan-900/30 px-3 py-1 rounded-full font-medium">
                                {tg}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Add tag button */}
                        <button className="w-full py-3 bg-[#20214a] hover:bg-[#28295a] text-white text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/5 mt-4">
                          <Plus className="w-4 h-4" />
                          <span>Adicionar tag</span>
                        </button>
                      </>
                    )}

                  </div>

                </motion.div>
              )}

              {/* MAIN VIEWS - SUBVIEW IS NULL */}
              {!subView && activeTab === 'inicio' && (
                <motion.div
                  key="inicio-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Announcements Card (Avisos Banner matching screen 1) */}
                  <div 
                    onClick={() => setActiveTab('painel')}
                    className="bg-indigo-950/20 border border-indigo-900/40 rounded-2xl p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-indigo-900/30 transition-all duration-350"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                        <Megaphone className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono tracking-wider font-bold">AVISOS</span>
                        <h4 className="text-xs font-bold text-white mt-0.5">Nenhum aviso recente</h4>
                        <p className="text-[9px] text-slate-400 mt-0.5">Clique para publicar ou visualizar os avisos da igreja</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Section Title (Próximos Eventos) */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 shrink-0">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">Próximos Eventos</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Acompanhe as escalas e programações agendadas</p>
                    </div>
                  </div>

                  {/* List of Mock Event Cards */}
                  <div className="space-y-3.5">
                    {/* Event 1: Second Day */}
                    <div className="p-4 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-3 relative group focus:outline-none">
                      <div className="absolute right-4 top-4 flex gap-1.5 items-center">
                        <Bell className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      </div>
                      <div className="flex">
                        <span className="text-[8px] font-bold text-rose-450 bg-rose-500/5 border border-rose-500/10 px-2 py-0.5 rounded-full">
                          PRÓXIMO - HOJE
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white">Second Day</h5>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        Wednesday, 15/07/2026 às 19:31
                      </p>
                      <div className="border-t border-slate-950/40 pt-2.5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] bg-slate-950 text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-900">
                            CULTO
                          </span>
                          <span className="text-[9px] text-cyan-400 font-mono flex items-center gap-1">
                            <Music className="w-3 h-3" />
                            1 Louvor
                          </span>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
                          alt="avatar" 
                          className="w-5.5 h-5.5 rounded-full object-cover border border-slate-800" 
                        />
                      </div>
                    </div>

                    {/* Event 2: Start Day */}
                    <div className="p-4 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-3 relative group focus:outline-none">
                      <div className="absolute right-4 top-4 flex gap-1.5 items-center">
                        <Bell className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      </div>
                      <div className="flex">
                        <span className="text-[8px] font-bold text-rose-450 bg-rose-500/5 border border-rose-500/10 px-2 py-0.5 rounded-full">
                          PRÓXIMO - HOJE
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white">Start Day</h5>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        Tuesday, 14/07/2026 às 14:37
                      </p>
                      <div className="border-t border-slate-950/40 pt-2.5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] bg-slate-950 text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-900">
                            CULTO
                          </span>
                          <span className="text-[9px] text-cyan-400 font-mono flex items-center gap-1">
                            <Music className="w-3 h-3" />
                            1 Louvor
                          </span>
                        </div>
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
                          alt="avatar" 
                          className="w-5.5 h-5.5 rounded-full object-cover border border-slate-800" 
                        />
                      </div>
                    </div>

                    {/* Event 3: Encontrão2 */}
                    <div className="p-4 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-3 relative group">
                      <div className="absolute right-4 top-4 flex gap-1.5 items-center">
                        <Bell className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                      </div>
                      <div className="flex">
                        <span className="text-[8px] font-bold text-amber-500 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-full">
                          PRÓXIMO - FALTAM 2 DIAS
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-white">Encontrão2</h5>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        Friday, 17/07/2026 às 20:00
                      </p>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* MAIN VIEWS: MÚSICAS (acervo view matching screen 2) */}
              {!subView && activeTab === 'biblioteca' && (
                <motion.div
                  key="biblioteca-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Church profile banner */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex items-center gap-3.5 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full border-[2.5px] border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] overflow-hidden flex items-center justify-center bg-slate-900 shrink-0">
                      <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&auto=format&fit=crop&q=80" alt="Igreja" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-wide">Igreja Batista Central</h4>
                      <p className="text-[9px] text-cyan-400 font-semibold mt-0.5 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {users.length} membros
                      </p>
                    </div>
                  </div>

                  {/* Header Title with plus button */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white font-display">Acervo de músicas</h3>
                    {hasPermission('add_songs') && (
                      <button
                        onClick={() => {
                          // Simulates adding a mock song
                          const newSong: Song = {
                            id: 's-' + Date.now(),
                            title: 'Teu Santo Nome',
                            artist: 'Gabriela Rocha',
                            originalKey: 'G',
                            chords: {
                              G: 'Intro: G C\n\nG           C\nTeu Santo Nome, oh Deus\nG           C\nQuero adorar...'
                            },
                            videoUrl: 'https://youtube.com',
                            globalComments: []
                          };
                          setSongs([newSong, ...songs]);
                        }}
                        className="w-8 h-8 rounded-full bg-indigo-650 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-650/20 cursor-pointer"
                        title="Cadastrar música"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Search and filter */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-950 rounded-xl border border-slate-900 px-3 py-2 flex items-center gap-2">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Buscar por nome ou artista..." 
                        className="bg-transparent text-xs text-white focus:outline-none w-full"
                      />
                    </div>
                    <button className="p-2 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 hover:text-white cursor-pointer">
                      <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
                    </button>
                  </div>

                  {/* Song List view */}
                  <div className="space-y-2.5">
                    {songs.map((song, idx) => {
                      // Mock thumbnails
                      const mockThumb = idx % 2 === 0 
                        ? 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=120&auto=format&fit=crop&q=80'
                        : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&auto=format&fit=crop&q=80';
                      
                      const tags = idx % 2 === 0 ? ['rock'] : ['pop', 'congregacional'];
                      
                      return (
                        <div 
                          key={song.id}
                          onClick={() => {
                            setSelectedSongId(song.id);
                            setActiveSongKey(song.originalKey);
                            setSubView('chords');
                          }}
                          className="p-3 bg-slate-900/50 border border-slate-900 rounded-2xl flex items-center gap-3.5 cursor-pointer hover:border-slate-800 transition-all duration-200"
                        >
                          <img src={mockThumb} alt={song.title} className="w-11 h-11 rounded-lg object-cover border border-slate-800 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{song.title}</h5>
                            <p className="text-[9px] text-slate-400 truncate mt-0.5">{song.artist}</p>
                            <div className="flex gap-1 mt-1.5">
                              {tags.map((tg, i) => (
                                <span key={i} className="text-[7.5px] bg-slate-950 text-slate-500 font-semibold px-1.5 py-0.5 rounded">
                                  {tg}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </motion.div>
              )}

              {/* MAIN VIEWS: PAINEL (menu views matching screen 3) */}
              {!subView && activeTab === 'painel' && (
                <motion.div
                  key="painel-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Church profile banner */}
                  <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex items-center gap-3.5 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full border-[2.5px] border-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] overflow-hidden flex items-center justify-center bg-slate-900 shrink-0">
                      <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&auto=format&fit=crop&q=80" alt="Igreja" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[8px] text-cyan-400 font-mono tracking-wider font-bold block">ADMINISTRAÇÃO</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">Igreja Batista Central</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {users.length} membros
                      </p>
                    </div>
                  </div>

                  {/* Vertical rounded menu cards */}
                  <div className="space-y-2.5">
                    
                    {/* Acervo */}
                    <button 
                      onClick={() => setActiveTab('biblioteca')} 
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-900 bg-slate-900/30 hover:bg-slate-900/60 hover:border-slate-800 transition-all text-left cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                          <Music className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Acervo de músicas</h4>
                          <p className="text-[9px] text-slate-450 mt-0.5">Cifras, letras, tons e repertórios do ministério.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>

                    {/* Membros */}
                    <button 
                      onClick={() => setSubView('members')} 
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-900 bg-slate-900/30 hover:bg-slate-900/60 hover:border-slate-800 transition-all text-left cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Gerenciar membros</h4>
                          <p className="text-[9px] text-slate-450 mt-0.5">Gerenciamento de integrantes, funções e permissões.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>

                    {/* Calendario */}
                    <button 
                      onClick={() => setActiveTab('inicio')} 
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-900 bg-slate-900/30 hover:bg-slate-900/60 hover:border-slate-800 transition-all text-left cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Calendário de cultos</h4>
                          <p className="text-[9px] text-slate-450 mt-0.5">Ensaios, escalas de cultos e eventos agendados.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>

                    {/* Configurações */}
                    <button 
                      onClick={() => setSubView('matrix')} 
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-900 bg-slate-900/30 hover:bg-slate-900/60 hover:border-slate-800 transition-all text-left cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                          <Settings className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Configurações da igreja</h4>
                          <p className="text-[9px] text-slate-455 mt-0.5">Ajuste de funções, permissões gerais e tags de membros.</p>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </button>

                  </div>

                  {/* Avisos e comunicados board input */}
                  <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <div className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Megaphone className="w-3.5 h-3.5" />
                      </div>
                      Avisos e Comunicados
                    </h4>

                    {hasPermission('manage_announcements') ? (
                      <div className="flex items-center bg-slate-950 rounded-xl border border-slate-900 px-3.5 py-2.5 relative">
                        <input
                          type="text"
                          placeholder="Publique um aviso..."
                          value={newAnnouncementContent}
                          onChange={(e) => {
                            setNewAnnouncementContent(e.target.value);
                            setNewAnnouncementTitle('Comunicado Rápido');
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddAnnouncement();
                          }}
                          className="bg-transparent text-xs text-white focus:outline-none w-full pr-8"
                        />
                        <button 
                          onClick={handleAddAnnouncement}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Lock className="w-3.5 h-3.5 text-slate-600" />
                        Seu cargo não pode publicar comunicados.
                      </p>
                    )}

                    {/* Announcement Feed preview */}
                    <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-1">
                      {announcements.slice(0, 1).map(ann => (
                        <div key={ann.id} className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2 text-[11px]">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-white">{ann.title}</span>
                            <span className="text-[8px] text-slate-500">{ann.date}</span>
                          </div>
                          <p className="text-slate-350 leading-relaxed bg-slate-900/30 p-2 rounded">{ann.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* Sticky Bottom Tab Navigation Bar (matching screen 1/2/3) */}
          <div className="h-16 bg-[#090a12] border-t border-slate-900 flex items-center justify-around shrink-0 absolute bottom-0 left-0 right-0 z-30 select-none">
            {[
              { id: 'inicio', label: 'Início', icon: Home },
              { id: 'biblioteca', label: 'Músicas', icon: Music },
              { id: 'painel', label: 'Painel', icon: Building },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !subView;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSubView(null);
                  }}
                  className="flex flex-col items-center justify-center w-20 h-full transition-all duration-300 relative cursor-pointer group focus:outline-none"
                >
                  <Icon className={`w-5 h-5 mb-1 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                    {tab.label}
                  </span>
                  
                  {/* Cyan blue dot below active label */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-dot"
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute bottom-1.5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* FULL SCREEN CHORD VIEWER MODAL / BOX */}
      <AnimatePresence>
        {songModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 p-6 flex flex-col justify-between"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase block">Modo Ensaiador / Culto</span>
                <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                  {currentSong.title} 
                  <span className="text-xs font-normal text-slate-400">({currentSong.artist})</span>
                </h2>
              </div>

              {/* Controles do modal */}
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 gap-1">
                  {AVAILABLE_KEYS.map(key => (
                    <button
                      key={key}
                      onClick={() => setActiveSongKey(key)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all duration-200 ${
                        activeSongKey === key 
                          ? 'bg-cyan-500 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSongModalOpen(false)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chords Large Area */}
            <div className="flex-1 overflow-y-auto my-6 flex justify-center">
              <pre className="font-mono text-base md:text-lg text-emerald-400 leading-relaxed max-w-2xl w-full p-4 whitespace-pre">
                {transposeCipherText(currentSong.chords[currentSong.originalKey], currentSong.originalKey, activeSongKey)}
              </pre>
            </div>

            {/* Modal Footer helper */}
            <div className="border-t border-slate-850 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
              <p className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Dica: Use em tablets ou monitores grandes fixados no púlpito para excelente leitura no escuro.
              </p>
              <div className="flex gap-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-900">ESC para fechar</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">Auto-rolagem disponível na versão premium</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
