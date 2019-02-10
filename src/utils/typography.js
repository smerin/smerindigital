import Typography from "typography";
import altonTheme from "typography-theme-alton";

// Wordpress2016.overrideThemeStyles = () => {
//   return {
//     "a.gatsby-resp-image-link": {
//       boxShadow: `none`,
//     },
//   }
// }

altonTheme.baseFontSize = "18px";
altonTheme.baseLineHeight = 1.5;

const typography = new Typography(altonTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
