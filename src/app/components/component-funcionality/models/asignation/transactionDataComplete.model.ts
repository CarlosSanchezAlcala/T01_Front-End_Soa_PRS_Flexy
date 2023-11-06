export interface transactionDataCompleteResponse {
  funcionaryResponseDto: {
    id_funcionary: number;
    name: string;
    surnameFather: string;
    surnameMother: string;
    dni: string;
    phoneNumber: string;
    range: string;
    confirmation: string;
    department: string;
    address: string;
    email: string;
    codubi: string;
    estado: string;
  };

  teenResponseDto: {
    id_teen: number;
    name: string;
    surnameFather: string;
    surnameMother: string;
    dni: string;
    phoneNumber: string;
    address: string;
    email: string;
    birthade: Date;
    gender: string;
    id_operativeunit: number;
    crimeCommitted: string;
    id_attorney: number;
    codubi: string;
    status: string;
  };

  transaccionalAllocation: {
    id_funcionaryteend: number;
    description: string;
    status: string;
    id_teen: number;
    id_funcionary: number;
  };
}
