import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import {
  AngularFirestore,
  AngularFirestoreModule,
  AngularFirestoreDocument,
  fromDocRef
} from "@angular/fire/firestore";
import { Topic } from "./topic.model";

@Component({
  selector: "app-topics",
  templateUrl: "./topics.component.html",
  styleUrls: ["./topics.component.css"]
})
export class TopicsComponent implements OnInit {
  //itemsRef: AngularFireList<any>;
  constructor(private route: ActivatedRoute, public db: AngularFirestore) {}

  //public viewTopics: Array<Topic>;

  ngOnInit() {
    this.getTopics();
  }

  async getTopics() {
    // const firestore = firebase.firestore();
    const topics = [];
    try {
      //const snap = await this.db.collection("subreddits").get();
      let snap = this.db.collection("root").doc("subreddits");
      let getDoc = snap
        .get().toPromise()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            console.log("Document data:", doc.data());
          }
        })
        .catch(err => {
          console.log("Error getting document", err);
        });

      //const x = await this.afs.doc

      // snap.forEach(function(val) {
         document.querySelector(
           "#subs"
         ).innerHTML += `<a href=${getDoc}> ${getDoc}</a><br>`;
      // });
    } catch (e) {
      console.log(e);
    }
    return topics;
  }
}
