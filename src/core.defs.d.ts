/**
 * WARNING: GENERATED FILE
 *
 * this file lives here:
 * https://github.com/swipejobs/fe-service-desktop-core/blob/develop/core/core.defs.d.ts
 *
 * When you run `make update` from core. You get the latest copy of this file.
 */

import type { AppProps } from 'single-spa';
import type { i18n } from 'i18next';
import type { Theme, ThemeOptions } from '@material-ui/core/styles';
import type { Mixins } from '@material-ui/core/styles/createMixins';
import type { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Palette } from '@material-ui/core/styles/createPalette';

declare namespace Core {
  //
  // Config Props
  // ----------------------------------------------------------------------
  enum ConfigType {
    Config = 'config',
    Flags = 'flags',
    Lang = 'lang',
  }

  enum Environment {
    Dev = 'dev',
    PreProd = 'preprod',
    Prod = 'prod',
  }

  enum Partner {
    sj = 'sj',
  }

  /**
   * We currently only do EN
   */
  enum Language {
    English = 'en',
  }

  interface Endpoint {
    [key: string]: {
      name: string;
      path: string;
    };
  }

  interface Service {
    [key: string]: {
      name: string;
      path: string;
      endpoints: Endpoint;
    };
  }

  interface MicroServices {
    host: string;
    services: Service;
  }

  /**
   * Meta
   * This is included in all configs
   */
  interface Meta {
    app: string;
    environment: Environment;
    partnerId: Partner;
    type: ConfigType;
  }

  interface LangMeta extends Meta {
    language: Language;
  }

  /**
   * Config API Interface
   */
  interface DefaultConfigData {
    microServices: MicroServices;
  }

  interface ConfigInterface<T> {
    meta: Meta;
    data: T;
  }

  /**
   * Flags API Interface
   */
  interface FlagInterface<T> {
    meta: Meta;
    data: T;
  }

  /**
   * Language API Interface
   */
  interface LangInterface<T> {
    meta: LangMeta;
    data: T;
  }

  //
  // Single SPA
  // ----------------------------------------------------------------------

  /**
   * Single-Spa App Props
   */
  interface SingleSpaProps {
    navigateToUrl(url: string): void;
    triggerAppChange: unknown;
  }

  interface CustomThemeMixins extends Mixins {
    unstyledButton: CSSProperties;
    inlineErrorMessage: CSSProperties;
    appTitle: CSSProperties;
    appContainer: CSSProperties;
    tableAlternateRows: CSSProperties;
    tableErrorRow: CSSProperties;
    appHeader: CSSProperties;
    link: CSSProperties;
  }

  export interface CustomThemePalette extends Palette {
    inactive: string;
  }

  // @todo move to shared module
  // @todo add status variables for status chips
  export interface CustomThemeOptions extends ThemeOptions {
    mixins: CustomThemeMixins;
    palette: CustomThemePalette;
  }

  export interface CustomTheme extends Theme {
    mixins: CustomThemeMixins;
    palette: CustomThemePalette;
  }

  /**
   * Default Core Single-Spa app props
   * All apps get these props from core.
   */
  interface DefaultCoreProps extends AppProps {
    name: string;
    singleSpa: SingleSpaProps;
    muiTheme: CustomThemeOptions;
    i18next: i18n;
  }

  /**
   * Core Single-Spa app props
   * All apps get these props from core.
   * Configs are included
   *
   * usage:
   *   React.FC<CoreProps<ConfigData, FlagsData, LangData>>
   */
  interface CoreProps<C, F, L> extends DefaultCoreProps {
    configs: {
      isLoading: boolean;
      config: ConfigInterface<C>;
      flags: FlagInterface<F>;
      lang: LangInterface<L>;
    };
  }
}
export = Core;
export as namespace Core;

//
// Custom Events
// ----------------------------------------------------------------------

/**
 * @deprecated only sjpp - to use BranchItemSelectionEvent
 */
interface BranchSelectionEvent {
  readonly detail: {
    meta: {
      app: string;
      name: string;
    };
    data: Set<string>;
  };
}

type BranchUnitType = 'organisation' | 'branch' | 'none';

interface BranchItem {
  type: BranchUnitType;
  sjpp: string;
  id: string;
}

interface BranchItemSelectionEvent {
  readonly detail: {
    meta: {
      app: string;
      name: string;
    };
    data: Map<string, BranchItem>;
  };
}

/**
 * @deprecated only sjpp - to use BranchItemSelectionEventInit
 */
interface BranchSelectionEventInit {
  readonly detail: {
    meta: {
      app: string;
      name: string;
    };
    data: Set<string>;
  };
}

interface BranchItemSelectionEventInit {
  readonly detail: {
    meta: {
      app: string;
      name: string;
    };
    data: Map<string, BranchItem>;
  };
}

interface LogoutUserEvent {
  readonly detail: {
    meta: {
      app: string;
      name: string;
    };
    data: object;
  };
}

interface LoginUserEvent {
  readonly detail: {
    meta: {
      app: string;
      name: string;
    };
    data: object;
  };
}

/**
 * @deprecated only sjpp - to use BranchItemSelectionEvent
 */
// eslint-disable-next-line no-redeclare
export interface BranchSelectionEvent {
  prototype: BranchSelectionEvent;
  new (
    type: 'SD/navigation:branch-selection',
    eventInitDict?: BranchSelectionEventInit,
  ): BranchSelectionEvent;
}

// eslint-disable-next-line no-redeclare
export interface BranchItemSelectionEvent {
  prototype: BranchItemSelectionEvent;
  new (
    type: 'SD/navigation:branch-selection-items',
    eventInitDict?: BranchItemSelectionEventInit,
  ): BranchItemSelectionEvent;
}

interface ServiceDesktopWindowEventMap extends WindowEventHandlersEventMap {
  /**
   * @deprecated only sjpp - to use "SD/navigation:branch-selection-item
   */
  'SD/navigation:branch-selection': BranchSelectionEvent;
  /**
   * @deprecated only sjpp - to use "SD/navigation:branch-selection-item-close
   */
  'SD/navigation:branch-selection-close': BranchSelectionEvent;
  'SD/navigation:branch-selection-item': BranchItemSelectionEvent;
  'SD/navigation:branch-selection-item-close': BranchItemSelectionEvent;
  'SD/core:logout-user': LogoutUserEvent;
  'SD/core:login-user': LoginUserEvent;
}

declare global {
  interface Window {
    addEventListener<K extends keyof ServiceDesktopWindowEventMap>(
      type: K,
      listener: (this: Window, ev: ServiceDesktopWindowEventMap[K]) => any,
    ): void;
    moduleMap: Record<string, string>;
    applicationInfo: {
      partnerId: string;
      environment: string;
    };
  }
}
