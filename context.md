# CONTEXT.md
# Sistema de Gestión Integral para Restaurantes

## 1. Descripción general

Aplicación web para administrar restaurantes, incluyendo mesas, meseros, clientes, pedidos, cajas, pagos, facturación, impresión POS y cocina.

El sistema contará con:

- Aplicación administrativa web.
- Aplicación móvil PWA para meseros.
- Pantalla KDS para cocina.
- Módulo de facturación.
- Módulo de clientes naturales y jurídicos.
- Múltiples cajas e impresoras.

La arquitectura deberá permitir comenzar con un restaurante y escalar a múltiples restaurantes mediante un modelo SaaS.

El sistema deberá priorizar la seguridad, consistencia de los datos, facilidad de mantenimiento y escalabilidad.

## 2. Stack tecnológico

### 2.1 Frontend

- React.
- TypeScript.
- Vite.
- React Router.
- Bootstrap o Tailwind CSS.
- React Hook Form para formularios.
- Zod para validaciones de formularios.
- Axios o Fetch API para comunicación HTTP.
- React Query (TanStack Query) para gestión de datos del servidor.
- Progressive Web App (PWA).
- SignalR Client para comunicación en tiempo real.

### 2.2 Backend

- C#.
- ASP.NET Core Web API.
- Entity Framework Core.
- SQL Server.
- ASP.NET Core Identity para gestión de usuarios y contraseñas.
- JWT para autenticación de la API.
- SignalR para comunicación en tiempo real.
- FluentValidation para validaciones.
- Swagger / OpenAPI para documentación de endpoints.
- xUnit para pruebas automatizadas.

### 2.3 Base de datos

Microsoft SQL Server.

Utilizar Entity Framework Core como ORM para:

- Mapear entidades.
- Configurar relaciones.
- Administrar restricciones.
- Crear índices.
- Ejecutar migraciones.
- Consultar y persistir información.

Utilizar tipos DECIMAL para valores monetarios.

No utilizar FLOAT, REAL o DOUBLE para almacenar dinero.

### 2.4 Infraestructura

- Docker.
- Docker Compose.
- Nginx o proxy inverso equivalente.
- SQL Server.
- Git.
- Ubuntu Server o infraestructura compatible con contenedores.
- HTTPS.
- Copias de seguridad automatizadas.

Redis podrá incorporarse cuando se requiera para caché, distribución de eventos o escalamiento de conexiones en tiempo real.

### 2.5 Impresión

- Impresoras térmicas ESC/POS.
- Servicio local de impresión.
- Papel térmico de 58 mm y 80 mm.
- Impresión mediante conexiones USB o red LAN.
- Cola persistente de trabajos de impresión.

## 3. Arquitectura del sistema

Utilizar arquitectura de monolito modular.

Durante el MVP se utilizará un único proyecto ASP.NET Core Web API denominado:

`restaurante_back`

El código estará organizado internamente por responsabilidades y módulos.

No implementar microservicios durante el MVP.

### 3.1 Arquitectura general

```text
React Web
React PWA Meseros
Pantalla KDS React
        |
        | REST API / SignalR
        |
ASP.NET Core Web API
        |
        |---- Domain
        |---- Application
        |---- Infrastructure
        |---- Controllers
        |
        |---- Entity Framework Core
        |
        |---- SQL Server
        |
        |---- Servicio local de impresión
```

### 3.2 Organización interna del backend

El proyecto inicial será:

```text
restaurante_back/
│
├── Controllers/
│
├── Domain/
│   ├── Entities/
│   ├── Enums/
│   └── Interfaces/
│
├── Application/
│   ├── DTOs/
│   ├── Interfaces/
│   └── Services/
│
├── Infrastructure/
│   ├── Persistence/
│   │   ├── Configurations/
│   │   └── Migrations/
│   │
│   └── Repositories/
│
├── Properties/
│
├── Program.cs
├── appsettings.json
└── restaurante_back.csproj
```

Responsabilidades:

