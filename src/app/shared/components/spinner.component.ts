import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { SpinnerService } from "@shared/services/spinner.service";

@Component({
    selector: 'app-spinner',
    standalone: true,
    imports: [CommonModule],
    template: `
    @if (isLoading()) {
        <h1 class="text-center"><strong>Cargando...</strong></h1>
    }
    `
})
export default class SpinnerComponent {
    private readonly _spinnerSvc = inject(SpinnerService);
    isLoading = this._spinnerSvc.isLoading;
}