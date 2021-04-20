import { Format, BPFPositions, APFPositions } from "interfaces/Room";

export const createPositions = (format: string): any => {
  switch (format) {
    case Format.BPF:
      const BPFPositions: BPFPositions = {
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

      return BPFPositions;
    case Format.APF:
      const APFPositions: APFPositions = {
        Government: {
          "Prime Minister": null,
          Member: null,
        },
        Opposition: {
          Leader: null,
          Member: null,
        },
      };

      return APFPositions;
    default:
      return null;
  }
};
