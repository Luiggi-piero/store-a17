import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core"
import { SpinnerService } from "@shared/services/spinner.service"
import { finalize } from "rxjs";

export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinnerSvc = inject(SpinnerService);

    // cada vez que inicia una peticion muestra loading
    spinnerSvc.show();

    return next(req)
        .pipe(
            // Cuando finaliza la peticion se oculta loading
            finalize(() => spinnerSvc.hide())
        )

}