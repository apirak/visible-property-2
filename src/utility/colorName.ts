interface AllColorName {
  [index: string]: string;
}

const allColorNames: AllColorName = {
  "#0050f0": "primary / confident_blue",
  "#ffffff": "primary / honest_white",
  "#002d63": "primary / trusted_navy",
  "#f68b1f": "primary / refreshing_orange",
  "#65b2e8": "secondary / sky_blue_100",
  "#93c9ee": "secondary / sky_blue_70",
  "#c1e0f6": "secondary / sky_blue_40",
  "#eff7fc": "secondary / sky_blue_10",
  "#f15a22": "secondary / dark_orange_100",
  "#f58b64": "secondary / dark_orange_70",
  "#f9bda7": "secondary / dark_orange_40",
  "#fdeee8": "secondary / dark_orange_10",
  "#000000": "secondary / black",
  "#5b6a83": "secondary / grey_100",
  "#7d8999": "secondary / grey_70",
  "#b0bccb": "secondary / grey_50",
  "#dfe6ec": "secondary / grey_20",
  "#f5f6f7": "secondary / grey_10",
  "#da2110": "utility / red_error_100",
  "#e56357": "utility / red_error_70",
  "#f0a69f": "utility / red_error_40",
  "#fbe8e7": "utility / red_error_10",
  "#1eb950": "utility / green_success_100",
  "#61ce84": "utility / green_success_70",
  "#a5e3b9": "utility / green_success_40",
  "#e8f8ed": "utility / green_success_10",
  "#feae00": "utility / yellow_warning_100",
  "#fec64c": "utility / yellow_warning_70",
  "#ffdf99": "utility / yellow_warning_40",
  "#fef6e5": "utility / yellow_warning_10",
  "#ff917e": "tertiary / peach_100",
  "#ffb2a4": "tertiary / peach_70",
  "#ffd3cb": "tertiary / peach_40",
  "#fff4f2": "tertiary / peach_10",
  "#ea93d8": "tertiary / pink_100",
  "#f0b3e3": "tertiary / pink_70",
  "#f7d4ef": "tertiary / pink_40",
  "#fcf4fb": "tertiary / pink_10",
  "#fec800": "tertiary / light_yellow_100",
  "#fed84c": "tertiary / light_yellow_70",
  "#ffe999": "tertiary / light_yellow_40",
  "#fef9e5": "tertiary / light_yellow_10",
  "#ff8b33": "tertiary / orange_100",
  "#ffad70": "tertiary / orange_70",
  "#ffd1ad": "tertiary / orange_40",
  "#fff3ea": "tertiary / orange_10",
  "#a7e6c3": "tertiary / light_green_100",
  "#c1edd5": "tertiary / light_green_70",
  "#dcf5e7": "tertiary / light_green_40",
  "#f6fcf9": "tertiary / light_green_10",
  "#3dbcbe": "tertiary / turquoise_100",
  "#77d0d1": "tertiary / turquoise_70",
  "#b1e4e5": "tertiary / turquoise_40",
  "#ebf8f8": "tertiary / turquoise_10",
  "#0ac0eb": "tertiary / blue_100",
  "#53d2f1": "tertiary / blue_70",
  "#9de6f7": "tertiary / blue_40",
  "#e6f8fd": "tertiary / blue_10",
  "#8c522a": "tertiary / brown_100",
  "#ae8569": "tertiary / brown_70",
  "#d1baaa": "tertiary / brown_40",
  "#f3ede9": "tertiary / brown_10",
  "#ff1111": "tertiary / red_100",
  "#65b2e8 30%": "custom / secondary_sky_blue_100_opacity_30",
  "#d5710c": "custom / primary_refreshing_orange_shade_opacity_10",
  "#002d63 50%": "custom / primary_trusted_navy_opacity_50",
  "#002d63 20%": "custom / primary_trusted_navy_opacity_20",
  "#ffffff 1%": "custom / primary_honest_white_opacity_1",
  "linear-gradient( 90deg, #f5f6f7 0%, rgba(223, 230, 236, 0.6) 49.83%, #f5f6f7 100% )":
    "custom / linear_skeleton",
  "linear-gradient( 90deg, #dfe6ec 0%, #f1f6f9 50.52%, #dfe6ec 100% );":
    "custom / clickable",
};

const colorName = (colorHEX: string): string => {
  const name = allColorNames[colorHEX];
  return name ? name : "Not match";
};

export { colorName };
