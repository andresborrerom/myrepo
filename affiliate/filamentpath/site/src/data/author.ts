// Author profile for site byline. Single editor for now; structure leaves
// room for additional contributors later without a schema change.
//
// Anti-gray-hat (CLAUDE.md): the bio stays factual — no fabricated
// "professional maker" or industry credentials. Editor is a data scientist
// who runs an FDM 3D printer at home as a maker hobbyist.

export interface Author {
  name: string;
  role: string;
  url: string;
  bio: string;
  /** Optional path under /public (e.g. "/author/andres.jpg"). Falls back to initials. */
  image?: string;
}

export const author: Author = {
  name: 'Andres Borrero',
  role: 'Editor',
  url: '/about/',
  bio: 'Data scientist relocated from Colombia. Maker hobbyist focused on FDM 3D printing.',
};
