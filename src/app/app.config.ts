import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorResponseInterceptor } from '@shared/interceptors/error-response.interceptor';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // para toastr
    provideAnimations(),
    provideToastr({ timeOut: 900, preventDuplicates: true }),

    provideRouter(
      routes,
      withComponentInputBinding() // para capturar los cambios de la ruta por un input signal
    ),
    provideHttpClient(
      withFetch(), // para hacer peticiones
      withInterceptors([ErrorResponseInterceptor, SpinnerInterceptor]) // llamar interceptores
    )
  ]
};
