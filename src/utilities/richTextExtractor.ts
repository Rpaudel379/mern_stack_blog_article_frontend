export const extractTitle = (title: string) => {
  const firstLine = title.split("\n")[0];
  const removeTags = firstLine.trim().replace(/<[^>]+>/g, ""); // Remove HTML tags
  const extractedTitle = new DOMParser()
    .parseFromString(removeTags, "text/html")
    .documentElement.textContent?.trim() as string; // Decode HTML entities

  const regex = /^[:a-zA-Z0-9\s]+$/; // Regular expression to match alphabets, numbers, and spaces

  if (!regex.test(extractedTitle)) {
    return {
      valid: false,
      text: "title must be on the first line with only alphanumeric characters",
    };
  } else if (extractedTitle.length < 5) {
    return {
      valid: false,
      text: "minimum length of title must be 5 characters",
    };
  } else if (extractedTitle.length > 75) {
    return {
      valid: false,
      text: "maximum length of title is 75 characters",
    };
  } else {
    return { valid: true, text: extractedTitle };
  }
};

export const coverImageExtract = (richText: string): string | null => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(richText, "text/html");
  const image = doc.querySelector("img");

  if (image) {
    const imageUrl = image.getAttribute("src");
    return imageUrl;
  } else {
    return null;
  }
};

export const extractFirstParagraph = (richText: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(richText, "text/html");
  const paragraphs = doc.querySelectorAll("p");

  let firstNonEmptyParagraph: string | undefined;

  for (const p of Object.values(paragraphs)) {
    const paragraphWithText = p.textContent?.trim();
    if (paragraphWithText !== "") {
      firstNonEmptyParagraph = paragraphWithText;
      break;
    }
  }

  if (firstNonEmptyParagraph) {
    return firstNonEmptyParagraph.slice(0, 100);
  }

  return "No paragraphs found.";
};
