import { async } from '@angular/core/testing';
import { Report } from './../../Model/Report';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  fileUploaded: File;
  newsCollection: AngularFirestoreCollection<Report>
  imageURL: any;
  ref;
  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore, private storage: AngularFireStorage, public modal: NgbActiveModal) {
    this.registerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.newsCollection = this.afs.collection('news');
  }

  agregar() {
    this.submitted = true;

    if (this.registerForm.invalid || this.fileUploaded == null) {
      return;
    }
    console.log('upload')
    let task
    let currentDate = new Date();
    const fileName = Date.now() + "_" + this.fileUploaded.name;
    const path = 'news/' + fileName;
    this.ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.fileUploaded);
    this.task.then(
      ()=>{
        this.newsCollection.add({
          title: this.f.title.value,
          description: this.f.description.value,
          imageURL: 'https://firebasestorage.googleapis.com/v0/b/requerimientos-95164.appspot.com/o/news%2F'+fileName+'?alt=media',
          date: currentDate.toUTCString()
        })
        this.registerForm.reset();
        this.fileUploaded = null;
      }
    )

  }
  get f() { return this.registerForm.controls; }
  openFile(files: FileList) {
    this.fileUploaded = files.item(0);
    console.log(this.fileUploaded.name)
    var reader = new FileReader();
    reader.readAsDataURL(this.fileUploaded);
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    }
  }
}
