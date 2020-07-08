import { AuthService } from './../Services/auth.service';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Report } from './../Model/Report';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateNewsComponent } from './create-news/create-news.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsCollection: AngularFirestoreCollection<Report>
  popularNewsCollection: AngularFirestoreCollection<Report>
  interestNewsCollection: AngularFirestoreCollection<Report>
  lastestNews: Observable<Report[]>
  popularNews: Observable<Report[]>
  interestNews: Observable<Report[]>
  constructor(private afs: AngularFirestore, public auth: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.newsCollection = this.afs.collection('news', ref => {
      return ref.orderBy('date', 'desc').limit(4)
    });
    this.lastestNews = this.newsCollection.valueChanges();
    this.popularNewsCollection = this.afs.collection('news', ref => {
      return ref.orderBy('reads', 'desc').limit(4)
    });
    this.popularNews = this.popularNewsCollection.valueChanges();
    this.interestNewsCollection = this.afs.collection('news', ref => {
      return ref.orderBy('date', 'asc').limit(4)
    });
    this.interestNews = this.interestNewsCollection.valueChanges();
  }
  submit(title: string, date: string, description: string) {
    this.newsCollection.add({
      title,
      date,
      description
    })
  }

  open() {
    const modalRef = this.modalService.open(CreateNewsComponent);
    modalRef.componentInstance.name = 'World';
  }
}
