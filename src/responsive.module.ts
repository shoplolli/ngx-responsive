/**
 * @name responsive.module
 * @description Core module in ngx-responsive
 *
 * @author Manu Cutillas
 * @license MIT
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ResponsiveState } from './@core/providers/responsive-state/responsive-state';
import { ResponsiveConfig } from './@core/providers/responsive-config/responsive-config';
import { InjectionToken } from '@angular/core/src/di/injection_token';
import {
    BOOTSTRAP_DIRECTIVES, BROWSER_DIRECTIVES, BROWSER_INFO_RX, IE_INFO_RX,
    CUSTOMSIZES_DIRECTIVES, DEVICES_DIRECTIVES, PIXELRATIO_DIRECTIVES, RESPONSIVE_DIRECTIVE,
    RESPONSIVEWINDOW_DIRECTIVE, USERAGENT_INFO_DIRECTIVE, USERAGENT_INFO_RX, RESPONSIVE_SIZE_INFO_DIRECTIVE,
    RESPONSIVE_SIZE_INFO_RX, DEVICES_INFO_RX
} from './@directives/index';
import { IResponsiveConfig } from './@core';

export const RESPONSIVE_CONFIGURATION = new InjectionToken<IResponsiveConfig>('config');

export function responsiveConfiguration(config: IResponsiveConfig) {
    return new ResponsiveConfig(config);
}
@NgModule({
    declarations:
        [
            BOOTSTRAP_DIRECTIVES,
            BROWSER_DIRECTIVES,
            CUSTOMSIZES_DIRECTIVES,
            DEVICES_DIRECTIVES,
            PIXELRATIO_DIRECTIVES,
            RESPONSIVE_DIRECTIVE,
            RESPONSIVEWINDOW_DIRECTIVE,
            USERAGENT_INFO_DIRECTIVE,
            RESPONSIVE_SIZE_INFO_DIRECTIVE
        ],
    exports:
        [
            BOOTSTRAP_DIRECTIVES,
            BROWSER_DIRECTIVES,
            CUSTOMSIZES_DIRECTIVES,
            DEVICES_DIRECTIVES,
            PIXELRATIO_DIRECTIVES,
            RESPONSIVE_DIRECTIVE,
            RESPONSIVEWINDOW_DIRECTIVE,
            USERAGENT_INFO_DIRECTIVE,
            RESPONSIVE_SIZE_INFO_DIRECTIVE
        ],
    providers:
        [
            ResponsiveState,
            ResponsiveConfig,
            RESPONSIVE_SIZE_INFO_RX,
            USERAGENT_INFO_RX,
            BROWSER_INFO_RX,
            IE_INFO_RX,
            DEVICES_INFO_RX
        ]
})
export class ResponsiveModule {
    public static forRoot(config: IResponsiveConfig = null): ModuleWithProviders {
        let _config = {
            breakPoints: {
                xs: { max: 767 },
                sm: { min: 768, max: 991 },
                md: { min: 992, max: 1199 },
                lg: { min: 1200, max: 1599 },
                xl: { min: 1600 }
            },
            debounceTime: 100
        };
        if (!!config) {
            _config = config;
        }
        return {
            ngModule: ResponsiveModule,
            providers: [{
                provide: RESPONSIVE_CONFIGURATION,
                useValue: _config
            },
            {
                provide: ResponsiveConfig,
                useFactory: responsiveConfiguration
            }]
        };
    }
}
