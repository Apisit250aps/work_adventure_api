"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const app_config_1 = require("./configs/app.config");
const db_config_1 = __importDefault(require("./configs/db.config"));
app_1.default.listen(app_config_1.port, () => {
    (0, db_config_1.default)();
    console.log(`Server listen on http://localhost:${app_config_1.port}/`);
});
//# sourceMappingURL=index.js.map