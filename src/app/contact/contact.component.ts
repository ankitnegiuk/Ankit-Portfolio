import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  sendEmail(): void {
    window.location.href = 'mailto:2000ankitnegiuk@gmail.com?subject=Hello&body=Hi Ankit,';
  }

  callPhone(): void {
    window.location.href = 'tel:+447909553721';
  }

  downloadResume(): void {
    const link = document.createElement('a');
    link.href = 'files/Ankit_Negi_Resume.pdf';
    link.download = 'Ankit_Negi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



}
