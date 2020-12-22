export type ApiReturn<T> = {
  error: boolean;
  data?: T;
  message?: string;
  lastPage?: number;
};

export type LoginParam = {
  username: string;
  password: string;
};

export type LoginReturn = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  message?: string;
};

export type GetRawMaterialParam = {
  page?: number;
  keyword?: string;
};

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

type Links = {
  first: string;
  last: string;
  prev: string | null;
  next: string;
};

type Stores = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  cuisine: string | null;
  order_prefix: unknown;
  deliverytypes: unknown[];
  isOnline: boolean;
  previewUrl: string | null;
  authCode: string;
};

type WareHouse = {
  id: number;
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type RawMaterial = {
  id: number;
  uuid: string;
  sku: string;
  nameEng: string;
  nameChin: null | string;
  unit: string;
  defaultPrice: number;
  packing: string;
  stores: Stores[];
  warehouses: WareHouse[];
  categories: unknown[];
  supplier: {
    id: number;
    uuid: string;
    name: string;
    tel: string;
    email: string;
    address: string;
    remark: string | null;
    contactName: string;
    createdAt: string;
    updatedAt: string;
  };
  active: number;
  updatedBy: {
    id: number;
    uuid: string;
    name: string;
    email: string;
    tel: null | string;
    hkid: null | string;
    monthlySalary: string | null;
    hourlyWage: number;
    active: number;
  };
  createdAt: string;
  updatedAt: string;
};

export type RawMaterialReturn = {
  meta: Meta;
  links: Links;
  data: RawMaterial[];
  message?: string;
};

type Roles = {
  id: number;
  name: string;
  description: string;
};

export type User = {
  id: number;
  uuid: string;
  name: string;
  email: string | null;
  tel: string | null;
  hkid: null | string;
  monthlySalary: number;
  hourlyWage: number;
  active: number;
  tenant: {
    id: number;
    uuid: string;
    name: string;
    description: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
  };
  roles: Roles[];
  stores: Stores[];
};

export type CurrentUser = {
  user: User;
  message?: string;
};
