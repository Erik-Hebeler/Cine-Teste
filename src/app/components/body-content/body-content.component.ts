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

  async saveAndShare() {
    this.save();
    await this.sharePdf();
  }

  private buildPdfDocument() {
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

    return doc;
  }

  generatePdf() {
    const doc = this.buildPdfDocument();
    doc.save('exame-antropometrico.pdf');
  }

  private createPdfFile() {
    const doc = this.buildPdfDocument();
    const blob = doc.output('blob');
    return new File([blob], 'exame-antropometrico.pdf', { type: 'application/pdf' });
  }

  async sharePdf() {
    const file = this.createPdfFile();
    const message = `Exame Antropométrico de ${this.exam.name || 'Paciente'}\nTelefone: ${this.exam.phone || ''}`;

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          title: 'Exame Antropométrico',
          text: message,
          files: [file]
        });
        return;
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    }

    const phone = this.formatPhoneForWhatsApp(this.exam.phone);
    if (phone) {
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(
        'Estou enviando o PDF do exame. Por favor, anexe o arquivo manualmente.'
      )}`;
      window.open(url, '_blank');
      return;
    }

    window.alert(
      'Não foi possível compartilhar o PDF diretamente. Você pode gerar o PDF e enviar manualmente pelo WhatsApp.'
    );
  }

  private formatPhoneForWhatsApp(phone: string) {
    if (!phone) {
      return null;
    }
    const digits = phone.replace(/\D/g, '');
    if (!digits) {
      return null;
    }
    return digits.startsWith('0') ? digits.replace(/^0+/, '') : digits;
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
