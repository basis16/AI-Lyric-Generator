export enum Genre {
  Pop = "Pop",
  Rock = "Rock",
  HipHop = "Hip Hop",
  Electronic = "Electronic",
  Jazz = "Jazz",
  Country = "Country",
  RnB = "R&B",
  Metal = "Metal",
  Classical = "Classical",
  Blues = "Blues",
  Folk = "Folk",
  Reggae = "Reggae",
  Punk = "Punk",
  Funk = "Funk",
  Soul = "Soul",
  Disco = "Disco",
  Techno = "Techno",
  House = "House",
  Ambient = "Ambient",
  Indie = "Indie",
  Alternative = "Alternative",
  Gospel = "Gospel",
  Latin = "Latin",
  KPop = "K-Pop",
  JPop = "J-Pop",
  Dangdut = "Dangdut",
  Ballad = "Ballad",
  Ska = "Ska",
  Dubstep = "Dubstep",
  Trance = "Trance",
  SynthPop = "Synth-pop",
  LoFi = "Lo-fi",
  WorldMusic = "World Music",
  Bluegrass = "Bluegrass",
}

export enum Emotion {
  Happy = "Happy",
  Sad = "Sad",
  Angry = "Angry",
  Hopeful = "Hopeful",
  Romantic = "Romantic",
  Melancholic = "Melancholic",
}

export enum SongStructure {
  VerseChorus = "Verse-Chorus-Verse-Chorus",
  VerseChorusBridge = "Verse-Chorus-Verse-Chorus-Bridge-Chorus",
  VersePreChorusChorus = "Verse-Pre-Chorus-Chorus",
  VerseChorusBridgeOutro = "Verse-Chorus-Bridge-Chorus-Outro",
  AABA = "AABA",
}

export enum SoundEngine {
  SunoAI = "Suno AI",
  Riffusion = "Riffusion",
}

export enum ImageStyle {
  Photorealistic = "Photorealistic",
  Anime = "Anime",
  Abstract = "Abstract",
  Vintage = "Vintage Photo",
  Cyberpunk = "Cyberpunk",
  FantasyArt = "Fantasy Art",
}

export enum Language {
  Indonesian = "Indonesian",
  English = "English",
  Spanish = "Spanish",
  French = "French",
  Japanese = "Japanese",
}

export interface SongGenerationParams {
  topic: string;
  genre: Genre;
  emotion: Emotion;
  structure: SongStructure;
  soundEngine: SoundEngine;
  imageStyle: ImageStyle;
  language: Language;
}

export interface SongOutput {
  title: string;
  lyrics: string;
  soundPrompt: string;
  imagePrompt: string;
}