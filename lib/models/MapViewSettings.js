"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MapViewSettings = (function () {
    function MapViewSettings(map, pageArrows, pageDistance) {
        if (map === void 0) { map = true; }
        if (pageArrows === void 0) { pageArrows = true; }
        if (pageDistance === void 0) { pageDistance = false; }
        this.map = map;
        this.pageArrows = pageArrows;
        this.pageDistance = pageDistance;
    }
    return MapViewSettings;
}());
exports.MapViewSettings = MapViewSettings;
//# sourceMappingURL=MapViewSettings.js.map