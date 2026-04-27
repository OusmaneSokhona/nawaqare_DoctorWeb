import { ChangeEvent, FocusEvent, Key, ReactNode } from "react";
import { Props as ReactSelectProps } from "react-select";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ContainerProps {
  styling?: string;
  children?: ReactNode;
  isSideBorder?: boolean;
  isBottomBorder?: boolean;
  isRightBorder?: boolean;
}
export interface ContainerCardProps {
  cardHeading?: string;
  children?: ReactNode;
  headingAlign?: string;
  isSubHeading?: boolean;
  subHeading?: string;
}

export interface InputNumberFeildProps {
  disabled?: boolean;
  label?: string;
  isAuth?: boolean;
  name?: string;
  value?: number | string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  styling?: string;
  labelStyles?: string;
  textColor?: string;
  [key: string]: any;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface InputPasswordFieldProps {
  disabled?: boolean;
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  isAuth?: boolean;
  name?: string;
  labelStyles?: string;
  error?: string;
  styling?: string;
  textColor?: string;
  strengthChecker?: boolean;
  [key: string]: any;
  icon?: string;
}

export interface InputFieldProps {
  disabled?: boolean;
  label?: string;
  name?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  styling?: string;
  labelStyles?: string;
  textColor?: string;
  [key: string]: any;
  isAuth?: boolean;
  inputHeigth?: string;
  onCountryChange?: (countryCode: string) => void;
  icon?: string;
}

export interface SidebarItemProps {
  text: string;
  activeIcon: string;
  size?: string;
  path?: string;
  icon?: string;
  active?: boolean;
  subItem?: boolean;
  expanded?: boolean;
  subMenu?: SubMenuItemProps[] | null;
}

export interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded"> {
  subMenu?: never;
  expanded?: never;
}

export interface IGroupedOption {
  _id?: string;
  label: string;
  options: IOption[];
}

export interface IOption {
  value: string;
  label: string;
}

export interface LocationOption {
  key: string;
  value: string;
  flag: string;
  countryCode: string;
  ticked: boolean;
}
export interface IAppState {
  showMobileHeader: boolean;
  location: LocationOption[];
  filterName: string;
  licenceFeeUser: number;
  isLogoutModel: boolean;
  expandedIndex: number | null | undefined;
  isDrawerOpen: boolean;
}

export interface Location {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  altSpellings: string[];
}

export interface calculateFinalTotal {
  totalColumnSum: number;
  shippingAmount: number;
  discountPercentage: number;
  taxPercentage: number;
}

export interface Filters {
  noOfPatients: number[];
  ageRange: number[];
  bmi: number[];
  sexAtBirth: string;
  diseases: string[];
  bloodGroup: string[];
  location: string[];
  ethnicity: string[];
}

export interface BillingDetailsCardProps {
  action?: boolean;
  item?: {
    address: string;
    region: string;
    postalCode: string;
  };
  key: Key;
}

// Charts
export interface BackButtonProps {
  route?: string;
  label?: string | string[];
  iconColor?: string;
}

export interface InputDropdownProps extends ReactSelectProps {
  label?: string;
  width?: string;
  height?: string;
  rounded?: string;
  textColor?: string;
  background?: string;
  placeholder?: string;
  options: IOption[] | IGroupedOption[] | undefined;
  required?: boolean;
  onSelect: (option: string | string[]) => void;
  isCreatable?: boolean;
  value?: string | string[];
  name?: string;
  onBlur?: any;
  multipleCheck?: boolean;
  inputEnd?: React.ReactNode;
  error?: string | null;
  touched?: boolean | undefined;
  fetchNextPage?: any;
  hasNextPage?: any;
  subLabel?: string;
  fetchQuery?: any;
  isLoading?: boolean;
  selectedImgUrl?: string;
  placeholderStyle?: string;
  indicatorStyle?: string;
  selectedTextColor?: string;
  labelStyles?: string;
  menuPlacement?: "auto" | "top" | "bottom";
  borderRadius?: string;
  menuHeight?: number;
}

export interface NotificationDropdownProps {
  className?: string;
  notifications: {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    unread: boolean;
  }[];
}

type Option = {
  label: string;
  value: string;
};

export type RadioGroupProps = {
  name: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  touched?: boolean;
  error?: string;
  className?: string;
  optionsParentClassName?: string;
  optionClassName?: string;
  labelTextClassName?: string;
};

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}

export interface DataTableProps {
  notFonudText?: string;
  paginate?: boolean;
  loading?: boolean;
  tableRows: any[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  ColumnsData: Column[];
  TableBodyRow: any;
  topListedCountries?: boolean;
  roundedHeader?: boolean;
  headerClassName?: string;
  headerPosition?: string;
  invoice?: boolean;
  meta?: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  setCurrentPage?: (page: number) => void;
  setRowsPerPage?: (rows: number) => void;
}
interface Column {
  id: string;
  label: string;
  sortable?: boolean;
}
export interface DataFilterTableProps {
  headerBg?: string;
  notFonudText?: string;
  paginate?: boolean;
  tablehead?: boolean;
  loading?: boolean;
  tableRows: any[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  ColumnsData: Column[];
  TableBodyRow: any;
  topListedCountries?: boolean;
  roundedHeader?: boolean;
  headerClassName?: string;
  headerChildClassName?: string;
  headerPosition?: string;
  invoice?: boolean;
  meta?: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  setCurrentPage?: (page: number) => void;
  setRowsPerPage?: (rows: number) => void;
}

// Table row type (what rowsData actually is)
export type PrescriptionRow = {
  id: string;
  Patient: string;
  consumerId: string;
  date: string;
  type: string;
  Prescription: string;
  Medication: string;
  Date: string;
  Pharmacy: string;
  Doctor: string;
  validation: string;
  delivery: string;
};

export type PrescriptionDetail = {
  id: string;
  Patient: string;
  Date: string;
  img?: string;
  Activity: string;
  Description: string;
  Medication: string;
  Pharmacy: string;
  Doctor: string;
  Status: string;
  Method: string;
};
