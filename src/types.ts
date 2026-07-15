/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'admin' | 'leader' | 'musician' | 'observer';

export interface PermissionSettings {
  invite_members: UserRole[];
  remove_members: UserRole[];
  create_events: UserRole[];
  add_songs: UserRole[];
  manage_announcements: UserRole[];
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  tags: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  originalKey: string;
  chords: { [key: string]: string }; // Chords template indexed by transposing key (e.g., 'G', 'A', 'C')
  videoUrl: string;
  globalComments: Comment[];
}

export interface EventSongRef {
  songId: string;
  key: string;
  comments: Comment[]; // Comments specific to this song inside this event
}

export interface RosterItem {
  userId: string;
  role: string; // instrument or ministry role (e.g., 'Violão', 'Teclado', 'Vocal', 'Bateria')
}

export interface Event {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string;
  songs: EventSongRef[];
  roster: RosterItem[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  date: string;
  comments: Comment[];
}
