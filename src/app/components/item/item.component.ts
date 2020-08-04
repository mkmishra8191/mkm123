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
    content:'',
    completed: false,
    checked: false,
    
  }


  itemsL:Item[];
  itemsC:Item[];

 items:Item[];
 
 showInputBox: boolean;
 showCompleted:boolean;
 showAll:boolean;
 
 
 
 

  constructor(private itemService: ItemsService) {
    


    
    this.showInputBox=false;
    this.showCompleted=false;
    this.showAll=false;
    
  
  
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
  
 
  onSubmit(item:Item){

    let titleTrim=this.item.title.trim();

    this.item.title=titleTrim;

   let itemsList=this.items.filter(a=>a.title.toLowerCase()==this.item.title.toLowerCase() && a.completed==false);
   let   itemsCompleted=this.items.filter(a=>a.title.toLowerCase()==this.item.title.toLowerCase() && a.completed==true);

   console.log(itemsList)
    
              if(itemsList.length!= 0){

                alert("Item is listed");
              } else

              if(itemsCompleted.length!= 0){

                alert("Item is completed");
              } else
         
   
   
             

          

           if(this.item.title=='' ){

            this.showInputBox=false;
           } else
           
           
           if(this.item.title!='' && !this.showAll ){

            
            
             
             this.itemService.addItem(this.item);
             
             this.showInputBox=false;
             this.item.title='';
             this.item.content='';
             
              
      }  
    
    }
      

  
  

  deleteItem(item){

    this.itemService.deleteItem(item);
  }

  alterCheck(item,completed:boolean,){ 

    if(!item.ckecked)

    
    this.itemService.checkOrUnCheckTitle(item,!completed)
    this.showCompleted=!this.showCompleted;
    
    
  }
  OnClickPlus() {
    this.showInputBox=true;
  } 
  editCheck(){ 

    
    this.showAll=true
    
    
  }

  updateItem(item:Item,completed:boolean){
    let titleTrim=this.item.title.trim();

    this.item.title=titleTrim;

   let itemsList=this.items.filter(a=>a.title.toLowerCase()==this.item.title.toLowerCase() && a.completed==false);
   

   console.log(itemsList)
    
              if(itemsList.length!= 0){

                alert("Item is listed");
              } else

             
         
   
   
             

          

           if(this.item.title=='' ){

            this.showCompleted=false;
           } else 
           
           
           
    this.item.completed=false;
    this.itemService.updateItem(item);
    this.itemService.checkOrUnCheckTitle(item,!completed)
    this.item.title='';
    this.item.content='';
    this.showCompleted=false;
    this.showAll=false;
  }
}