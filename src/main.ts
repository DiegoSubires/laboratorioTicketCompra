import "./style.css";

export type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

export const porcentajeIva: number[] = [21, 10, 5, 4, 0, 0];

export const tiposIva: TipoIva[] = [
  "general",
  "reducido",
  "superreducidoA",
  "superreducidoB",
  "superreducidoC",
  "sinIva",
];

export const calcularIva = (cantidad: number, tipoIva: TipoIva): number =>
  (cantidad *
    porcentajeIva[tiposIva.findIndex((val) => val === tipoIva.toString())]) /
  100;

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

export interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

export interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

export const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];

export const resultadoLineaTicket = productos.reduce(
  (
    accumulator: ResultadoLineaTicket[],
    currentValue: ResultadoLineaTicket | any,
    i,
    array: LineaTicket[] | any
  ) => {
    currentValue = {
      nombre: array[i].producto.nombre,
      cantidad: array[i].cantidad,
      precioSinIva: array[i].cantidad * array[i].producto.precio,
      tipoIva: array[i].producto.tipoIva,
      precioConIva:
        array[i].cantidad * array[i].producto.precio +
        calcularIva(
          array[i].cantidad * array[i].producto.precio,
          array[i].producto.tipoIva
        ),
    };
    return [...accumulator, currentValue];
  },
  []
);

export const resultadoTotalTicket: ResultadoTotalTicket = {
  totalSinIva:
    Math.round(
      productos.reduce(
        (accumulator: number, array: LineaTicket) =>
          accumulator + array.cantidad * array.producto.precio,
        0
      ) * 100
    ) / 100,
  totalConIva:
    Math.round(
      productos.reduce((accumulator: number, array: LineaTicket) => {
        return (
          accumulator +
          array.cantidad * array.producto.precio +
          calcularIva(
            array.cantidad * array.producto.precio,
            array.producto.tipoIva
          )
        );
      }, 0) * 100
    ) / 100,
  totalIva:
    Math.round(
      productos.reduce((accumulator: number, array: LineaTicket) => {
        return (
          accumulator +
          calcularIva(
            array.cantidad * array.producto.precio,
            array.producto.tipoIva
          )
        );
      }, 0) * 100
    ) / 100,
};
console.log(resultadoTotalTicket);
export const calcularTotalPorTipoIva = (
  totalDeIva: TipoIva,
  productos: LineaTicket[]
) =>
  productos.reduce((acc: number, cur: number | any, i, arr) => {
    arr[i].producto.tipoIva === totalDeIva
      ? (cur = calcularIva(
          arr[i].cantidad * arr[i].producto.precio,
          arr[i].producto.tipoIva
        ))
      : (cur = 0);
    return acc + cur;
  }, 0);

export const totalPorTipoIva = (productos: LineaTicket[]) =>
  tiposIva.reduce(
    (acc: TotalPorTipoIva[] | any, cur: TotalPorTipoIva[] | any | any, i) => {
      productos.find(
        (productos) => productos.producto.tipoIva === tiposIva[i]
      ) != undefined
        ? (cur = {
            tipoIva: tiposIva[i],
            cuantia:
              Math.round(
                calcularTotalPorTipoIva(tiposIva[i], productos) * 100
              ) / 100,
          })
        : (cur = {
            tipoIva: tiposIva[i],
            cuantia: 0,
          });

      return [...acc, cur];
    },
    []
  );

console.log(totalPorTipoIva(productos));

export const ticketFinal: TicketFinal = {
  lineas: resultadoLineaTicket,
  total: resultadoTotalTicket,
  desgloseIva: totalPorTipoIva(productos),
};

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

console.log(totalPorTipoIva(productosTest));

console.log(resultadoLineaTicket);

console.log(ticketFinal);
