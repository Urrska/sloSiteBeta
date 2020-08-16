import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {Gapfill} from '../models/practice-gapfill';
import {VocabularyCategory, VocabularyLesson} from '../models/vocab-lesson';
import FieldValue = firebase.firestore.FieldValue;

@Injectable({providedIn: 'root'})
export class DatabaseService {

  constructor(public afs: AngularFirestore) {
  }

  getCollectionData<T>(collectionName): Observable<T[]> {
    return this.afs.collection<T>(collectionName).snapshotChanges()
      .pipe(
        map(actions => actions.map(data => {
          const docId = data.payload.doc.id;
          const docData = data.payload.doc.data();
          return {docId, ...docData};
        }))
      );
  }

  getDocument<T>(collectionName, docId: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return this.afs.collection<T>(collectionName).doc<T>(docId).ref.get();
  }

  addDocumentToCollection<T>(collectionName, valueToAdd): Promise<DocumentReference> {
    return this.afs.collection<T>(collectionName).add({...valueToAdd});
  }

  deleteDocumentFromCollection<T>(collectionName, docId) {
    return this.afs.collection<T>(collectionName).doc<T>(docId).delete();
  }

  // there is a possibility that the item: value to be added isn't a good solution
  updateDocument<T>(collectionName, docId: string, valueToBeAdded) {
    return this.afs.collection<T>(collectionName).doc<T>(docId).ref.update({item: valueToBeAdded});
  }

  // only pertinent to the gapfill practice so it is specific
  updateGapfillSentence(docId: string, valueToBeAdded) {
    return this.afs.collection<Gapfill>('practice-gapfill').doc<Gapfill>(docId).ref
      .set({sentence: FieldValue.arrayUnion(...valueToBeAdded)});
  }

  // vocabulary-specific methods

  getVocabularyByCategory(categorySlug: string): Observable<VocabularyLesson[]> {
    if (!categorySlug) {
      return this.afs.collection<VocabularyLesson>('vocabulary').valueChanges();
    } else {
      return this.afs.collection<VocabularyLesson>('vocabulary', ref => ref.where('categorySlug', '==', categorySlug)).valueChanges();
    }
  }

  addNewCategory<T>(valueToAdd): Promise<DocumentReference> {
    return this.afs.collection<VocabularyCategory>('vocab-category').add({...valueToAdd});
  }

}
