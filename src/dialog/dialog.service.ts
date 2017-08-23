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

@Injectable()
export class DialogService {
    private currentDialogComponentRef: ComponentRef<{}>;

    private viewContainerRef: ViewContainerRef;

    constructor(private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) { }

    public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
        if (this.viewContainerRef) throw new Error('viewContainerRef for dialogs already set');
        this.viewContainerRef = viewContainerRef;
    }

    public open(component: Type<{}>, providers: Provider[] = []) {
        if (this.currentDialogComponentRef) this.close();
        // create a component factory that create components of the specified type
        let factory = this.componentFactoryResolver.resolveComponentFactory(component);
        // create an injector based on the default injector with added providers (to pass dialog data to the component factory)
        let injector = ReflectiveInjector.resolveAndCreate(providers, this.injector);
        // create the actual component
        // there is only one dialog at a time so index is '0'
        this.currentDialogComponentRef = this.viewContainerRef.createComponent(factory, 0, injector);
    }

    public close(): void {
        // delete from dom
        this.viewContainerRef.detach(0);
        // onDestroy()
        this.currentDialogComponentRef.destroy();
        // help the gc a bit
        this.currentDialogComponentRef = null;
    }



}