import { PronounGroup } from "src/ts/types/pronouns";

export const parsePronounGroupToString = (
  p: PronounGroup,
  alt?: PronounGroup,
) => {
  if (p.singular) {
    return `${p.subject}`;
  }

  // word joiners to prevent line breaks
  let sep = "\u2060/\u2060";
  if (alt !== undefined) {
    return `${p.subject}${sep}${alt.subject}`;
  } else {
    return `${p.subject}${sep}${p.object}`;
  }
};
