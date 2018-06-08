import {
  Component,
  ChangeDetectionStrategy,
  AfterViewChecked,
  HostListener
} from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Item } from '../../models/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ItemService } from '../../services/item.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent implements AfterViewChecked {

  afsItemCollection: AngularFirestoreCollection<Item>;
  afsItems: Observable<Item[]>;

  constructor(
    private itemService: ItemService,
    private afs: AngularFirestore
  ) {
    this.afsItemCollection = this.afs.collection<Item>('items');
    // this.afsItems = this.afsItemCollection.valueChanges();

    this.afsItems = this.afsItemCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    /*this.afsItems = this.afsItemCollection.stateChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );*/
  }

  // ***** TODO: find CSS solution
  ngAfterViewChecked() {
    this.resizeList();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeList();
  }

  resizeList() {
    const list: any = window.document.getElementsByTagName('app-list')[0];
    list.style.height = (document.body.offsetHeight - list.offsetTop) + 'px';
  }
  // *****
}
