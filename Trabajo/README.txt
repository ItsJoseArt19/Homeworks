SIMULADOR DE DADOS

Descripción:
Este programa simula el lanzamiento de dados de manera virtual. 

Cómo usar el programa:
1. Abre una terminal o símbolo del sistema (Win + R) y cmd
2. Navega a la carpeta donde está el archivo simulador_dados.py
3. Ejecuta el comando:
   
   python simulador_dados.py

4. Se abrirá una ventana con la interfaz gráfica

Cómo funciona:

El programa tiene dos partes principales:

1. SimuladorDados (la lógica)
   - Simula el lanzamiento de dados usando números aleatorios
   - Guarda los resultados en una lista
   - Se visualiza el resultado de los dados
   - Muestra una lista con los numeros que han salido en rondas anteriores 

2. InterfazSimulador (lo que ves en la pantalla)
   - 2 dados con animación 
   - Visualiza el resultado en numeros
   - Incluye una lista con los resultados de rondas anteriores
   - Boton de lanzar dado y limpiar los datos 

Conceptos educativos:

Este programa enseña:

- Números aleatorios: random.randint() genera números sin patrón
- Listas: almacenamos todos los resultados en una lista
- Clases: separamos la lógica (SimuladorDados) de la interfaz (InterfazSimulador)
- Interfaz gráfica: usando tkinter para mostrar la aplicación
- Estadísticas: suma, promedio, mínimo, máximo, frecuencia

Notas técnicas:

- El programa usa tkinter para la interfaz, que viene con Python
- Funciona en Windows, Mac y Linux
- Los números se generan con random.randint(1, caras_dado)
