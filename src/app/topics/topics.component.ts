import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router, public db: AngularFirestore) { }

  ngOnInit() {
    this.getTopics();
  }

  nav(subid: string) {
    this.router.navigateByUrl(`/topics/${subid}/posts`);
  }

  async getTopics() {
    try {
      await this.db.collection('subreddits').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              document.querySelector('#subreddits').innerHTML +=
                // Commented link should work absolutely fine, but doesn't for some reason
                // tslint:disable-next-line: max-line-length
                // `<br><a style='color:#005ccc;cursor:pointer;text-decoration:underline' [routerLinkActive]='activeClass' class='nav-link' [routerLink]="['topics','${doc.id}','posts']"><h4>r/${doc.id}</h4></a></br>`;
                `<br><a href='topics/${doc.id}/posts'><h4>r/${doc.id}</h4></a></br>`;
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  async makeTopics() {
    try {

    } catch (err) {
      console.log(err);
    }
  }
}
