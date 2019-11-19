import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
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

  constructor(private route: ActivatedRoute, public afs: AngularFirestore) { }

  public viewTopics: Array<Topic>;

  ngOnInit() {
    this.getTopics();
  }

  async getTopics() {
    //const firestore = firebase.firestore();
    const topics = [];

    const snap = await this.afs.collection('subreddits').get();

    snap.forEach(function (val) {
      document.querySelector('#subs').innerHTML+=`<a href=${val.id}> ${val.id}</a><br>`;
      // topics.push(val.id);
      // console.log(val);
    });

    console.log(this.viewTopics);
    return topics;
  }
}

