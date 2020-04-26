import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentService } from '../../content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  body1: any;
  body2: any;
  body3: any;
  body4: any;
  year: number;

  constructor(public contentService: ContentService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.contentService.getContent().subscribe(res => {
      this.body1 = this.sanitizer.bypassSecurityTrustHtml(res[0].body);
      this.body2 = this.sanitizer.bypassSecurityTrustHtml(res[1].body);
      this.body3 = this.sanitizer.bypassSecurityTrustHtml(res[2].body);
      this.body4 = this.sanitizer.bypassSecurityTrustHtml(res[3].body);
    });
    this.getYear();
  }

  call(): void {
    const PhoneNumber = '9702590128';
    window.location.href = 'tel://' + PhoneNumber;
  }

  getYear(): void {
    this.year = new Date().getFullYear();
  }

}