**Controllers**
- Recibir solicitudes HTTP.
- Validar parámetros de entrada básicos.
- Invocar servicios de aplicación.
- Retornar respuestas HTTP apropiadas.

**Domain**
- Contener entidades del negocio.
- Definir enumeraciones.
- Contener reglas y contratos propios del dominio.
- No depender de Entity Framework ni de SQL Server.

**Application**
- Implementar casos de uso.
- Coordinar operaciones del negocio.
- Definir DTOs.
- Gestionar interfaces de servicios.
- Aplicar validaciones de aplicación.

**Infrastructure**
- Configurar Entity Framework Core.
- Implementar el DbContext.
- Configurar relaciones y restricciones.
- Implementar repositorios cuando sean necesarios.
- Gestionar migraciones.
- Conectar con SQL Server y servicios externos.

La separación deberá mantenerse clara aunque inicialmente todas las capas estén dentro del mismo proyecto.

Si el crecimiento del sistema lo justifica, se podrán separar en proyectos independientes sin modificar las reglas principales del negocio.

### 3.3 Organización del frontend

```text
restaurante_front/
│
├── public/
│
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── restaurantes/
│   │   ├── clientes/
│   │   ├── mesas/
│   │   ├── productos/
│   │   ├── pedidos/
│   │   ├── cocina/
│   │   ├── cajas/
│   │   ├── pagos/
│   │   ├── facturacion/
│   │   ├── reportes/
│   │   └── meseros/
│   │
│   └── main.tsx
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Cada módulo deberá mantener sus componentes, servicios, tipos, formularios y funcionalidades específicas.

Evitar concentrar toda la lógica en componentes grandes.

## 4. Módulos funcionales

### 4.1 Autenticación y usuarios

Roles:

- Administrador.
- Propietario.
- Cajero.
- Mesero.
- Cocinero.
- Supervisor.

Implementar:

- Inicio de sesión.
- Cierre de sesión.
- Administración de usuarios.
- Administración de roles.
- Autorización por permisos.
- Asignación de usuarios a sucursales.
- Recuperación de contraseña.
- Control de sesiones y tokens.

Utilizar ASP.NET Core Identity para la administración segura de usuarios y contraseñas.

La API utilizará autenticación JWT y políticas de autorización según roles y permisos.

### 4.2 Restaurantes y sucursales

Permitir:

- Registrar restaurantes.
- Configurar datos comerciales.
- Registrar sucursales.
- Configurar parámetros.
- Configurar impuestos.
- Configurar impresoras.
- Configurar estaciones de preparación.

Cada entidad de negocio deberá pertenecer al restaurante correspondiente.

### 4.3 Gestión de mesas

Permitir:

- Crear y modificar mesas.
- Asignar número.
- Definir capacidad.
- Asignar zona.
- Asignar mesero.
- Consultar estado.
- Asociar cuentas abiertas.

Estados:

- Disponible.
- Ocupada.
- Pedido pendiente.
- En preparación.
- Lista para servir.
- Pendiente de pago.

### 4.4 Gestión de zonas

Administrar zonas del restaurante:

- Salón.
- Terraza.
- Zona VIP.
- Patio.
- Segundo piso.

Cada mesa debe pertenecer a una zona.

### 4.5 Gestión de meseros

Permitir:

- Registrar meseros.
- Asignar credenciales.
- Activar y desactivar usuarios.
- Asignar mesas.
- Consultar pedidos.
- Consultar ventas.
- Consultar historial.

### 4.6 Gestión de clientes

El sistema deberá contar con un módulo de clientes para administrar la información de compradores y facilitar la emisión de documentos de venta.

#### Tipos de clientes

**Persona natural**

- Nombre.
- Apellidos.
- Tipo de identificación.
- Número de identificación.
- Correo electrónico.
- Teléfono.
- Dirección.
- Ciudad.
- Departamento.
- País.

**Persona jurídica**

- Razón social.
- NIT.
- Dígito de verificación cuando aplique.
- Nombre comercial.
- Representante legal, si se requiere.
- Correo electrónico.
- Teléfono.
- Dirección.
- Ciudad.
- Departamento.
- País.

#### Funcionalidades

- Registrar clientes.
- Consultar clientes.
- Editar información.
- Activar y desactivar clientes.
- Buscar por identificación.
- Buscar por nombre o razón social.
- Buscar por teléfono.
- Buscar por correo.
- Consultar historial de compras.
- Consultar documentos emitidos.
- Consultar saldos pendientes cuando exista crédito.
- Asociar clientes a cuentas y pedidos.
- Exportar clientes a Excel.

#### Cliente ocasional

El sistema deberá permitir registrar ventas sin crear previamente un cliente permanente.

Se debe contemplar la opción de consumidor final o cliente ocasional.

Cuando el documento fiscal requiera identificación del comprador, deberán solicitarse los datos correspondientes.

#### Selección de cliente en una venta

Al iniciar una cuenta, el mesero podrá:

1. Seleccionar un cliente existente.
2. Registrar un nuevo cliente.
3. Continuar como consumidor final o cliente ocasional, según las condiciones aplicables.

La selección del cliente no debe ser obligatoria para todas las operaciones.

#### Historial de compras

El sistema deberá permitir consultar:

- Fecha de compra.
- Número de pedido.
- Número de documento.
- Productos adquiridos.
- Total.
- Medio de pago.
- Estado del documento.

#### Reglas de clientes

1. Un cliente podrá tener múltiples compras.
2. Un cliente podrá tener múltiples documentos de venta.
3. Una cuenta podrá asociarse a un cliente.
4. Una cuenta podrá permanecer sin cliente identificado cuando corresponda.
5. No eliminar físicamente clientes con historial de ventas.
6. Los clientes desactivados no podrán seleccionarse en nuevas operaciones, salvo autorización.
7. Los datos históricos de documentos emitidos deben conservarse.
8. Los datos fiscales de un documento emitido no deben modificarse retroactivamente por cambios en el registro del cliente.
9. La identificación deberá validarse según el tipo de documento.
10. El sistema deberá evitar duplicados de identificación dentro del mismo restaurante, cuando aplique.

### 4.7 Gestión de productos

Permitir:

- Categorías.
- Productos.
- Descripciones.
- Precios.
- Impuestos.
- Disponibilidad.
- Variantes.
- Modificadores.
- Ingredientes adicionales.
- Observaciones.
- Estaciones de preparación.

Categorías iniciales:

- Entradas.
- Platos principales.
- Bebidas.
- Postres.
- Cafetería.

### 4.8 Gestión de pedidos

Permitir:

- Crear pedidos.
- Agregar productos.
- Modificar cantidades.
- Agregar observaciones.
- Confirmar pedidos.
- Enviar a cocina.
- Consultar estados.
- Cancelar productos según permisos.

Estados:

- Borrador.
- Confirmado.
- Enviado a cocina.
- En preparación.
- Listo.
- Entregado.
- Cancelado.

Cada pedido debe registrar:

- Número.
- Mesa.
- Cuenta.
- Cliente, cuando exista.
- Mesero.
- Fecha.
- Hora.
- Productos.
- Cantidades.
- Observaciones.
- Estado.
- Historial.

Los pedidos confirmados no podrán eliminarse físicamente.

### 4.9 Gestión de cocina

Implementar KDS (Kitchen Display System).

Características:

- Visualización de comandas en tiempo real.
- Filtrado por estación.
- Número de pedido.
- Mesa.
- Mesero.
- Productos.
- Cantidades.
- Observaciones.
- Hora de envío.
- Tiempo transcurrido.
- Cambio de estados.

La cocina recibirá solamente los productos de su estación.

Utilizar SignalR para actualizar estados en tiempo real.

La base de datos será la fuente de verdad. Las notificaciones SignalR no reemplazan la persistencia de los pedidos.

### 4.10 Gestión de cajas

Permitir múltiples cajas.

Cada caja tendrá:

- Identificador.
- Nombre.
- Ubicación.
- Estado.
- Impresora asignada.

Estados:

- Abierta.
- Cerrada.

Cada apertura registrará:

- Usuario.
- Caja.
- Fecha.
- Hora.
- Saldo inicial.

Cada cierre registrará:

- Saldo inicial.
- Ventas.
- Ingresos.
- Egresos.
- Efectivo esperado.
- Efectivo declarado.
- Diferencia.
- Usuario responsable.

### 4.11 Gestión de pagos

Medios de pago:

- Efectivo.
- Tarjeta.
- Transferencia.
- Otros medios configurables.

Permitir:

- Pagos parciales.
- División de cuenta.
- Pago individual por productos.
- Pago compartido.
- Propinas.

Cada pago deberá asociarse a una caja.

Evitar cobros duplicados mediante transacciones de base de datos y controles de idempotencia.

### 4.12 Impresión POS

Tipos:

- Comanda de cocina.
- Comanda de bar.
- Recibo del cliente.
- Copia del recibo.
- Reporte de cierre.

Soportar:

- ESC/POS.
- Papel de 58 mm.
- Papel de 80 mm.
- Cortador automático.
- Tildes y caracteres especiales.
- Observaciones.
- Cantidades.

Las impresoras podrán asignarse a caja, cocina, bar y cafetería.

Registrar los trabajos de impresión y permitir reintentos controlados.

La impresión no dependerá exclusivamente de `window.print()` del navegador.

Implementar un servicio local de impresión que pueda comunicarse con la API y administrar impresoras USB o de red.

La falla de impresión no deberá provocar duplicación de pedidos ni pagos.

### 4.13 Facturación y documentos de venta

El sistema deberá permitir generar documentos de venta asociados a las cuentas y pedidos.

#### Datos del documento

- Restaurante emisor.
- Sucursal.
- Número de documento.
- Fecha y hora.
- Cliente.
- Tipo de identificación.
- Número de identificación.
- Productos.
- Cantidades.
- Precios.
- Subtotal.
- Impuestos.
- Descuentos.
- Propina, cuando aplique.
- Total.
- Medios de pago.

#### Tipos de comprador

- Consumidor final.
- Persona natural identificada.
- Persona jurídica identificada.

#### Funcionalidades

- Generar recibo POS.
- Generar documento de venta.
- Asociar cliente.
- Imprimir recibo.
- Consultar documentos.
- Consultar historial de facturación.
- Generar copias.
- Registrar anulaciones y notas correspondientes según el tipo de documento.

Los documentos emitidos deberán conservar una fotografía de los datos fiscales y comerciales utilizados al momento de su emisión.

No se deben modificar retroactivamente documentos emitidos.

#### Facturación electrónica DIAN

La facturación electrónica en Colombia deberá implementarse como módulo independiente.

Consideraciones:

- Cumplimiento de normativa DIAN vigente.
- Validación de datos fiscales.
- Integración con proveedor tecnológico autorizado o solución habilitada.
- Generación de documentos electrónicos.
- Transmisión y validación.
- Gestión de respuestas.
- Representación gráfica.
- Notas crédito y débito cuando correspondan.
- Almacenamiento de documentos y evidencias.
- Manejo de errores de transmisión.

No asumir que un recibo térmico POS equivale a una factura electrónica.

La obligación de emitir factura y los datos exigibles deben verificarse conforme a la normativa vigente y a las condiciones particulares del restaurante.

### 4.14 Reportes

- Ventas diarias.
- Ventas mensuales.
- Ventas por mesero.
- Ventas por producto.
- Ventas por categoría.
- Ventas por caja.
- Cierres de caja.
- Pedidos cancelados.
- Medios de pago.
- Clientes frecuentes.
- Historial de compras.
- Productos más vendidos.

Exportación a Excel y PDF.

## 5. Aplicación móvil para meseros

Desarrollar mediante React PWA.

Funcionalidades:

- Inicio de sesión.
- Visualización de mesas.
- Consultar disponibilidad.
- Abrir cuenta.
- Seleccionar cliente.
- Registrar cliente nuevo.
- Seleccionar consumidor final.
- Agregar productos.
- Modificar cantidades.
- Agregar observaciones.
- Enviar pedidos.
- Consultar preparación.
- Solicitar cuenta.

La interfaz debe priorizar rapidez, botones grandes y navegación táctil.

La primera versión requerirá conexión al servidor.

No asumir funcionamiento offline completo sin implementar previamente sincronización, resolución de conflictos y persistencia local.

## 6. Reglas de negocio generales

1. Una mesa no podrá tener dos cuentas abiertas independientes salvo configuración autorizada.
2. Una cuenta podrá contener múltiples pedidos.
3. Una cuenta podrá asociarse a un cliente.
4. Un pedido pertenece a una cuenta y a un mesero.
5. Los pedidos confirmados no se eliminan físicamente.
6. Las cancelaciones deben conservar auditoría.
7. Cada producto debe tener una estación.
8. Los pedidos se envían a las estaciones correspondientes.
9. Las modificaciones posteriores a la confirmación deben generar eventos o comandas adicionales.
10. Cada pago debe asociarse a una caja.
11. No cobrar una cuenta pagada.
12. Los cierres de caja deben calcular diferencias.
13. Los documentos emitidos conservan los datos utilizados originalmente.
14. Los montos monetarios utilizarán tipos Decimal en C# y DECIMAL en SQL Server.
15. Las operaciones críticas utilizarán transacciones.
16. El sistema utilizará la zona horaria `America/Bogota`.
17. Los precios históricos de venta no cambiarán al actualizar el catálogo.
18. La cancelación de productos requerirá permisos.
19. Las operaciones críticas registrarán usuario, fecha, hora y motivo.
20. El sistema deberá evitar duplicación de pedidos, pagos y documentos.

## 7. Seguridad

Implementar:

- Autenticación.
- Autorización por roles y permisos.
- ASP.NET Core Identity.
- JWT con expiración.
- Validaciones backend.
- HTTPS.
- Protección de datos.
- Auditoría.
- Variables de entorno y secretos seguros.
- Copias de seguridad.
- Restricciones de integridad.

La lógica crítica debe ejecutarse en el backend .NET, no exclusivamente en React.

Todas las operaciones deberán validar el restaurante y la sucursal a los que el usuario tiene acceso.

No confiar en identificadores de restaurante enviados por el frontend sin comprobar la autorización correspondiente.

## 8. Base de datos

Microsoft SQL Server.

Entity Framework Core será el ORM principal.

Entidades iniciales:

- Restaurante.
- Sucursal.
- Usuario.
- Rol.
- Permiso.
- UsuarioRol.
- UsuarioSucursal.
- Cliente.
- Zona.
- Mesa.
- Categoría.
- Producto.
- Estación.
- Cuenta.
- Pedido.
- DetallePedido.
- Comanda.
- DetalleComanda.
- Caja.
- AperturaCaja.
- MovimientoCaja.
- Pago.
- Factura.
- ReceptorDocumento.
- DetalleFactura.
- DocumentoFiscal.
- Impresora.
- TrabajoImpresion.
- Auditoría.

Las entidades de negocio deberán relacionarse con el restaurante correspondiente.

Los documentos emitidos deberán conservar los datos históricos relevantes.

### 8.1 Convenciones de persistencia

- Claves primarias mediante Identity cuando corresponda.
- Claves foráneas explícitas.
- Restricciones CHECK para estados y valores.
- Índices para búsquedas frecuentes.
- Índices únicos para evitar duplicaciones.
- Índices únicos filtrados para restricciones de registros activos cuando corresponda.
- DECIMAL(18,2) para valores monetarios.
- DECIMAL(18,3) para cantidades cuando se requiera fraccionamiento.
- DATETIME2 para fechas y horas.
- Migraciones mediante Entity Framework Core.

La configuración de relaciones, índices y restricciones se realizará preferiblemente mediante Fluent API en clases separadas dentro de `Infrastructure/Persistence/Configurations`.

### 8.2 Consideraciones sobre EF Core

- Utilizar un DbContext centralizado inicialmente.
- Separar las configuraciones de entidades.
- Evitar colocar toda la configuración en OnModelCreating.
- Utilizar migraciones versionadas.
- No modificar manualmente la base de datos sin reflejar los cambios en el modelo y sus migraciones.
- Evitar consultas N+1.
- Utilizar consultas asíncronas.
- Aplicar paginación en listados.
- Utilizar transacciones en operaciones críticas.

## 9. Escalabilidad

Preparar el sistema para:

- Múltiples restaurantes.
- Múltiples sucursales.
- Múltiples cajas.
- Múltiples meseros.
- Múltiples estaciones.
- Múltiples impresoras.
- Configuración independiente por restaurante.

Inicialmente utilizar una base de datos compartida con aislamiento lógico por restaurante.

Todas las consultas deberán validar el restaurante autorizado.

No permitir acceso cruzado entre restaurantes.

## 10. Infraestructura

### Desarrollo

- Visual Studio.
- .NET SDK.
- React.
- TypeScript.
- Vite.
- SQL Server Developer.
- Entity Framework Core.
- Docker Compose cuando sea necesario.
- Git.

### Producción

- Servidor Linux o Windows compatible con .NET.
- Docker cuando corresponda.
- HTTPS.
- SQL Server o Azure SQL.
- Backups automáticos.
- Monitoreo.
- Servicio local de impresión.

SQL Server Developer se utilizará exclusivamente en desarrollo y pruebas. La edición de producción deberá elegirse según licenciamiento, capacidad y presupuesto.

## 11. Estructura modular del backend

El proyecto inicial será un único ASP.NET Core Web API.

```text
restaurante_back/
│
├── Controllers/
│
├── Domain/
│   ├── Entities/
│   ├── Enums/
│   └── Interfaces/
│
├── Application/
│   ├── DTOs/
│   ├── Interfaces/
│   └── Services/
│
├── Infrastructure/
│   ├── Persistence/
│   │   ├── Configurations/
│   │   └── Migrations/
│   │
│   └── Repositories/
│
├── Properties/
│
├── Program.cs
├── appsettings.json
└── restaurante_back.csproj
```

Los módulos funcionales que se implementarán serán:

- Usuarios.
- Restaurantes.
- Clientes.
- Mesas.
- Productos.
- Pedidos.
- Cocina.
- Cajas.
- Pagos.
- Facturación.
- Impresiones.
- Reportes.
- Auditoría.

## 12. Estructura React

```text
restaurante_front/
│
├── public/
│
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── restaurantes/
│   │   ├── clientes/
│   │   ├── mesas/
│   │   ├── productos/
│   │   ├── pedidos/
│   │   ├── cocina/
│   │   ├── cajas/
│   │   ├── pagos/
│   │   ├── facturacion/
│   │   ├── reportes/
│   │   └── meseros/
│   │
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

