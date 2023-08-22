import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h2>Confirmação</h2>
  <p>{{ data.message }}</p>
  <button mat-button (click)="dialogRef.close('cancel')">Cancelar</button>
  <button mat-button (click)="dialogRef.close('confirm')">Confirmar</button>
  `,
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ){}


}
