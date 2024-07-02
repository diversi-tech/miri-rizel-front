import { GoogleAuthService } from './../../Services/google-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task-exempl',
  templateUrl: './add-task-exempl.component.html',
  styleUrls: ['./add-task-exempl.component.css']
})
export class AddTaskExemplComponent implements OnInit {
  addForm: FormGroup;

  constructor(private fb: FormBuilder, private GoogleAuthService: GoogleAuthService) {
    this.addForm = this.fb.group({
      email: [''],
      task: [''],
      date: ['']
    });
  }

  ngOnInit() {
    this.GoogleAuthService.initClient();
  }

  add() {
    const formData = this.addForm.value;
    const event = {
      summary: formData.task,
      start: {
        dateTime: new Date(formData.date).toISOString(),
        timeZone: 'UTC'
      },
      end: {
        dateTime: new Date(new Date(formData.date).getTime() + 3600000).toISOString(), // Assuming 1 hour duration
        timeZone: 'UTC'
      },
      attendees: [{ email: formData.email }]
    };

    this.GoogleAuthService.addEvent(event).subscribe(
      (response) => {
        console.log('Event added to Google Calendar:', response);
      },
      (error) => {
        console.error('Error adding event to Google Calendar:', error);
      }
    );
  }
}
