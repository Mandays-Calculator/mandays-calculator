/**
 * Copies the provided text to the clipboard.
 * Creates a temporary textarea, sets its value to the input text, selects the text, copies it to the clipboard, and removes the textarea.
 * @param {string} text - The text to be copied.
 */
export const copyToClipboard = (text: string): void => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};
