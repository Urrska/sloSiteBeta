export class VocabularyLesson {
  category: string;
  categoryEng: string;
  categorySlo: string;
  categorySlug: string;
  headwordEng: string;
  headwordSlo: string;
  image: string;
  docId?: string;
  declensionTable: {
    declensionNominative: {
      nom1: string;
      nom2: string;
      nom3: string;
    },
    declensionGenitive: {
      gen1: string;
      gen2: string;
      gen3: string;
    },
    declensionDative: {
      dat1: string;
      dat2: string;
      dat3: string;
    },
    declensionAccusative: {
      acc1: string;
      acc2: string;
      acc3: string;
    },
    declensionLocative: {
      loc1: string;
      loc2: string;
      loc3: string;
    },
    declensionInstrumental: {
      inst1: string;
      inst2: string;
      inst3: string;
    }
  };

  constructor(data) {
    Object.assign(this, data);
    if (data.docId) {
      this.docId = data.docId;
    }
  }
}

export class VocabularyCategory {
  categoryEng: string;
  categorySlo: string;
  slug: string;
  thumbImage: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
