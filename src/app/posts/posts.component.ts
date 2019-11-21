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
      this.subid = params.get('id');
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
            document.querySelector('#subTitle').innerHTML += `<h1>r/${subid}</h1>`;
            coll.forEach(doc => {
              document.querySelector('#posts').innerHTML +=
                `<br><h4><a [routerLinkActive]='activeClass' routerLink='topics/${subid}/posts/${doc.id}'>${doc.id}</a></h4></br>`;
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
}
