import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  generatePdf() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Exame Antropométrico', 14, 20);

    const rows = Object.entries(this.exam).map(([field, value]) => [
      this.getLabel(field),
      value ?? ''
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Campo', 'Valor']],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 }
    });

    doc.save('exame-antropometrico.pdf');
  }

  private getLabel(field: string) {
    const labels: Record<string, string> = {
      id: 'ID',
      name: 'Nome',
      email: 'Email',
      phone: 'Telefone',
      birthday: 'Data de Nascimento',
      weight: 'Peso (kg)',
      height: 'Altura (cm)',
      circum_abs_rips: 'Circ. Abdômen/Quadril (cm)',
      circum_rips_thigh: 'Circunf. Quadril/Coxa (cm)'
    };
    return labels[field] ?? field;
  }
}
