/* Menu */
declare namespace Menu {\n\n}\n\n/* FileType */
declare namespace File {
  type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon";\n\n  type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}\n\n/* Vite */
declare type Recordable = Record;\n\ndeclare \n\ninterface ImportMetaEnv extends ViteEnv {
  __: unknown;
}\n\n/* __APP_INFO__ */
declare const __APP_INFO__;
  lastBuildTime;
};

