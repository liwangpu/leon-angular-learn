import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Compiler, COMPILER_OPTIONS, CompilerFactory } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { JitCompilerFactory } from '@angular/compiler';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

export function createJitCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}


// export function createJitCompiler() {
//     return new JitCompilerFactory().createCompiler([{
//         useJit: true
//     }]);
// }

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [
        { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
        { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
        { provide: Compiler, useFactory: createJitCompiler, deps: [CompilerFactory] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
