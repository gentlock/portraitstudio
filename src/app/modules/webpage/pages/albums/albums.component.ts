import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {IAlbumsFeed, IMyserviceFeed} from "../../../../core/abstracts";
import {MyservicesService} from "../../../../core/services/data/myservices.service";
import {AlbumsService} from "../../../../core/services/data/albums.service";

@Component({
  selector: 'studio-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements AfterViewInit{
  data$!: Observable<IMyserviceFeed[]>;
  albums$: Observable<IAlbumsFeed[]>;
  details$!: Observable<IAlbumsFeed>;
  @ViewChild("smallNav") smallNav!: ElementRef;
  showDetails = false;
  id!: string;

  constructor(
    private myservicesService: MyservicesService,
    private albumsService: AlbumsService,
    // private changeDetector: ChangeDetectorRef
  ) {
    this.data$ = myservicesService.getAll();
    this.albums$ = albumsService.getAll();
  }

  switchTab(e: Event) {
    e.preventDefault();

    (this.smallNav.nativeElement as HTMLUListElement).querySelectorAll('a').forEach(item=>{
      item.classList.remove('underline');
    });

    (e.target as HTMLLIElement).classList.add('underline');
  }

  switchView(e: Event, id: string) {
    this.showDetails = true;
    this.id = id;

    this.details$ = this.albumsService.getById(this.id);
  }
  ngAfterViewInit() {

  }
}
