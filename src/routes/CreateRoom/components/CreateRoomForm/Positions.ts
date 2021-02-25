import { Format, BPFPositions } from "interfaces/Room";

export const createPositions = (format: string): any => {
  switch (format) {
    case Format.BPF:
      const positions: BPFPositions = {
        "Opening Government": {
          "Prime Minister": null,
          "Deputy Prime Minister": null,
        },
        "Opening Opposition": {
          "Leader of Opposition": null,
          "Deputy Prime Minister": null,
        },
        "Closing Government": {
          "Government Member": null,
          "Government Whip": null,
        },
        "Closing Opposition": {
          "Opposition Member": null,
          "Opposition Whip": null,
        },
      };

      return positions;
    default:
      return null;
  }
};
