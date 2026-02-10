type ObjToKeyValUnion = {
  [K in keyof T];
}[keyof T];\n\ntype ObjToKeyValArray = {
  [K in keyof T]];
}[keyof T];\n\ntype ObjToSelectedValueUnion = {
  [K in keyof T]: T[K];
}[keyof T];\n\ntype Optional = Omit & Partial>;\n\ntype GetOptional = {
  [P in keyof T as T[P] extends Required[P] ? never : P]: T[P];
};

