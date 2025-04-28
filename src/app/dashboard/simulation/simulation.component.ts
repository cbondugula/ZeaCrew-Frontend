import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCallService } from '../../services/http-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../services/spinner.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-simulation',
  standalone: false,
  templateUrl: './simulation.component.html',
  styleUrl: './simulation.component.scss'
})
export class SimulationComponent implements OnInit {
  id: any;
  title: any;

  constructor(private route: ActivatedRoute, private httpCall: HttpCallService, private spinner: SpinnerService,
      private snackbar: MatSnackBar) {

  }

  messages:any = [];

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    })
    this.route.queryParams.subscribe((params: any) => {
      this.title = params.title
    })
  }

  prompt: any = '';

  getMessageFromAgent(){
    this.messages.push({role:"user",content: this.prompt});
    const body = {
        "topic": this.prompt
    }
    this.prompt = '';
    this.spinner.show("Loading...");
        this.httpCall.postWithAuth(`${environment.api}/temp/chat-agent/crew-run/${this.id}`, body).subscribe((res:any) => {
          this.spinner.hide();
          this.messages.push({role: "system", content: res['final_report']});
          // if (res['success']) {
          //   console.log(res);
          //   this.messages.push({role: "system", content: res['final_report']})
          // } else {
          //   this.snackbar.open(res?.error ? res.error : "Unknown Error Occured", "Close", {
          //     duration: 3000
          //   })
          // }
        },(err:any) => {
          this.spinner.hide();
          this.snackbar.open(err?.error?.message ? err.error.message : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        })
  }

}
