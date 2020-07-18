import { Component, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items.service'
import {Item} from  '../../models/Item';


@Component({
  selector: 'app-item',
  
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item = {
    title: '',
    completed: false 
  }

 

 items:Item[];
 
 showInputBox: boolean;
   
  

  constructor(private itemService: ItemsService) {

    
    this.showInputBox=false;
   }

  ngOnInit(): void {
    
       this.itemService.getItems().subscribe(items=>{
         this.items=items.sort((a,b) => {
          var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase()
          if (titleA<titleB)
            return -1
            if (titleA>titleB)
            return 1
            return 0 
          
        })
        
    });
    
       

  }
  

  onSubmit(){

           if(this.item.title!='' ){
             
             this.itemService.addItem(this.item);
             
             this.showInputBox=false;
             this.item.title='';
  
             
              
      }

    
    }
      

  
  

  deleteItem(item){

    this.itemService.deleteItem(item);
  }

  alterCheck(item,completed:boolean){

    this.itemService.checkOrUnCheckTitle(item,!completed);
  }
  OnClickPlus() {
    this.showInputBox=true;
  }
  
}