"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const ibge_services_1 = require("./ibge-services");
const App = async () => {
    const regioes = await (0, ibge_services_1.get_regioes)();
    console.log("\n - Regioes: ", regioes);
    console.log("\n > Aqui vou mostrar para as regioes Norte:\n");
    const ufs = await (0, ibge_services_1.get_ufs_regiao)(1);
    console.log("\n - UFS:", ufs);
    const cidades = await (0, ibge_services_1.get_municipios_uf)(22);
    console.log("\n  - Cidades: ", cidades);
};
exports.App = App;
exports.default = exports.App;
//# sourceMappingURL=app.js.map