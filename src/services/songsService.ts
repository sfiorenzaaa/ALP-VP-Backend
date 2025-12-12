interface SongQuiz {
  id?: number;
  clue: string;
  options: string[];
  correctAnswer: string;
}

let songs: SongQuiz[] = [
  { id: 1, clue: "I got my head out the ____", options: ["Sunroof", "Window", "Moonlight", "Night Sky"], correctAnswer: "Sunroof" },
  { id: 2, clue: "Cause baby you're a ____", options: ["Firework", "Star", "Rocket", "Sun"], correctAnswer: "Firework" },
  { id: 3, clue: "I can buy myself ____", options: ["Flowers", "Money", "Gold", "Love"], correctAnswer: "Flowers" },
  { id: 4, clue: "I'm at a payphone ____ you", options: ["Calling", "Missing", "Loving", "Finding"], correctAnswer: "Calling" },
  { id: 5, clue: "Hello from the other ____", options: ["Side", "World", "Line", "Place"], correctAnswer: "Side" },
  { id: 6, clue: "I'm gonna swing from the ____", options: ["Chandelier", "Ceiling", "Stars", "Fire"], correctAnswer: "Chandelier" },
  { id: 7, clue: "Just gonna stand there and watch me ____", options: ["Burn", "Fall", "Cry", "Break"], correctAnswer: "Burn" },
  { id: 8, clue: "We were just kids when we fell in ____", options: ["Love", "Summer", "Dreams", "Forever"], correctAnswer: "Love" },
  { id: 9, clue: "I'm in love with the shape of ____", options: ["You", "Us", "Life", "Time"], correctAnswer: "You" },
  { id: 10, clue: "So love me like you ____", options: ["Do", "Want", "Say", "Feel"], correctAnswer: "Do" },
  { id: 11, clue: "You are the dancing ____", options: ["Queen", "Star", "Girl", "Lady"], correctAnswer: "Queen" },
  { id: 12, clue: "I'm gonna take my horse to the old town ____", options: ["Road", "Country", "Town", "Field"], correctAnswer: "Road" },
  { id: 13, clue: "My mama don't like you and she likes ____", options: ["Everyone", "Nobody", "Somebody", "Anything"], correctAnswer: "Everyone" },
  { id: 14, clue: "Is it too late now to say ____", options: ["Sorry", "Goodbye", "Hello", "Stay"], correctAnswer: "Sorry" },
  { id: 15, clue: "I've got a blank space ____", options: ["Baby", "Name", "There", "Here"], correctAnswer: "Baby" },
  { id: 16, clue: "Yeah you got that yummy ____", options: ["Yum", "Taste", "Sweet", "Glow"], correctAnswer: "Yum" },
  { id: 17, clue: "And I was like baby, baby, baby ____", options: ["Oh", "Yeah", "No", "Hey"], correctAnswer: "Oh" },
  { id: 18, clue: "You're the one that I ____", options: ["Want", "Need", "Love", "Choose"], correctAnswer: "Want" },
  { id: 19, clue: "Don't stop ____", options: ["Believin'", "Trying", "Running", "Moving"], correctAnswer: "Believin'" },
  { id: 20, clue: "This girl is on ____", options: ["Fire", "Stage", "Spotlight", "Top"], correctAnswer: "Fire" }
];


export const getSongs = async () => songs;

export const createSong = async (song: SongQuiz) => {
  song.id = songs.length + 1;
  songs.push(song);
  return song; // <-- kembalikan seluruh object, bukan cuma id
};
