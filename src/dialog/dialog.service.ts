import {
    Injectable,
    ViewContainerRef,
    ComponentFactoryResolver,
    Injector,
    Type,
    Provider,
    ReflectiveInjector,
    ComponentRef
} from '@angular/core';
import { Deferred } from '../utils/deferred';

export class SelfCloseableDialog {
    close(data?: any): void { }
}

@Injectable()
export class DialogService {
    private currentDialogComponentRef: ComponentRef<{}>;
    private currentDialogCloseDeferred: Deferred<{}>;

    private viewContainerRef: ViewContainerRef;

    constructor(private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) { }

    public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        if (this.viewContainerRef) throw new Error('viewContainerRef already set');
        this.viewContainerRef = viewContainerRef;
    }

    public open(component: Type<{}>, providers: Provider[] = []): Promise<any> {
        if (!this.viewContainerRef) throw new Error('no viewContainerRef set');
        if (this.currentDialogComponentRef) this.close();

        // create a component factory that creates components of the specified type
        let factory = this.componentFactoryResolver.resolveComponentFactory(component);

        // create an injector based on the default injector with added providers (to pass dialog data to the component factory)
        let injector = ReflectiveInjector.resolveAndCreate(providers, this.injector);

        // create the actual component
        // there is only one dialog at a time so index within the viewContainer is '0'
        this.currentDialogComponentRef = this.viewContainerRef.createComponent(factory, 0, injector);

        let componentInstance: any = this.currentDialogComponentRef.instance;

        // put the close function on the component instance if it can close itself (the dialog could also just use this service)
        // wrap in arrow function to not fuck up the 'this' reference
        if (componentInstance instanceof SelfCloseableDialog) { componentInstance.close = (closeData: any) => { this.close(closeData); }; }

        this.currentDialogCloseDeferred = new Deferred<{}>();
        return this.currentDialogCloseDeferred.promise;
    }

    public close(closeData?: any): void {
        if (this.currentDialogComponentRef) {
            // delete from dom
            this.viewContainerRef.detach(0);
            // onDestroy()
            this.currentDialogComponentRef.destroy();

            //resolve the closePromise
            this.currentDialogCloseDeferred.resolve(closeData);
            // help the gc a bit
            this.currentDialogComponentRef = null;
        }
    }
}