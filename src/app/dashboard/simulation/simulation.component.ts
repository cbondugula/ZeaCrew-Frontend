import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCallService } from '../../services/http-call.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../services/spinner.service';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';

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
      private snackbar: MatSnackBar,private location:Location) {
        this.httpCall.connect();
  }

  messages:any = [];
  status:any;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    })
    this.route.queryParams.subscribe((params: any) => {
      this.title = params.title
    })
    this.httpCall.getMessage('status').subscribe((item:any)=> {
      this.status = item;
    })
    this.httpCall.getMessage('final_result').subscribe((item:any)=> {
      console.log(item);
      this.status = item;
    })
  }

  prompt: any = '';
  isLoading:boolean = false;

  getMessageFromAgent(){
    this.messages.push({role:"user",content: this.prompt});
    const body = {
        "topic": this.prompt,
        "sid": localStorage.getItem("sid")
    }
    this.prompt = '';
    this.isLoading = true;
        this.httpCall.postWithAuth(`${environment.api}/temp/chat-agent/crew-run/${this.id}`, body).subscribe((res:any) => {
          this.isLoading = false;
          if(res['success']) {
            this.messages.push({role: "system", content: res['final_report']});
          }else{
            this.snackbar.open(res['message'], "Close", {
              duration: 3000
            })
          }
        },(err:any) => {
          this.isLoading = false;
          this.snackbar.open(err?.error?.message ? err.error.message : "Unknown Error Occured", "Close", {
            duration: 3000
          })
        })
  }

  navigateBack() {
    this.location.back();
  }

}