### Convenciones del frontend

- Utilizar TypeScript.
- Crear componentes reutilizables.
- Separar componentes de presentación y lógica de negocio.
- Centralizar la comunicación HTTP.
- Utilizar interfaces y tipos para representar los DTOs.
- Implementar rutas protegidas.
- Manejar estados de carga y errores.
- Implementar validaciones de formularios.
- Evitar duplicar lógica entre módulos.
- Utilizar SignalR Client en los módulos que requieran información en tiempo real.

## 13. Estrategia de desarrollo

### Fase 1: MVP operativo

- Autenticación.
- Usuarios y roles.
- Restaurante.
- Mesas.
- Zonas.
- Productos.
- Clientes.
- Meseros.
- Pedidos.
- Cocina.
- Impresión de comandas.

### Fase 2: Operaciones comerciales

- Cajas.
- Apertura y cierre.
- Pagos.
- División de cuentas.
- Recibos POS.
- Facturación básica.
- Reportes.

### Fase 3: Mejoras

- Auditoría avanzada.
- Reportes administrativos.
- Historial de clientes.
- Impresión avanzada.
- Múltiples estaciones.

### Fase 4: Comercialización

- Multi-restaurante.
- Multi-sucursal.
- Suscripciones.
- Facturación electrónica DIAN.
- Integraciones externas.

