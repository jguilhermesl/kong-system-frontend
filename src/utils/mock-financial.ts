export interface FinancialRecord {
  saleDate: string;
  productType: string;
  productName: string;
  saleValue: number;
  unitValue: number;
  commission: number;
  profitOrExpense: number;
  paidOrRefunded: boolean;
  seller: string;
  notes?: string;
  clientName: string;
  clientNumber: string;
  responsible: string;
}

export const financialRecordsMock: FinancialRecord[] = [
  {
    saleDate: '2025-01-22',
    productType: 'Eletrônico',
    productName: 'Headset Gamer',
    saleValue: 299.99,
    unitValue: 150.0,
    commission: 15.0,
    profitOrExpense: 50.0,
    paidOrRefunded: true,
    seller: 'João Silva',
    notes: 'Entrega realizada com sucesso',
    clientName: 'Maria Oliveira',
    clientNumber: '(11) 99999-9999',
    responsible: 'Admin',
  },
  {
    saleDate: '2025-01-20',
    productType: 'Serviço',
    productName: 'Consultoria Financeira',
    saleValue: 500.0,
    unitValue: 500.0,
    commission: 50.0,
    profitOrExpense: 200.0,
    paidOrRefunded: true,
    seller: 'Ana Souza',
    notes: 'Serviço contratado para análise financeira',
    clientName: 'Carlos Eduardo',
    clientNumber: '(21) 98888-7777',
    responsible: 'Admin',
  },
  {
    saleDate: '2025-01-18',
    productType: 'Acessório',
    productName: 'Capa para Smartphone',
    saleValue: 49.99,
    unitValue: 49.99,
    commission: 5.0,
    profitOrExpense: 15.0,
    paidOrRefunded: true,
    seller: 'Lucas Ferreira',
    clientName: 'Beatriz Mendes',
    clientNumber: '(31) 97777-6666',
    responsible: 'Admin',
  },
  {
    saleDate: '2025-01-15',
    productType: 'Eletrônico',
    productName: 'Smartphone',
    saleValue: 2999.99,
    unitValue: 2999.99,
    commission: 200.0,
    profitOrExpense: 500.0,
    paidOrRefunded: false,
    seller: 'Carla Santos',
    notes: 'Pagamento pendente',
    clientName: 'Eduardo Lima',
    clientNumber: '(41) 96666-5555',
    responsible: 'Admin',
  },
  {
    saleDate: '2025-01-10',
    productType: 'Serviço',
    productName: 'Instalação de Software',
    saleValue: 199.99,
    unitValue: 199.99,
    commission: 20.0,
    profitOrExpense: 75.0,
    paidOrRefunded: true,
    seller: 'Mariana Ribeiro',
    notes: 'Software instalado com sucesso',
    clientName: 'Fernanda Alves',
    clientNumber: '(51) 95555-4444',
    responsible: 'Admin',
  },
];
