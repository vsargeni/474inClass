import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreModule,
  AngularFirestoreDocument,
  fromDocRef
} from '@angular/fire/firestore';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() subid: string;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) {  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subid = params.get('subid');
    });
    this.getPosts(this.subid);
  }

  async getPosts(subid: string) {
    try {
      await this.db.collection('subreddits').doc(subid).collection('posts').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            document.querySelector('#subid').innerHTML = `r/${subid}`;
            coll.forEach(doc => {
              const postName = doc.get('title');
              document.querySelector('#posts').innerHTML +=
                `<br><a href='topics/${subid}/posts/${doc.id}'><h4>${postName}</h4></a></br>`;
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
}
