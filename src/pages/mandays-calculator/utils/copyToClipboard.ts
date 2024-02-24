/**
 * Copies the provided text to the clipboard.
 * Creates a temporary textarea, sets its value to the input text, selects the text, copies it to the clipboard, and removes the textarea.
 * @param {string} text - The text to be copied.
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text successfully copied to clipboard:", text);
  } catch (err) {
    console.error("Error copying text to clipboard:", err);
  }
};
