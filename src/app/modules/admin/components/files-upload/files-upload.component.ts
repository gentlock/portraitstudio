import {Component, ElementRef, Input, OnChanges, Renderer2, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {FilesUploadService} from "../../../../core/services/data/files-upload.service";
import {Observable} from "rxjs";
// import { FormControl } from '@angular/forms';
import {IAlbumsFeed, IMyserviceFeed} from "../../../../core/abstracts";
import {json} from "express";

@Component({
  selector: 'files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnChanges {
  @ViewChild('dropBox') dropBox!: ElementRef<HTMLDivElement>;
  progressValue = 0;
  // id = new FormControl('');
  @Input() uniqID!: string;
  @Input() useCollection: any;
  @Input() useSchema!: string;
  data$!: Observable<IAlbumsFeed|IMyserviceFeed>;

  constructor(
    private _render: Renderer2,
    private http: HttpClient,
    private filesUploadService: FilesUploadService
  ) {
  }

  ngAfterViewInit() {
    this.loadPhotos();

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
    e.preventDefault();
    e.stopPropagation();
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

  setCoverPhoto(e: Event, id: string, photoName: string) {
    let allFigcaptions = this.dropBox.nativeElement.querySelectorAll("figcaption");
    allFigcaptions.forEach(item=>{
      item.classList.remove("!bg-color-light8");
    });

    let clicked = (e.target as HTMLElement).closest('div.card')?.querySelector('figcaption')!;
    clicked.classList.add("!bg-color-light8");

    this.filesUploadService.setCoverPhoto(id, photoName, this.useSchema).subscribe(
        {
          next: (result) => {
            // console.log(result);
          },
          error:(err) => {
            console.log(err);
          }
        }
    )
  }

  deletePhoto(e: Event, id: string, photoName: string) {
    if(confirm('powierdz usuniecie')) {
      let rmv = (e.target as HTMLElement).closest('div.card')!;
      rmv.classList.add("hidden");

      this.filesUploadService.deleteFile(id, photoName, this.useSchema).subscribe(
        {
          next: () => {},
          error: (err) => {console.log(err);}
        });
    }
  }

  ngOnChanges() {
    this.loadPhotos();
  }

  loadPhotos() {
    if(!!this.uniqID && !!this.useSchema) {
      this.data$ = this.filesUploadService.fetchGallery(this.uniqID, this.useSchema);
    }
  }

  uploadFiles = (data: FormData) => {
    if (!!this.uniqID) {
      this.filesUploadService.uploadData(this.uniqID, this.useSchema, data).subscribe(
        {
          next: (e) => {
            if (e.type === HttpEventType.UploadProgress) {
              this.progressValue = Math.round(e.loaded / e.total! * 100);
            } else if (e.type === HttpEventType.Sent) {
              this.loadPhotos();
              this.progressValue = 0;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
          }
        });
    }
  }
}
