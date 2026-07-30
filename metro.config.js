const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// قصر المراقبة على المجلد الحالي فقط
config.watchFolders = [__dirname];

// التأكد من أن المسارات لا تحاول الوصول للمجلد الرئيسي
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];

module.exports = config;
