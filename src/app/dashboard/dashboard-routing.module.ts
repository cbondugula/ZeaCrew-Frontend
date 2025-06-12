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
import { IntegrationsComponent } from './integrations/integrations.component';
import { TemplateEnvComponent } from './templates/template-env/template-env.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ZeaCrewInfoComponent } from './home/zea-crew-info/zea-crew-info.component';
import { NewDemoComponent } from './home/new-demo/new-demo.component';
import { NewDefaultTemplatesComponent } from './home/new-default-templates/new-default-templates.component';
import { NewCreatedTemplateComponent } from './home/new-created-template/new-created-template.component';
import { NewLlmComponent } from './llm/new-llm/new-llm.component';
import { NewAddLlmComponent } from './llm/new-add-llm/new-add-llm.component';
import { NewIntegrationComponent } from './integrations/new-integration/new-integration.component';
import { NewToolsComponent } from './tools/new-tools/new-tools.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'new-created-template', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'llm', component: LlmComponent },
      { path: 'add-new-llm', component: AddLlmComponent },
      { path: 'tools', component: ToolsComponent },
      { path: 'usage', component: UsageComponent },
      { path: 'integrations', component: IntegrationsComponent},
      { path: 'environment-variables',component: EnvironmentVariablesComponent},
      { path: 'templates', component: TemplatesComponent },
      { path: 'build-template', component: BuildTemplateComponent },
      { path: 'deploy-template', component: DeployTemplateComponent },
      { path: 'add-new-agent', component: AddNewAgentComponent },
      {path: 'crew-info', component: ZeaCrewInfoComponent},
      { path: 'tasks', component: TasksComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'settings', component: SettingsComponent },
      {path: 'template-env', component: TemplateEnvComponent},
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'chat/:id', component: SimulationComponent},
      { path: 'edit-llm', component: EditLlmComponent },
      {path: 'new-demo', component: NewDemoComponent},
      {path: 'new-default-template', component: NewDefaultTemplatesComponent},
      {path: 'new-created-template', component: NewCreatedTemplateComponent},
      {path: 'new-llm', component: NewLlmComponent},
      {path: 'new-add-llm', component: NewAddLlmComponent},
      {path: 'new-integrations', component: NewIntegrationComponent},
      {path: 'new-tools', component: NewToolsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
