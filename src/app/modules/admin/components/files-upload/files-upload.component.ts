import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {FilesUploadService} from "../../../../core/services/data/files-upload.service";
import {Observable} from "rxjs";
// import { FormControl } from '@angular/forms';
import {IAlbumsFeed, IMyserviceFeed, ICarouselFeed} from "../../../../core/abstracts";

@Component({
  selector: 'files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent {
  @ViewChild('dropBox') dropBox!: ElementRef<HTMLDivElement>;
  progressValue = 0;
  // id = new FormControl('');
  @Input() uniqID!: string;
  @Input() useCollection: any;
  @Input() useSchema!: string;
  data$!: Observable<IAlbumsFeed|IMyserviceFeed|ICarouselFeed>;

  constructor(
    private _render: Renderer2,
    private http: HttpClient,
    private filesUploadService: FilesUploadService
  ) {
  }

  ngAfterViewInit() {
    // this.data$ = this.loadPhotos();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this._render.listen(this.dropBox.nativeElement, eventName, this.preventDefaults);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this._render.listen(this.dropBox.nativeElement, eventName, this.highlight);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this._render.listen(this.dropBox.nativeElement, eventName, this.unhighlight);
    });

    this._render.listen(this.dropBox.nativeElement, 'drop', this.handleDrop);
  }

  preventDefaults = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight = (e: Event) => {
    this._render.addClass(this.dropBox.nativeElement, 'bg-rose-200');
  }

  unhighlight = (e: Event) => {
    this._render.removeClass(this.dropBox.nativeElement, 'bg-rose-200');
  }

  handleDrop = (e: DragEvent) => {
    const formData = new FormData();
    const dt = e.dataTransfer;
    const files: FileList = dt!.files;

    Array.from(files).forEach(file => (file.type === "image/jpeg") ? formData.append('file', file) : null);
    this.uploadFiles(formData);
  }

  loadPhotos() {
    return this.filesUploadService.fetchGallery(this.uniqID, this.useSchema);
  }

  uploadFiles = (data: FormData) => {
    if (!!this.uniqID) {
      this.filesUploadService.uploadData(this.uniqID, this.useSchema, data).subscribe(
        {
          next: (e) => {
            if (e.type === HttpEventType.UploadProgress) {
              this.progressValue = Math.round(e.loaded / e.total! * 100);
            } else if (e.type === HttpEventType.Response) {
              // this.data$ = this.loadPhotos();
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
    }
  }
}
