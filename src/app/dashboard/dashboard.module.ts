import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { LlmComponent } from './llm/llm.component';
import { TemplatesComponent } from './templates/templates.component';
import { DeployTemplateComponent } from './templates/deploy-template/deploy-template.component';
import { SettingsComponent } from './settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routes';
import { EnvironmentVariablesComponent } from './environment-variables/environment-variables.component';
import { BillingComponent } from './billing/billing.component';
import { AddNewAgentComponent } from './home/add-new-agent/add-new-agent.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { AddLlmComponent } from './llm/add-llm/add-llm.component';
import { AddRoleModalComponent } from './settings/add-role-modal/add-role-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BuildTemplateComponent } from './templates/build-template/build-template.component';
import { AddTaskModalComponent } from './templates/deploy-template/add-task-modal/add-task-modal.component';
import { ToolsComponent } from './tools/tools.component';
import { UsageComponent } from './usage/usage.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { EditLlmComponent } from './llm/edit-llm/edit-llm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TemplateEnvComponent } from './templates/template-env/template-env.component';
import { SimulationComponent } from './simulation/simulation.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditAgentComponent } from './home/add-new-agent/edit-agent/edit-agent.component';
import { ZeaCrewInfoComponent } from './home/zea-crew-info/zea-crew-info.component';
import { EditAgentTaskComponent } from './home/edit-agent-task/edit-agent-task.component';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ManagerAgentComponent } from './home/zea-crew-info/manager-agent/manager-agent.component';
import { EditTemplateComponent } from './home/edit-template/edit-template.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    LlmComponent,
    EnvironmentVariablesComponent,
    TemplatesComponent,
    BuildTemplateComponent,
    ToolsComponent,
    BuildTemplateComponent,
    DeployTemplateComponent,
    AddTaskModalComponent,
    AddNewAgentComponent,
    TasksComponent,
    BillingComponent,
    SettingsComponent,
    AddRoleModalComponent,
    AddLlmComponent,
    UsageComponent,
    EditLlmComponent,
    TemplateEnvComponent,
    SimulationComponent,
    EditAgentComponent,
    ZeaCrewInfoComponent,
    EditAgentTaskComponent,
    ManagerAgentComponent,
    EditTemplateComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MarkdownModule,
    MatDialogActions, 
    MatDialogClose,
    TooltipModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
