import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../content.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  headline: String;
  blockOne: String;
  blockTwo: String;
  blockThree: String;
  apiKey: String = '3aqchid463ppkgud4zmpuzlf5e2u06zcy3xl0dzhizuw6949';

  headlineForm: FormGroup;
  b1Form: FormGroup;
  b2Form: FormGroup;
  b3Form: FormGroup;

  constructor(public contentService: ContentService, private fb: FormBuilder) {

    this.headlineForm = fb.group({
      'content': ['']
    });

    this.b1Form = fb.group({
      'content': ['']
    });

    this.b2Form = fb.group({
      'content': ['']
    });

    this.b3Form = fb.group({
      'content': ['']
    });

  }

  ngOnInit() {

    this.contentService.getContent().subscribe(res => {

      this.headline = res[0].body;
      this.headlineForm.patchValue({content: this.headline});

      this.blockOne = res[1].body;
      this.b1Form.patchValue({content: this.blockOne});

      this.blockTwo = res[2].body;
      this.b2Form.patchValue({content: this.blockTwo});

      this.blockThree = res[3].body;
      this.b3Form.patchValue({content: this.blockThree});

    });

  }

  saveHeadline() {
    this.contentService.updateBlock('1', this.headlineForm.value.content);
    console.log(this.headlineForm.value.content);
  }

  saveB1() {
    this.contentService.updateBlock('2', this.b1Form.value.content);
  }

  saveB2() {
    this.contentService.updateBlock('3', this.b2Form.value.content);
  }

  saveB3() {
    this.contentService.updateBlock('4', this.b3Form.value.content);
  }

}