## 14. Calidad del código

### Backend

- ASP.NET Core Web API.
- Separación por responsabilidades.
- Entidades de dominio.
- DTOs.
- Servicios de aplicación.
- Configuraciones EF Core.
- Validaciones.
- Manejo centralizado de excepciones.
- Consultas asíncronas.
- Pruebas unitarias.
- Pruebas de integración.
- Documentación Swagger.

No colocar toda la lógica de negocio en los Controllers.

### Frontend

- Componentes reutilizables.
- Servicios HTTP.
- Hooks personalizados.
- Interfaces TypeScript.
- Formularios controlados.
- Rutas protegidas.
- Interceptores o mecanismos centralizados de autenticación.
- Manejo de errores.
- Pruebas de componentes.

No colocar toda la lógica de negocio en los componentes React.

## 15. Criterios de aceptación

- Los meseros pueden tomar pedidos desde celulares.
- Los clientes pueden registrarse y asociarse a cuentas.
- Se pueden realizar ventas a consumidor final.
- Se pueden registrar clientes naturales y jurídicos.
- Se pueden consultar compras anteriores.
- Los pedidos llegan a cocina en tiempo real.
- Las comandas pueden imprimirse.
- Los pagos se registran correctamente.
- Las cajas pueden abrirse y cerrarse.
- Los recibos se pueden imprimir.
- Los documentos emitidos conservan sus datos.
- Los usuarios no acceden a funciones no autorizadas.
- Los datos permanecen consistentes.

