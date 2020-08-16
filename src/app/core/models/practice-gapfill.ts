export class PracticeGapfill {
  title: string;
  gapfills: Gapfill[];
  docId?: string;
  image: string;

  constructor(data) {
    this.title = data.title;
    this.image = data.image;
    if (data.docId) {
      this.docId = data.docId;
    }
    this.gapfills = data.gapfills.map(gapfill => new Gapfill(gapfill));
  }
}

export class Gapfill {
  sentence: Sentence[];

  constructor(data) {
    Object.assign(this, data);
    this.sentence = data.sentence.map(sentencePart => new Sentence(sentencePart));
  }
}

export class Sentence {
  value: string;
  type: string;
  expectedValue?: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
