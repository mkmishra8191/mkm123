import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Item} from  '../models/Item';
import { Observable } from 'rxjs';
import { map,  } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ItemsService {
   

 


  itemCollection: AngularFirestoreCollection<Item>;
  
  items: Observable<Item[]>;
  
  
  itemDoc:AngularFirestoreDocument<Item>
  
  

  constructor(public afs: AngularFirestore) {
    this.itemCollection=this.afs.collection('items');
    this.items = this.itemCollection.snapshotChanges().pipe(map(changes=>{
               return changes.map(a=>{
                 const data = a.payload.doc.data() as Item;
                 const id = a.payload.doc.id;
                 return {id, ...data};
               }); 

               
    }));
    

  }

  getItems(){
    
     return this.items;
   } 

   

   addItem(item:Item){
      this.itemCollection.add(item);

   }
   deleteItem(item:Item){
        this.itemDoc=this.afs.doc(`items/${item.id}`);
        this.itemDoc.delete();

   }
   
  

  checkOrUnCheckTitle(item,flag:boolean) {
    this.itemDoc=this.afs.doc(`items/${item.id}`);
    this.itemDoc.update({'checked':flag});
    setTimeout(() => {
      this.itemDoc=this.afs.doc(`items/${item.id}`);
      this.itemDoc.update({'completed':flag});
      
    }, 200);     
}
}