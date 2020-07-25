import { Component, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items.service'
import {Item} from  '../../models/Item';



@Component({
  selector: 'app-item',
  
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  
})
export class ItemComponent implements OnInit {

 

  item: Item = {
    title: '',
    completed: false,
    
  }


  itemsL:Item[];
  itemsC:Item[];

 items:Item[];
 
 showInputBox: boolean;
 showCompleted:boolean;
 
 

  constructor(private itemService: ItemsService) {
    


    
    this.showInputBox=false;
    this.showCompleted=false;
  
  
   }

  ngOnInit(): void {
    
       this.itemService.getItems().subscribe(items=>{
         this.items=items.sort((a,b) => {
           
          var titleA=a.title.toLocaleLowerCase(), titleB=b.title.toLocaleLowerCase()
          if (titleA<titleB)
            return -1
            if (titleA>titleB)
            return 1 
            return 0 
          
        })
        
    });
  this.itemService.getItems().subscribe(items=>{
     this.itemsC=items.filter(a=> a.completed==true).sort((a,b) => {
           
      var titleA=a.title.toLocaleLowerCase(), titleB=b.title.toLocaleLowerCase()
      if (titleA<titleB)
        return -1
        if (titleA>titleB)
        return 1 
        return 0 
      
    })

  });
  this.itemService.getItems().subscribe(items=>{
    this.itemsL=items.filter(a=> a.completed==false).sort((a,b) => {
           
      var titleA=a.title.toLocaleLowerCase(), titleB=b.title.toLocaleLowerCase()
      if (titleA<titleB)
        return -1
        if (titleA>titleB)
        return 1 
        return 0 
      
    })

 });

  }
  

  onSubmit(itemTitle){

   let itemsList=this.items.filter(a=>a.title==itemTitle.value && a.completed==false);
   let   itemsCompleted=this.items.filter(a=>a.title==itemTitle.value && a.completed==true);

   console.log(this.itemsC)
    
              if(itemsList.length!= 0){

                alert("Item is listed");
              } else

              if(itemsCompleted.length!= 0){

                alert("Item is copleted");
              } else
         
   
   
             

          

           if(itemTitle.value=='' ){

            this.showInputBox=false;
           } else
           
           
           if(itemTitle.value!='' ){
            this.item.title=itemTitle.value;
             
             this.itemService.addItem(this.item);
             
             this.showInputBox=false;
             this.item.title='';
             
             
              
      }

    
    }
      

  
  

  deleteItem(item){

    this.itemService.deleteItem(item);
  }

  alterCheck(item,completed:boolean){

    
    this.itemService.checkOrUnCheckTitle(item,!completed)
    
    
  }
  OnClickPlus() {
    this.showInputBox=true;
  } 
  onCompleted(){
    this.showCompleted=true;
  }
  onToDoList(){
this.showCompleted=false;

  }
}
