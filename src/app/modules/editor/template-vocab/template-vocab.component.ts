import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatabaseService} from '../../../core/services/database-service.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {VocabularyCategory, VocabularyLesson} from '../../../core/models/vocab-lesson';
import {faLongArrowAltLeft, faPlusSquare} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-template-vocab',
  templateUrl: './template-vocab.component.html',
  styleUrls: ['./template-vocab.component.scss']
})
export class TemplateVocabComponent implements OnInit {

  faPlus = faPlusSquare;
  faLongArrow = faLongArrowAltLeft;
  vocabForm: FormGroup;
  categoryForm: FormGroup;
  categories = [];

  constructor(private fb: FormBuilder,
              private db: DatabaseService,
              public smartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.initializeVocabForm();
    this.initializeCategoryForm();
    this.db.getCollectionData<VocabularyCategory>('vocab-category')
      .subscribe(res => {
        this.categories = res;
      });
  }

  initializeVocabForm() {
    this.vocabForm = this.fb.group({
      category: [null, Validators.required],
      categoryEng: [null, Validators.required],
      categorySlo: [null, Validators.required],
      categorySlug: [null, Validators.required],
      image: [null, Validators.required],
      headwordEng: [null, Validators.required],
      headwordSlo: [null, Validators.required],
      declensionTable: this.fb.group({
        declensionNominative: this.fb.group({
          nom1: [null, Validators.required],
          nom2: [null, Validators.required],
          nom3: [null, Validators.required]
        }),
        declensionGenitive: this.fb.group({
          gen1: [null, Validators.required],
          gen2: [null, Validators.required],
          gen3: [null, Validators.required]
        }),
        declensionDative: this.fb.group({
          dat1: [null, Validators.required],
          dat2: [null, Validators.required],
          dat3: [null, Validators.required]
        }),
        declensionAccusative: this.fb.group({
          acc1: [null, Validators.required],
          acc2: [null, Validators.required],
          acc3: [null, Validators.required]
        }),
        declensionLocative: this.fb.group({
          loc1: [null, Validators.required],
          loc2: [null, Validators.required],
          loc3: [null, Validators.required]
        }),
        declensionInstrumental: this.fb.group({
          inst1: [null, Validators.required],
          inst2: [null, Validators.required],
          inst3: [null, Validators.required]
        })
      })
    });
  }

  initializeCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryEng: [null, Validators.required],
      categorySlo: [null, Validators.required],
      // slug se zgenerira smaodejno na podlagi category
      slug: [null, Validators.required],
      thumbImage: [null, Validators.required]
    });
  }

  onResetCategory() {
    this.categoryForm.reset();
  }

  onSubmitCategory() {
    const rawValues = this.categoryForm.getRawValue();
    rawValues.categoryEng = rawValues.categoryEng.toLowerCase();
    rawValues.slug = this.slugify(rawValues.categoryEng);
    rawValues.categorySlo = rawValues.categorySlo.toLowerCase();
    this.db.addNewCategory<VocabularyCategory>(rawValues).then(() => {
      this.categoryForm.reset();
      this.smartModalService.close('add-category');
    });
  }

  onReset() {
    this.vocabForm.reset();
  }

  onSubmit() {
    const rawValues = this.vocabForm.getRawValue();
    rawValues.categoryEng = rawValues.category.categoryEng.toLowerCase();
    rawValues.categorySlo = rawValues.category.categorySlo.toLowerCase();
    rawValues.categorySlug = this.slugify(rawValues.categoryEng);
    // ne sme navigirati na VocabLesson Page
    this.db.addDocumentToCollection<VocabularyLesson>('vocabulary', rawValues).then(() => this.onReset());
  }

  slugify(str) {
    const from = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const to = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(from.split('').join('|'), 'g');

    return str.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => to.charAt(from.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

}
