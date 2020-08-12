export class GrammarLesson {
  grammarTitleSlo: string;
  grammarTitleEng: string;
  grammarRichText: string;

  constructor(data) {
    Object.assign(this, data);
  }
}
