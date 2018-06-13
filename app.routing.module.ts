import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';


const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        canLoad: [AuthGuard],
        loadChildren: 'app/home/home.module#HomeModule'
    },
    {
        path: 'agency',
        loadChildren: 'app/agency/agency.module#AgencyModule'
    },
    {
        path: 'accounts-payable',
        loadChildren: 'app/accounts-payable/accounts-payable.module#AccountsPayableModule'
    },
    {
        path: 'billing-admin',
        canLoad: [AuthGuard],
        loadChildren: 'app/billing-administration/billing-admin.module#BillingAdminModule'
    },
    {
        path: 'utility-menu',
        canLoad: [AuthGuard],
        loadChildren: 'app/utility-menu/utility-menu.module#UtilityMenuModule'
    },
    {
        path: 'task-manager',
        canLoad: [AuthGuard],
        loadChildren: 'app/task-manager/task-manager.module#TaskManagerModule'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
