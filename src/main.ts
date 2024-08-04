import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CardModule } from 'primeng/card';
import { AnimateModule } from 'primeng/animate';
import { TreeTableModule } from 'primeng/treetable';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeModule } from 'primeng/tree';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TimelineModule } from 'primeng/timeline';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TerminalModule } from 'primeng/terminal';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { StepsModule } from 'primeng/steps';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { SpinnerModule } from 'primeng/spinner';
import { SpeedDialModule } from 'primeng/speeddial';
import { SliderModule } from 'primeng/slider';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SkeletonModule } from 'primeng/skeleton';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollerModule } from 'primeng/scroller';
import { SidebarModule } from 'primeng/sidebar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PickListModule } from 'primeng/picklist';
import { PasswordModule } from 'primeng/password';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ListboxModule } from 'primeng/listbox';
import { KnobModule } from 'primeng/knob';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { InplaceModule } from 'primeng/inplace';
import { GalleriaModule } from 'primeng/galleria';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { EditorModule } from 'primeng/editor';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropModule } from 'primeng/dragdrop';
import { DockModule } from 'primeng/dock';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CarouselModule } from 'primeng/carousel';
import { CalendarModule } from 'primeng/calendar';
import { BlockUIModule } from 'primeng/blockui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BadgeModule } from 'primeng/badge';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AccordionModule } from 'primeng/accordion';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';
import {
  HttpClient,
  withInterceptorsFromDi,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import {
  provideClientHydration,
  BrowserModule,
  bootstrapApplication,
} from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


import { authInterceptor } from '@app/Interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
    providers: [
        JwtHelperService, // הוסף את JwtHelperService כ-Provider
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
       
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      TranslateModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      SocialLoginModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSlideToggleModule,
      MatCardModule,
      MatDialogModule,
      MatToolbarModule,
      MatSortModule,
      MatPaginatorModule,
      MatTableModule,
      InputTextModule,
      ButtonModule,
      ToastModule,
      MatProgressSpinnerModule,
      ProgressBarModule,
      TagModule,
      AvatarModule,
      AvatarGroupModule,
      AccordionModule,
      AutoCompleteModule,
      BadgeModule,
      BreadcrumbModule,
      BlockUIModule,
      CalendarModule,
      CarouselModule,
      CascadeSelectModule,
      ChartModule,
      CheckboxModule,
      ChipsModule,
      ChipModule,
      ColorPickerModule,
      ConfirmDialogModule,
      ConfirmPopupModule,
      ContextMenuModule,
      VirtualScrollerModule,
      DataViewModule,
      DialogModule,
      DividerModule,
      DockModule,
      DragDropModule,
      DropdownModule,
      DynamicDialogModule,
      EditorModule,
      FieldsetModule,
      FileUploadModule,
      GalleriaModule,
      InplaceModule,
      InputMaskModule,
      InputSwitchModule,
      InputTextareaModule,
      InputNumberModule,
      ImageModule,
      KnobModule,
      ListboxModule,
      MegaMenuModule,
      MenuModule,
      MenubarModule,
      MessageModule,
      MessagesModule,
      MultiSelectModule,
      OrganizationChartModule,
      OrderListModule,
      OverlayPanelModule,
      PaginatorModule,
      PanelModule,
      PanelMenuModule,
      PasswordModule,
      PickListModule,
      ProgressSpinnerModule,
      RadioButtonModule,
      RatingModule,
      SelectButtonModule,
      SidebarModule,
      ScrollerModule,
      ScrollPanelModule,
      ScrollTopModule,
      SkeletonModule,
      SlideMenuModule,
      SliderModule,
      SpeedDialModule,
      SpinnerModule,
      SplitterModule,
      SplitButtonModule,
      StepsModule,
      TableModule,
      TabMenuModule,
      TabViewModule,
      TerminalModule,
      TieredMenuModule,
      TimelineModule,
      ToggleButtonModule,
      ToolbarModule,
      TooltipModule,
      TriStateCheckboxModule,
      TreeModule,
      TreeSelectModule,
      TreeTableModule,
      AnimateModule,
      CardModule,
      MatDatepickerModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSlideToggleModule,
      MatCardModule,
      MatDialogModule,
      AppRoutingModule,
      FormsModule,
      MatToolbarModule,
      MatSortModule,
      MatPaginatorModule,
      MatTableModule,
      InputTextModule,
      ButtonModule,
      CalendarModule,
      FormsModule,
      AutoCompleteModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      MatAutocompleteModule,
      DropdownModule,
      CardModule,
      MatDatepickerModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSlideToggleModule,
      MatCardModule,
      MatDialogModule,
      AppRoutingModule,
      FormsModule,
      MatToolbarModule,
      MatSortModule,
      MatPaginatorModule,
      MatTableModule,
      InputTextModule,
      ButtonModule,
      CalendarModule,
      FormsModule,
      AutoCompleteModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelectModule,
      MatAutocompleteModule,
      DropdownModule
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              ' 592574124687-bvpc5dmgfms66j1q6725fi5gevmsmtmf.apps.googleusercontent.com'
            ),
          },
        ],
        callback: 'initGoogleOneTap',
        onError: (err: any) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
