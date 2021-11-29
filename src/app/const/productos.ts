export class Stock {
    public static prod = {
        "menu": [
            {
                "index": 1,
                "tipo": 1,
                "nombre": "Perro Caliente",
                "detalle" : "Pan completo, vienesa, cebolla en cuadritos, repollo rallado, papitas al hilo, queso gouda y salsas.",
                "precio": 1300,
                "opciones": [],
                "imagen" : "/src/assets/img/images/perroCaliente.jpg"
            },
            {
                "index": 2,
                "tipo": 1,
                "nombre": "Jumbo Especial",
                "detalle" : "Pan completo 25cm, vienesas, tocino, huevo, cebolla en cuadritos, repollo rallado, papitas al hilo, queso gouda y salsas",
                "precio": 3000,
                "opciones": [],
                "imagen" : "/src/assets/img/images/perroCaliente.jpg"
            },
            {
                "index": 3,
                "tipo": 1,
                "nombre": "Mini Pepito",
                "detalle" : "Pan completo pequeño, lechuga, tomate, carne de vacuno y pollo en trozos, tocineta, papas al hilo, queso gouda y salsas de la casa",
                "precio": 3000,
                "opciones": [
                    {
                        "proteina": "Mixto",
                        "checked": true
                    },
                    {
                        "proteina": "Pollo",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/miniPepito.jpg"
            },
            {
                "index": 4,
                "tipo": 1,
                "nombre": "Pepito Mixto",
                "detalle" : "Pan completo 25cm, carne de vacuno y pollo picado en trozos, lechuga, tomate, papas al hilo, queso gouda, tocino y salsas.",
                "precio": 5000,
                "opciones": [
                    {
                        "proteina": "Mixto",
                        "checked": true
                    },
                    {
                        "proteina": "Pollo",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/pepitoMixto.jpg"
            },
            {
                "index": 5,
                "tipo": 1,
                "nombre": "Pepito Especial",
                "detalle" : "Pan completo 25cm, carne de vacuno, pollo, chuleta de cerdo picado en trozos, lechuga, tomate, papitas al hilo, queso gouda, tocino, huevo y salsas.",
                "precio": 6000,
                "opciones": [
                    {
                        "proteina": "Mixto",
                        "checked": true
                    },
                    {
                        "proteina": "Pollo",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/pepitoEspecial.jpg"
            },
            {
                "index": 6,
                "tipo": 1,
                "nombre": "Pepito Arabe",
                "detalle" : "Carne de vacuno, pollo y chuleta de cerdo ahumada picado en trozos, lechuga, tomate, papitas hilos, queso gouda, tocino, huevo y salsas",
                "precio": 7000,
                "opciones": [
                    {
                        "proteina": "Mixto",
                        "checked": true
                    },
                    {
                        "proteina": "Pollo",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/pepitoArabe.jpg"
            },
            {
                "index": 7,
                "tipo": 1,
                "nombre": "Hamburg Especial",
                "detalle" : "Pan grande 16cm, elige 1 carne de vacuno, pechuga de pollo o chuleta de cerdo ahumado, lechuga, tomate, papitas hilo, queso gouda, tocino, huevos y salsas.",
                "precio": 5000,
                "opciones": [
                    {
                        "proteina": "Carne",
                        "checked": true
                    },
                    {
                        "proteina": "Pollo",
                        "checked": false
                    },
                    {
                        "proteina": "Chuleta",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/hambEspecial.jpg"
            },
            {
                "index": 8,
                "tipo": 1,
                "nombre": "Hamburguesa Doble",
                "detalle" : "Pan grande 16cm, combina 2 carnes de vacuno, pechuga de pollo o chuleta de cerdo ahumado, lechuga, tomate, papitas al hilo, queso gouda, tocino, huevo y salsas",
                "precio": 6000,
                "opciones": [
                    {
                        "proteina": "Carne/Pollo",
                        "checked": true
                    },
                    {
                        "proteina": "Carne/Chuleta",
                        "checked": false
                    },
                    {
                        "proteina": "Pollo/Chuleta",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/hambDoble.jpg"
            },
            {
                "index": 9,
                "tipo": 1,
                "nombre": "Hamburguesa Triple",
                "detalle" : "Pan grande 16cm, combina 3 carnes de vacuno, pollo o chuleta de cerdo ahumado, lechuga, tomate, papitas al hilo, queso gouda, tocino, huevo y salsas.",
                "precio": 7000,
                "opciones": [
                    {
                        "proteina": "Carne/Pollo/Chuleta",
                        "checked": true
                    },
                    {
                        "proteina": "Carne/Carne/Chuleta",
                        "checked": false
                    },
                    {
                        "proteina": "Pollo/Pollo/Chuleta",
                        "checked": false
                    },
                    {
                        "proteina": "Pollo/Pollo/Carne",
                        "checked": false
                    },
                    {
                        "proteina": "Carne/Carne/Pollo",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/hambTriple.jpg"
            },
            {
                "index": 10,
                "tipo": 1,
                "nombre": "Papas Mixtas",
                "detalle" : "Cama de papas fritas, carne, pollo, chuleta de cerdo ahumada en trozos, maíz, tocino, queso gouda y salsas de la casa.",
                "precio": 7000,
                "opciones": [
                    {
                        "proteina": "Mixto",
                        "checked": true
                    },
                    {
                        "proteina": "Pollo",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/papaMixta.jpg"
            },
            {
                "index": 11,
                "tipo": 1,
                "nombre": "Papas Fritas",
                "detalle" : "500 gramos de papas",
                "precio": 2000,
                "opciones": [],
                "imagen" : "/src/assets/img/images/papasFritas.jpg"
            },
            {
                "index": 12,
                "tipo": 1,
                "nombre": "Tequeños",
                "detalle" : "4 Unidades de 9 cm",
                "precio": 2000,
                "opciones": [],
                "imagen" : "/src/assets/img/images/tequeños.jpg"
            },
            {
                "index": 13,
                "tipo": 2,
                "nombre": "Express",
                "detalle" : "",
                "precio": 500,
                "opciones": [
                    {
                        "proteina": "CocaCola",
                        "checked": true
                    },
                    {
                        "proteina": "Fanta",
                        "checked": false
                    },
                    {
                        "proteina": "Sprite",
                        "checked": false
                    },
                    {
                        "proteina": "Coca Zero",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/express.jpg"
            },
            {
                "index": 14,
                "tipo": 2,
                "nombre": "Lata",
                "detalle" : "",
                "precio": 1000,
                "opciones": [
                    {
                        "proteina": "CocaCola",
                        "checked": true
                    },
                    {
                        "proteina": "Fanta",
                        "checked": false
                    },
                    {
                        "proteina": "Sprite",
                        "checked": false
                    },
                    {
                        "proteina": "Coca Zero",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/lata.jpg"
            },
            {
                "index": 15,
                "tipo": 2,
                "nombre": "Venezolanas",
                "detalle" : "",
                "precio": 1500,
                "opciones": [
                    {
                        "proteina": "Malta",
                        "checked": true
                    },
                    {
                        "proteina": "Frescolita",
                        "checked": false
                    },
                    {
                        "proteina": "Uva",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/maltaFrescolita.jpeg"
            },
            {
                "index": 16,
                "tipo": 2,
                "nombre": "1.5 Litros",
                "detalle" : "",
                "precio": 2000,
                "opciones": [
                    {
                        "proteina": "CocaCola",
                        "checked": true
                    },
                    {
                        "proteina": "Fanta",
                        "checked": false
                    },
                    {
                        "proteina": "Sprite",
                        "checked": false
                    },
                    {
                        "proteina": "Coca Zero",
                        "checked": false
                    }
                ],
                "imagen" : "/src/assets/img/images/unocinco.png"
            }
        ]
    }
}