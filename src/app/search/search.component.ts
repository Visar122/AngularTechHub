import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    
  searchproduct:undefined|Product[];

  constructor(private product:ProductService,private ActiveRoute:ActivatedRoute){}

  ngOnInit(){
    this.ActiveRoute.params.subscribe((params)=>{
      let query=params['query']; // query is so  ('query') is not null so  the link is not http://localhost:4200/search/

      if(query){
        this.product.Searchproduct(query).subscribe((result)=>{
          this.searchproduct=result;      
          })
 
          
      }
    })
  
   
  }

}































   /*        params Property: params is a property of ActivatedRoute that is an observable. 
          It allows you to subscribe to changes in the route parameters. Route parameters are placeholders in the route path denoted by a colon (:), like :id or :query. */
/*   this.activeRoute.params.subscribe((params) => {...});: This subscribes to changes in the route parameters. 
  The params observable emits a new value whenever the route parameters change.

  let query = params['query'];: Retrieves the value of the 'query' parameter from the params object.
  
  if (query) {...}: Checks if the 'query' parameter is truthy. If it exists, it means that there's a search query in the URL.
  
  this.product.Searchproduct(query).subscribe((result) => {...});: Calls the Searchproduct method from the ProductService, 
  passing the 'query' parameter. The method returns an observable (result), which is then subscribed to.
  
  this.searchproduct = result;: When the observable emits a new value (the search results), 
  it updates the searchproduct property of the component, triggering a refresh of the displayed search results. */