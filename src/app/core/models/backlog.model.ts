export interface BacklogModel {
  name: string;
  collapsed?: boolean;
  items: BacklogItemModel[]
}

export interface BacklogItemModel {
  number: string;
  title: string;
  description: string;
  estimation: string;
  priority: string;
}

export interface BacklogItemAddModel {
  title: string;
  description: string;
}

export interface BacklogItemUpdateModel {
  title: string;
  description: string;
  estimation: string;
  priority: string;
}

export interface BacklogExportModel {
  filename: string;
  data: Blob
}
