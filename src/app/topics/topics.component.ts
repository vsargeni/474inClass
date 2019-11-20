import { Component, OnInit } from '@angular/core';
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
import { Topic } from './topic.model';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})

export class TopicsComponent implements OnInit {
  // itemsRef: AngularFireList<any>;
  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  // public viewTopics: Array<Topic>;

  ngOnInit() {
    this.getTopics();
  }


  getTopics() {
    try {
      this.db.collection('root').doc('subredddits').get().toPromise()
        .then(doc => {
          if (!doc.exists ) {
            console.log('No document found');
          } else {
            document.querySelector('#subs').innerHTML += `<br><a href=${doc}>r/${doc}</a></br>`;
            console.log(doc.id);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

}
