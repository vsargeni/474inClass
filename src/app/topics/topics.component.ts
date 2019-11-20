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

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  // public viewTopics: Array<Topic>;

  ngOnInit() {
    this.getTopics();
  }


 async getTopics() {
    try {
      await this.db.collection('subreddits').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              document.querySelector('#subreddits').innerHTML += `<br><h4><a href=${doc.id}>r/${doc.id}</a></h4></br>`;
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  async makeTopics() {
    try{
      
    }
    catch (err){
      console.log(err);
    }
  }
}
