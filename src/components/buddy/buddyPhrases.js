export const BUDDY_PHRASES = {
  welcome: ["Hallo! Ich bin Buddy.", "Ready to learn German?"],
  greetingMorning: ["Guten Morgen!", "Ready to learn?"],
  greetingAfternoon: ["Guten Tag!", "Let's practice!"],
  greetingEvening: ["Guten Abend!", "One quick lesson?"],
  lessonStart: ["Los geht's!", "You've got this!"],
  correct: ["Super!", "Richtig!", "Ausgezeichnet!"],
  incorrect: ["Nicht schlimm!", "Almost! Try again.", "Keep going!"],
  streakActive: ["Streak alive!", "Keep it up!"],
  streakRisk: ["Don't forget me!", "One lesson saves it!"],
  goalHit: ["Goal complete!", "Budd-tastic!"],
  encouragement: ["You can do it!", "Practice makes perfekt!"],
  loading: ["Loading...", "Just a moment!"],
  empty: ["Nothing here yet!", "Start your first lesson!"],
  error: ["Oops!", "Let's try again."]
};

export function pickPhrase(category) {
  const list = BUDDY_PHRASES[category] || BUDDY_PHRASES.encouragement;
  return list[Math.floor(Math.random() * list.length)];
}

export function getGreetingByTime() {
  const hour = new Date().getHours();
  if (hour < 12) return 'greetingMorning';
  if (hour < 18) return 'greetingAfternoon';
  return 'greetingEvening';
}
