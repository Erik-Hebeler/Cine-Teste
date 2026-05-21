import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-body-content',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputNumberModule, ButtonModule, FloatLabelModule, DatePickerModule ],
  templateUrl: './body-content.component.html',
  styleUrls: ['./body-content.component.scss']
})
export class BodyContentComponent {
  exam = {
    id: null,
    name: '',
    email: '',
    phone: '',
    birthday: '',
    weight: null,
    height: null,
    circum_abs_rips: null,
    circum_rips_thigh: null
  };

  save() {
    // lógica para gravar
    console.log('Gravar', this.exam);
  }
}
