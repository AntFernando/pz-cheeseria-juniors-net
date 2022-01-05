import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cheese } from 'src/app/_models/cheese';

@Component({
  selector: 'app-cheese-details',
  templateUrl: './cheese-details.component.html',
  styleUrls: ['./cheese-details.component.css']
})
export class CheeseDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cheeseDetails: Cheese) { }

  ngOnInit(): void {

  }

}
