import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { LlmComponent } from './llm/llm.component';
import { EnvironmentVariablesComponent } from './environment-variables/environment-variables.component';
import { BillingComponent } from './billing/billing.component';
import { AddNewAgentComponent } from './home/add-new-agent/add-new-agent.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { AddLlmComponent } from './llm/add-llm/add-llm.component';
import { SettingsComponent } from './settings/settings.component';
import { BuildTemplateComponent } from './templates/build-template/build-template.component';
import { DeployTemplateComponent } from './templates/deploy-template/deploy-template.component';
import { TemplatesComponent } from './templates/templates.component';
import { ToolsComponent } from './tools/tools.component';
import { UsageComponent } from './usage/usage.component';
import { DashboardComponent } from './dashboard.component';
import { EditLlmComponent } from './llm/edit-llm/edit-llm.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'llm', component: LlmComponent },
      { path: 'add-new-llm', component: AddLlmComponent },
      { path: 'tools', component: ToolsComponent },
      { path: 'usage', component: UsageComponent },
      {
        path: 'environment-variables',
        component: EnvironmentVariablesComponent,
      },
      { path: 'templates', component: TemplatesComponent },
      { path: 'build-template', component: BuildTemplateComponent },
      { path: 'deploy-template', component: DeployTemplateComponent },
      { path: 'add-new-agent', component: AddNewAgentComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'settings', component: SettingsComponent },

      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'edit-llm', component: EditLlmComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
