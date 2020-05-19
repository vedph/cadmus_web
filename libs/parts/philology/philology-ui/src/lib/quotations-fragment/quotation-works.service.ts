import { Injectable } from '@angular/core';
import { ThesaurusEntry } from '@cadmus/core';

@Injectable({
  providedIn: 'root',
})
export class QuotationWorksService {
  constructor() {}

  /**
   * Collect all the authors names from the works dictionary built by
   * buildDictionary.
   *
   * @param dictionary The dictionary to be scanned.
   * @returns An array of thesaurus entries, each representing an author,
   * or null if no thesaurus entries.
   */
  public collectAuthors(
    dictionary: Record<string, ThesaurusEntry[]> | null
  ): ThesaurusEntry[] | null {
    const authors: ThesaurusEntry[] = [];
    if (!dictionary) {
      return null;
    }

    Object.getOwnPropertyNames(dictionary).forEach((p) => {
      authors.push({
        id: p,
        value: dictionary[p][0].value,
      });
    });

    return authors.length? authors : null;
  }

  /**
   * Build a dictionary of authors and their works from a set of
   * thesaurus entries.
   *
   * @param entries The entries from a works thesaurus, where each entry
   * has 2 levels, separated by a dot; the first level is the author,
   * and the second the work. For instance, "Verg.ecl." means author=Verg
   * and work=ecl. It is assumed that work IDs can include dots, but
   * authors cannot.
   * @returns A record where key=author ID and value=array of thesaurus
   * entries, where the first represents the author, and all the others
   * the set of his work.
   */
  public buildDictionary(
    entries: ThesaurusEntry[]
  ): Record<string, ThesaurusEntry[]> {
    const record = {};
    if (!entries?.length) {
      return record;
    }

    for (let i = 0; i < entries.length; i++) {
      const id = entries[i].id;

      // author = id up to first dot (excluded);
      // e.g. "Verg."="Verg", and "Verg.ecl."="Verg"
      let key: string;
      const firstDot = id.indexOf('.');

      if (firstDot === -1) {
        key = id;
      } else {
        if (firstDot === id.length - 1) {
          // ignore the ending dot of an author without his work
          key = id.substring(0, id.length - 1);
        } else {
          key = id.substring(0, firstDot);
        }
      }

      // add the entry under the proper key
      if (!record[key]) {
        record[key] = [entries[i]];
      } else {
        record[key].push(entries[i]);
      }
    }

    return record;
  }
}
