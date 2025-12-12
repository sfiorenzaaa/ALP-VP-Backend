import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started…");

  // Create demo user
  const hashed = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
      password: hashed,
    },
  });

  // SONG QUIZ DATA (20 entries)
  const songs = [
    {
      clue: "I got my head out the ____",
      options: ["Sunroof", "Window", "Moonlight", "Night Sky"],
      correctAnswer: "Sunroof",
    },
    {
      clue: "Cause baby you're a ____",
      options: ["Firework", "Star", "Rocket", "Sun"],
      correctAnswer: "Firework",
    },
    {
      clue: "I can buy myself ____",
      options: ["Flowers", "Money", "Gold", "Love"],
      correctAnswer: "Flowers",
    },
    {
      clue: "I'm at a payphone ____ you",
      options: ["Calling", "Missing", "Loving", "Finding"],
      correctAnswer: "Calling",
    },
    {
      clue: "Hello from the other ____",
      options: ["Side", "World", "Line", "Place"],
      correctAnswer: "Side",
    },
    {
      clue: "I'm gonna swing from the ____",
      options: ["Chandelier", "Ceiling", "Stars", "Fire"],
      correctAnswer: "Chandelier",
    },
    {
      clue: "Just gonna stand there and watch me ____",
      options: ["Burn", "Fall", "Cry", "Break"],
      correctAnswer: "Burn",
    },
    {
      clue: "We were just kids when we fell in ____",
      options: ["Love", "Summer", "Dreams", "Forever"],
      correctAnswer: "Love",
    },
    {
      clue: "I'm in love with the shape of ____",
      options: ["You", "Us", "Life", "Time"],
      correctAnswer: "You",
    },
    {
      clue: "So love me like you ____",
      options: ["Do", "Want", "Say", "Feel"],
      correctAnswer: "Do",
    },
    {
      clue: "You are the dancing ____",
      options: ["Queen", "Star", "Girl", "Lady"],
      correctAnswer: "Queen",
    },
    {
      clue: "I'm gonna take my horse to the old town ____",
      options: ["Road", "Country", "Town", "Field"],
      correctAnswer: "Road",
    },
    {
      clue: "My mama don't like you and she likes ____",
      options: ["Everyone", "Nobody", "Somebody", "Anything"],
      correctAnswer: "Everyone",
    },
    {
      clue: "Is it too late now to say ____",
      options: ["Sorry", "Goodbye", "Hello", "Stay"],
      correctAnswer: "Sorry",
    },
    {
      clue: "I've got a blank space ____",
      options: ["Baby", "Name", "There", "Here"],
      correctAnswer: "Baby",
    },
    {
      clue: "Yeah you got that yummy ____",
      options: ["Yum", "Taste", "Sweet", "Glow"],
      correctAnswer: "Yum",
    },
    {
      clue: "And I was like baby, baby, baby ____",
      options: ["Oh", "Yeah", "No", "Hey"],
      correctAnswer: "Oh",
    },
    {
      clue: "You're the one that I ____",
      options: ["Want", "Need", "Love", "Choose"],
      correctAnswer: "Want",
    },
    {
      clue: "Don't stop ____",
      options: ["Believin'", "Trying", "Running", "Moving"],
      correctAnswer: "Believin'",
    },
    {
      clue: "This girl is on ____",
      options: ["Fire", "Stage", "Spotlight", "Top"],
      correctAnswer: "Fire",
    },
  ];

  // Insert songs
  for (const s of songs) {
    await prisma.song.upsert({
      where: { clue: s.clue },
      update: {},
      create: {
        clue: s.clue,
        options: s.options,
        correctAnswer: s.correctAnswer,
      },
    });
  }

  console.log("Songs seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seeding finished.");
  });
