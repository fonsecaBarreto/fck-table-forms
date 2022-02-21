"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_municipios_uf = exports.get_ufs_regiao = exports.get_regioes = void 0;
const axios_1 = __importDefault(require("axios"));
const get_regioes = async () => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes`;
    try {
        const { data } = await axios_1.default.get(url);
        return data;
    }
    catch (err) {
        console.log('deu ruin');
    }
    finally {
        console.log("dione");
    }
};
exports.get_regioes = get_regioes;
const get_ufs_regiao = async (regiao) => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiao}/estados`;
    try {
        const { data } = await axios_1.default.get(url);
        return data;
    }
    catch (err) {
        console.log('deu ruin');
    }
    finally {
        console.log("dione");
    }
};
exports.get_ufs_regiao = get_ufs_regiao;
const get_municipios_uf = async (uf) => {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
    try {
        const { data } = await axios_1.default.get(url);
        return data;
    }
    catch (err) {
        console.log('deu ruin');
    }
    finally {
        console.log("dione");
    }
};
exports.get_municipios_uf = get_municipios_uf;
//# sourceMappingURL=ibge-services.js.map