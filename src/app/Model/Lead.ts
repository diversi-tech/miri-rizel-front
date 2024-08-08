export interface Lead {
  leadId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  source: string;
  createdDate: Date;
  lastContactedDate: Date;
  businessName: string;
  notes: string;
}
