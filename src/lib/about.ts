// About copy: draft, written to be refined. Keep claims factual.

export const about = {
  // Rendered after the inline logo, which stands in for the name "Akkmal Saad Labs".
  statement:
    "designs and builds digital products, taking ideas from the first conversation all the way to launch.",
  // Personal introduction above the paragraphs; `strong` segments get a slightly heavier weight.
  intro: [
    { text: "I’m " },
    { text: "Akkmal Saad", strong: true },
    { text: ", a " },
    { text: "Meta Certified Full-Stack Developer", strong: true },
    {
      text: " and the person behind AS Labs. I design and develop digital products from idea to launch, combining thoughtful UI/UX design with reliable frontend and backend development.",
    },
  ],
  paragraphs: [
    "Design and development happen in the same hands. Decisions made while sketching carry through to the finished product instead of getting lost between teams.",
    "The work spans apps, web systems and tools: understanding the problem, shaping the experience, building it properly and getting it out into the world.",
  ],
  principles: [
    { title: "Clarity first", body: "Focused products that are easy to understand and pleasant to use." },
    { title: "Built properly", body: "Solid foundations that stay maintainable long after launch." },
    { title: "Idea to launch", body: "One continuous process, from first sketch to release." },
  ],
} as const;
