import {
  calcularIva,
  calcularTotalPorTipoIva,
  LineaTicket,
  resultadoLineaTicket,
  ResultadoLineaTicket,
  resultadoTotalTicket,
  ResultadoTotalTicket,
  TipoIva,
  totalPorTipoIva,
  TotalPorTipoIva,
} from "./main";

describe("calcularIva", () => {
  it("debería calcular el IVA de una cantidad", () => {
    // Arrange
    const cantidad: number = 200;
    const tipoIvaCalculo: TipoIva = "general";

    // Act
    const resultado: number = calcularIva(cantidad, tipoIvaCalculo);

    // Assert
    const ivaEsperado: number = 42;

    expect(resultado).toEqual(ivaEsperado);
  });
  it("debería calcular el IVA de una cantidad", () => {
    // Arrange
    const cantidad: number = 350;
    const tipoIvaCalculo: TipoIva = "superreducidoC";

    // Act
    const resultado: number = calcularIva(cantidad, tipoIvaCalculo);

    // Assert
    const ivaEsperado: number = 0;

    expect(resultado).toEqual(ivaEsperado);
  });
});

const productosTest: LineaTicket[] = [
  {
    producto: {
      nombre: "Garbanzos",
      precio: 2.58,
      tipoIva: "general",
    },
    cantidad: 3.67,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 15.63,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1.25,
      tipoIva: "superreducidoB",
    },
    cantidad: 12,
  },
  {
    producto: {
      nombre: "Leche Desnatada",
      precio: 1.45,
      tipoIva: "superreducidoB",
    },
    cantidad: 6,
  },
];

describe("calcularTotalPorTipoIva", () => {
  it("debería calcular la cuantía total para IVA general", () => {
    // Arrange

    // Act
    const resultado: number = calcularTotalPorTipoIva("general", productosTest);

    // Assert
    const cuantiaIvaGeneral: number = 8.553006;

    expect(resultado).toEqual(cuantiaIvaGeneral);
  });
  it("debería calcular la cuantía total para IVA superreducidoB", () => {
    // Arrange

    // Act
    const resultado: number = calcularTotalPorTipoIva(
      "superreducidoB",
      productosTest
    );

    // Assert
    const cuantiaIvaSuperReducidoB: number = 0.04 * (1.25 * 12 + 1.45 * 6);

    expect(resultado).toEqual(cuantiaIvaSuperReducidoB);
  });
});

describe("resultadoTotalTicket", () => {
  it("debería calcular los totales sin IVA, con IVA y la cuantía total del IVA", () => {
    // Arrange

    // Act
    const resultado: ResultadoTotalTicket = resultadoTotalTicket;

    // Assert
    const totales: ResultadoTotalTicket = {
      totalSinIva: 75,
      totalConIva: 88.69,
      totalIva: 13.69,
    };

    expect(resultado).toEqual(totales);
  });
});

describe("totalPorTipoIva", () => {
  it("debería calcular la cuantía del IVA para cada tipo de IVA", () => {
    // Arrange

    // Act
    const resultado: TotalPorTipoIva[] = totalPorTipoIva(productosTest);

    // Assert
    const totales: TotalPorTipoIva[] = [
      { tipoIva: "general", cuantia: 8.55 },
      { tipoIva: "reducido", cuantia: 0 },
      { tipoIva: "superreducidoA", cuantia: 0 },
      { tipoIva: "superreducidoB", cuantia: 0.95 },
      { tipoIva: "superreducidoC", cuantia: 0 },
      { tipoIva: "sinIva", cuantia: 0 },
    ];

    expect(resultado).toEqual(totales);
  });
});

describe("resultadoLineaTicket", () => {
  it("debería devolver las líneas del ticket según los productos", () => {
    // Arrange

    // Act
    const resultado: ResultadoLineaTicket[] = resultadoLineaTicket;

    // Assert
    const totales: ResultadoLineaTicket[] = [
      {
        cantidad: 2,
        nombre: "Legumbres",
        precioConIva: 4.84,
        precioSinIva: 4,
        tipoIva: "general",
      },
      {
        cantidad: 3,
        nombre: "Perfume",
        precioConIva: 72.6,
        precioSinIva: 60,
        tipoIva: "general",
      },
      {
        cantidad: 6,
        nombre: "Leche",
        precioConIva: 6,
        precioSinIva: 6,
        tipoIva: "superreducidoC",
      },
      {
        cantidad: 1,
        nombre: "Lasaña",
        precioConIva: 5.25,
        precioSinIva: 5,
        tipoIva: "superreducidoA",
      },
    ];

    expect(resultado).toEqual(totales);
  });
});
