export type Author = { 
    Email: string;
    LookupId: number;
    LookupValue: string;
 }

export type Lookup = {
    LookupId: number;
    LookupValue: string;
}

export type  DataItem = {
    Status: string;
    StatusCode: number;
    DepartmentOrganization: Lookup;
    Priority: number;
    id: number;
    Title: string;
    Created: Date; 
    Author: Author;
}

export type DataItemInput = Omit<DataItem, "ID">
  