## 16. Flujo principal

```text
Seleccionar mesa
      |
Abrir cuenta
      |
Seleccionar cliente
      |---- Cliente existente
      |---- Registrar cliente
      |---- Consumidor final
      |
Agregar productos
      |
Enviar pedido
      |
Cocina prepara
      |
Mesero entrega
      |
Solicitar cuenta
      |
Registrar pago
      |
Generar documento
      |
Imprimir recibo
      |
Cerrar cuenta
```

## 17. Principio fundamental

Priorizar un sistema funcional, seguro y fácil de mantener.

Evitar sobreingeniería.

El flujo central debe ser:

Mesa → Cuenta → Cliente → Pedido → Cocina → Entrega → Pago → Documento → Caja.

Este flujo debe estar completamente probado antes de desarrollar funcionalidades adicionales.

## 18. Instrucciones para agentes de programación

Todo agente que trabaje en este proyecto deberá cumplir las siguientes instrucciones:

1. Leer este archivo CONTEXT.md antes de modificar o crear funcionalidades.
2. Respetar el stack tecnológico definido: React, TypeScript, ASP.NET Core y SQL Server.
3. No introducir Angular, Django ni PostgreSQL.
4. Mantener la arquitectura modular interna del proyecto `restaurante_back`.
5. No crear proyectos adicionales dentro de la solución sin autorización.
6. Respetar las convenciones de nombres y organización.
7. No duplicar entidades, servicios ni lógica de negocio.
8. Utilizar Entity Framework Core para la persistencia.
9. Configurar las relaciones mediante Fluent API cuando sea apropiado.
10. No modificar la estructura de la base de datos sin revisar las dependencias.
11. Crear migraciones cuando se modifiquen entidades persistentes.
12. No eliminar físicamente registros comerciales confirmados.
13. Validar permisos y pertenencia al restaurante en las operaciones.
14. Utilizar transacciones en las operaciones críticas.
15. No confiar en datos monetarios calculados por React.
16. Crear DTOs para la comunicación entre frontend y backend.
17. Mantener los Controllers delgados.
18. Documentar decisiones técnicas relevantes.
19. Implementar pruebas para las reglas de negocio críticas.
20. No desarrollar funcionalidades fuera del alcance solicitado sin consultar previamente.

El agente deberá actuar como un desarrollador senior, priorizando integridad de datos, seguridad, mantenibilidad, rendimiento y consistencia arquitectónica.