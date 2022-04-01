import { toHex } from 'figx';

interface AllColorName {
  [index: string]: string;
}

const allColorNames:AllColorName = {
  "#0050f0ff": "01-primary / 01_confident_blue",
  "#ffffffff": "01-primary / 03 honest white",
  "#002d63ff": "01-primary / 04 trusted navy",
  "#f68b1fff": "01-primary / refreshing orange",
  "#65b2e8ff": "02-secondary / 01_sky_blue_01_100",
  "#93c9eeff": "02-secondary / 01_sky_blue_02_70",
  "#c1e0f6ff": "02-secondary / 01_sky_blue_03_40",
  "#eff7fcff": "02-secondary / 01_sky_blue_04_10",
  "#f15a22ff": "02-secondary / 02_dark_orange_01_100",
  "#f58b64ff": "02-secondary / 02_dark_orange_02_70",
  "#f9bda7ff": "02-secondary / 02_dark_orange_03_40",
  "#fdeee8ff": "02-secondary / 02_dark_orange_04_10",
  "#000000ff": "02-secondary / 03_black",
  "#5b6a83ff": "02-secondary / 04_grey_01_100",
  "#7d8999ff": "02-secondary / 04_grey_02_70",
  "#b0bccbff": "02-secondary / 04_grey_03_50",
  "#dfe6ecff": "02-secondary / 04_grey_04_20",
  "#f5f6f7ff": "02-secondary / 04_grey_05_10",
  "#da2110ff": "03-utility / 01_red_error_01_100",
  "#e56357ff": "03-utility / 01_red_error_02_70",
  "#f0a69fff": "03-utility / 01_red_error_03_40",
  "#fbe8e7ff": "03-utility / 01_red_error_04_10",
  "#1eb950ff": "03-utility / 02_green_success_01_100",
  "#61ce84ff": "03-utility / 02_green_success_02_70",
  "#a5e3b9ff": "03-utility / 02_green_success_03_40",
  "#e8f8edff": "03-utility / 02_green_success_04_10",
  "#feae00ff": "03-utility / 03_yellow_warning_01_100",
  "#fec64cff": "03-utility / 03_yellow_warning_02_70",
  "#ffdf99ff": "03-utility / 03_yellow_warning_03_40",
  "#fef6e5ff": "03-utility / 03_yellow_warning_04_10",
  "#ff917eff": "04-tertiary / 04_peach_01_100",
  "#ffb2a4ff": "04-tertiary / 04_peach_02_70",
  "#ffd3cbff": "04-tertiary / 04_peach_03_40",
  "#fff4f2ff": "04-tertiary / 04_peach_04_10",
  "#ea93d8ff": "04-tertiary / 05_pink_01_100",
  "#f0b3e3ff": "04-tertiary / 05_pink_02_70",
  "#f7d4efff": "04-tertiary / 05_pink_03_40",
  "#fcf4fbff": "04-tertiary / 05_pink_04_10",
  "#fec800ff": "04-tertiary / 06_light_yellow_01_100",
  "#fed84cff": "04-tertiary / 06_light_yellow_02_70",
  "#ffe999ff": "04-tertiary / 06_light_yellow_03_40",
  "#fef9e5ff": "04-tertiary / 06_light_yellow_04_10",
  "#ff8b33ff": "04-tertiary / 07_orange_01_100",
  "#ffad70ff": "04-tertiary / 07_orange_02_70",
  "#ffd1adff": "04-tertiary / 07_orange_03_4",
  "#fff3eaff": "04-tertiary / 07_orange_04_10",
  "#a7e6c3ff": "04-tertiary / 08_light_green_01_100",
  "#c1edd5ff": "04-tertiary / 08_light_green_02_70",
  "#dcf5e7ff": "04-tertiary / 08_light_green_03_40",
  "#f6fcf9ff": "04-tertiary / 08_light_green_04_10",
  "#3dbcbeff": "04-tertiary / 09_turquoise_01_100",
  "#77d0d1ff": "04-tertiary / 09_turquoise_02_70",
  "#b1e4e5ff": "04-tertiary / 09_turquoise_03_40",
  "#ebf8f8ff": "04-tertiary / 09_turquoise_04_10",
  "#0ac0ebff": "04-tertiary / 10_blue_01_100",
  "#53d2f1ff": "04-tertiary / 10_blue_02_70",
  "#9de6f7ff": "04-tertiary / 10_blue_03_40",
  "#e6f8fdff": "04-tertiary / 10_blue_04_10",
  "#8c522aff": "04-tertiary / 11_brown_01_100",
  "#ae8569ff": "04-tertiary / 11_brown_02_70",
  "#d1baaaff": "04-tertiary / 11_brown_03_40",
  "#f3ede9ff": "04-tertiary / 11_brown_04_10"
}

const colorName = (colorHEX:string):string => {
  const name = allColorNames[colorHEX.toLowerCase()+"ff"];
  return name ? name : "Not match";
}

export { colorName };