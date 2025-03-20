async function createStickiesFromText() {
  const selection = figma.currentPage.selection;

  // Check if a text node is selected
  if (selection.length !== 1 || selection[0].type !== "TEXT") {
    figma.notify("Please select a single text node");
  }

  const textNode = selection[0] as TextNode;
  const text = textNode.characters;
  console.log(text);

  // Split text into list items
  // Assuming items are separated by newlines
  const listItems = text.split("\n").filter((item) => item.trim());
  console.log(listItems);

  const createdStickies: StickyNode[] = [];
  // Create sticky note for each list item
  for (const item of listItems) {
    // Create sticky (using rectangle as base)
    const sticky = figma.createSticky();

    // load the font before setting characters
    await figma.loadFontAsync(sticky.text.fontName as FontName);
    sticky.text.characters = item.trim();

    // Position sticky relative to original text
    sticky.x = textNode.x + listItems.indexOf(item) * 300;
    sticky.y = textNode.y;

    createdStickies.push(sticky);
  }
  figma.notify(`Created ${createdStickies.length} stickies`);
  figma.currentPage.selection = createdStickies;
}

(async () => {
  await createStickiesFromText();
  figma.closePlugin();
})();
