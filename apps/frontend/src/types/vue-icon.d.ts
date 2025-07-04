declare module '@jamescoyle/vue-icon' {
  import { DefineComponent } from 'vue';

  interface SvgIconProps {
    type?: string;
    path?: string;
    size?: string | number;
    color?: string;
    viewBox?: string;
    class?: string;
  }

  const SvgIcon: DefineComponent<SvgIconProps>;
  export default SvgIcon;
}
