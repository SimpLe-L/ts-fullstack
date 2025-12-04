import * as drizzle_orm_pg_core6 from "drizzle-orm/pg-core";
import * as drizzle_zod0 from "drizzle-zod";
import { z } from "zod";

//#region src/schema/user.schema.d.ts
declare const user: drizzle_orm_pg_core6.PgTableWithColumns<{
  name: "user";
  schema: undefined;
  columns: {
    createAt: drizzle_orm_pg_core6.PgColumn<{
      name: "createAt";
      tableName: "user";
      dataType: "date";
      columnType: "PgTimestamp";
      data: Date;
      driverParam: string;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    updateAt: drizzle_orm_pg_core6.PgColumn<{
      name: "updateAt";
      tableName: "user";
      dataType: "date";
      columnType: "PgTimestamp";
      data: Date;
      driverParam: string;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    id: drizzle_orm_pg_core6.PgColumn<{
      name: "id";
      tableName: "user";
      dataType: "number";
      columnType: "PgSerial";
      data: number;
      driverParam: number;
      notNull: true;
      hasDefault: true;
      isPrimaryKey: true;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: undefined;
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {}>;
    name: drizzle_orm_pg_core6.PgColumn<{
      name: "name";
      tableName: "user";
      dataType: "string";
      columnType: "PgVarchar";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: 256;
    }>;
    email: drizzle_orm_pg_core6.PgColumn<{
      name: "email";
      tableName: "user";
      dataType: "string";
      columnType: "PgVarchar";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: 256;
    }>;
    password: drizzle_orm_pg_core6.PgColumn<{
      name: "password";
      tableName: "user";
      dataType: "string";
      columnType: "PgVarchar";
      data: string;
      driverParam: string;
      notNull: true;
      hasDefault: false;
      isPrimaryKey: false;
      isAutoincrement: false;
      hasRuntimeDefault: false;
      enumValues: [string, ...string[]];
      baseColumn: never;
      identity: undefined;
      generated: undefined;
    }, {}, {
      length: 256;
    }>;
  };
  dialect: "pg";
}>;
declare const UserSelectSchema: drizzle_zod0.BuildSchema<"select", {
  createAt: drizzle_orm_pg_core6.PgColumn<{
    name: "createAt";
    tableName: "user";
    dataType: "date";
    columnType: "PgTimestamp";
    data: Date;
    driverParam: string;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  updateAt: drizzle_orm_pg_core6.PgColumn<{
    name: "updateAt";
    tableName: "user";
    dataType: "date";
    columnType: "PgTimestamp";
    data: Date;
    driverParam: string;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  id: drizzle_orm_pg_core6.PgColumn<{
    name: "id";
    tableName: "user";
    dataType: "number";
    columnType: "PgSerial";
    data: number;
    driverParam: number;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: true;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  name: drizzle_orm_pg_core6.PgColumn<{
    name: "name";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
  email: drizzle_orm_pg_core6.PgColumn<{
    name: "email";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
  password: drizzle_orm_pg_core6.PgColumn<{
    name: "password";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
}, undefined, undefined>;
type UserSelect = z.infer<typeof UserSelectSchema>;
declare const UserInsertSchema: drizzle_zod0.BuildSchema<"insert", {
  createAt: drizzle_orm_pg_core6.PgColumn<{
    name: "createAt";
    tableName: "user";
    dataType: "date";
    columnType: "PgTimestamp";
    data: Date;
    driverParam: string;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  updateAt: drizzle_orm_pg_core6.PgColumn<{
    name: "updateAt";
    tableName: "user";
    dataType: "date";
    columnType: "PgTimestamp";
    data: Date;
    driverParam: string;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  id: drizzle_orm_pg_core6.PgColumn<{
    name: "id";
    tableName: "user";
    dataType: "number";
    columnType: "PgSerial";
    data: number;
    driverParam: number;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: true;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  name: drizzle_orm_pg_core6.PgColumn<{
    name: "name";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
  email: drizzle_orm_pg_core6.PgColumn<{
    name: "email";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
  password: drizzle_orm_pg_core6.PgColumn<{
    name: "password";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
}, undefined, undefined>;
type UserInsert = z.infer<typeof UserInsertSchema>;
declare const UserUpdateSchema: drizzle_zod0.BuildSchema<"update", {
  createAt: drizzle_orm_pg_core6.PgColumn<{
    name: "createAt";
    tableName: "user";
    dataType: "date";
    columnType: "PgTimestamp";
    data: Date;
    driverParam: string;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  updateAt: drizzle_orm_pg_core6.PgColumn<{
    name: "updateAt";
    tableName: "user";
    dataType: "date";
    columnType: "PgTimestamp";
    data: Date;
    driverParam: string;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  id: drizzle_orm_pg_core6.PgColumn<{
    name: "id";
    tableName: "user";
    dataType: "number";
    columnType: "PgSerial";
    data: number;
    driverParam: number;
    notNull: true;
    hasDefault: true;
    isPrimaryKey: true;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: undefined;
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {}>;
  name: drizzle_orm_pg_core6.PgColumn<{
    name: "name";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
  email: drizzle_orm_pg_core6.PgColumn<{
    name: "email";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
  password: drizzle_orm_pg_core6.PgColumn<{
    name: "password";
    tableName: "user";
    dataType: "string";
    columnType: "PgVarchar";
    data: string;
    driverParam: string;
    notNull: true;
    hasDefault: false;
    isPrimaryKey: false;
    isAutoincrement: false;
    hasRuntimeDefault: false;
    enumValues: [string, ...string[]];
    baseColumn: never;
    identity: undefined;
    generated: undefined;
  }, {}, {
    length: 256;
  }>;
}, undefined, undefined>;
type UserUpdate = z.infer<typeof UserUpdateSchema>;
//#endregion
//#region src/schema/index.d.ts
declare const schema: {
  user: drizzle_orm_pg_core6.PgTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
      createAt: drizzle_orm_pg_core6.PgColumn<{
        name: "createAt";
        tableName: "user";
        dataType: "date";
        columnType: "PgTimestamp";
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      }, {}, {}>;
      updateAt: drizzle_orm_pg_core6.PgColumn<{
        name: "updateAt";
        tableName: "user";
        dataType: "date";
        columnType: "PgTimestamp";
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      }, {}, {}>;
      id: drizzle_orm_pg_core6.PgColumn<{
        name: "id";
        tableName: "user";
        dataType: "number";
        columnType: "PgSerial";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      }, {}, {}>;
      name: drizzle_orm_pg_core6.PgColumn<{
        name: "name";
        tableName: "user";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      }, {}, {
        length: 256;
      }>;
      email: drizzle_orm_pg_core6.PgColumn<{
        name: "email";
        tableName: "user";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      }, {}, {
        length: 256;
      }>;
      password: drizzle_orm_pg_core6.PgColumn<{
        name: "password";
        tableName: "user";
        dataType: "string";
        columnType: "PgVarchar";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      }, {}, {
        length: 256;
      }>;
    };
    dialect: "pg";
  }>;
};
//#endregion
export { UserInsert, UserInsertSchema, UserSelect, UserSelectSchema, UserUpdate, UserUpdateSchema, schema, user };