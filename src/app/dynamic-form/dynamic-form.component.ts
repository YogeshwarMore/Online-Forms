import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {

  formFields: { type: string, name: string, label: string, options?: { label: string, value: string }[] }[] = [];

  ngOnInit(): void {}

  addField(type: string): void {
    const name = type + '_' + this.formFields.length;
    let label = '';
    let options;
    switch (type) {
      case 'text':
        label = 'Text Field';
        break;
      case 'radio':
        label = 'Radio Button';
        options = [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ];
        break;
        case 'checkbox':
        label = 'Checkbox';
        options = [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ];
        break;
    }
    this.formFields.push({ type, name, label, options });
  }

  onSubmit(): void {
    console.log('Form submitted', this.formFields);
  }

}
