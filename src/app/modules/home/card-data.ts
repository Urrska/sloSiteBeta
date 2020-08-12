export interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
  imageTitle: string;
}

export const cardData: CardData[] = [
  {
    id: 'vocabulary',
    title: 'vocabulary',
    // tslint:disable-next-line:max-line-length
    description: 'Vocabulary is the fun part of learning any language, Slovene included. Yes, we have developed an unnecessarily complex system od declensions which can easily sway you from learning Slovene. But have a look at our gallery of sublime images from all over Slovenia as a motivation. Back with us? Awesome! Now click the button and get to know a few new groups of letters before you move on to grammar.',
    image: 'https://cdn.pixabay.com/photo/2019/07/22/04/52/alps-4354164__340.jpg',
    imageTitle: 'the Alps'
  },
  {
    id: 'grammar',
    title: 'grammar',
    // tslint:disable-next-line:max-line-length
    description: 'Now for the rules, the backbone of any language - it\'s a good thing you already have a solid foundation in vocabulary and is going to make learning the language anatomy much easier. If at any time your keyboard is at risk of being broken out of exasperation, simply change your playlist, or create one, experts recommend.',
    image: 'https://cdn.pixabay.com/photo/2019/01/10/19/10/savica-3925879__340.jpg',
    imageTitle: 'waterfall Savica'
  },
  {
    id: 'practice',
    title: 'practice',
    // tslint:disable-next-line:max-line-length
    description: 'You have some precious nuggets of knowledge after all this time spent in front of soothing greenery of this page. Experts warmly recommend nay firmly suggest you put these nuggets into context and solidify their value before they slip through your synapses.',
    image: 'https://cdn.pixabay.com/photo/2019/11/29/20/50/old-house-4662121__340.jpg',
    imageTitle: 'kozolec'
  },
];
