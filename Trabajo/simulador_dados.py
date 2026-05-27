import random
import tkinter as tk


class SimuladorDados:
    """Clase para simular lanzamientos de dados."""
    
    def __init__(self):
        self.resultados = []
    
    def lanzar_dado(self, caras_dado=6):
        """Simula el lanzamiento de un dado."""
        if caras_dado <= 0:
            return 0
        return random.randint(1, caras_dado)
    
    def guardar_resultado(self, resultado):
        """Guarda el resultado de un lanzamiento."""
        self.resultados.append(resultado)
    
    def obtener_total_lanzamientos(self):
        """Retorna la cantidad total de lanzamientos."""
        return len(self.resultados)
    
    def limpiar_resultados(self):
        """Limpia el historial de resultados."""
        self.resultados = []


class InterfazSimulador:
    """Interfaz gráfica con dados animados."""
    
    def __init__(self, ventana_principal):
        self.simulador = SimuladorDados()
        self.ventana = ventana_principal
        self.ventana.title("Proyecto Matias")
        self.ventana.geometry("700x700")
        self.ventana.resizable(False, False)
        
        self.animando = False
        self.resultado_dado1 = 1
        self.resultado_dado2 = 1
        
        self.crear_interfaz()
    
    def crear_interfaz(self):
        """Crea los elementos de la interfaz gráfica."""
        
        # Título
        frame_titulo = tk.Frame(self.ventana, bg="#2c3e50", height=60)
        frame_titulo.pack(fill=tk.X)
        
        titulo = tk.Label(frame_titulo, text="Simulador de Dados", 
                         font=("Arial", 24, "bold"), fg="white", bg="#2c3e50")
        titulo.pack(pady=15)
        
        # Frame de los dados
        frame_dados = tk.Frame(self.ventana, bg="white")
        frame_dados.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Canvas para dibujar los dados
        self.canvas = tk.Canvas(frame_dados, width=600, height=300, 
                               bg="white", highlightthickness=0)
        self.canvas.pack(pady=20)
        
        # Dibujar los dados iniciales
        self.dibujar_dados(self.resultado_dado1, self.resultado_dado2)
        
        # Frame de estadísticas
        frame_stats = tk.Frame(self.ventana, bg="#ecf0f1")
        frame_stats.pack(fill=tk.X, padx=20, pady=10)
        
        self.etiqueta_lanzamientos = tk.Label(frame_stats, text="Lanzamientos: 0", 
                                            font=("Arial", 12, "bold"), fg="#2c3e50", bg="#ecf0f1")
        self.etiqueta_lanzamientos.pack(side=tk.LEFT, padx=20, pady=10)
        
        # Frame para historial horizontal
        frame_historial = tk.Frame(self.ventana, bg="white")
        frame_historial.pack(fill=tk.X, padx=20, pady=5)
        
        tk.Label(frame_historial, text="Historial:", font=("Arial", 11, "bold"), 
                fg="#2c3e50", bg="white").pack(side=tk.LEFT, padx=10, pady=5)
        
        self.etiqueta_historial = tk.Label(frame_historial, text="", 
                                          font=("Arial", 11), fg="#27ae60", bg="white")
        self.etiqueta_historial.pack(side=tk.LEFT, padx=5, pady=5, fill=tk.X, expand=True)
        
        # Frame de botones
        frame_botones = tk.Frame(self.ventana, bg="white")
        frame_botones.pack(fill=tk.X, padx=20, pady=20)
        
        self.boton_lanzar = tk.Button(frame_botones, text="LANZAR DADOS", 
                                     command=self.lanzar, 
                                     font=("Arial", 14, "bold"),
                                     bg="#27ae60", fg="white",
                                     padx=30, pady=15, cursor="hand2")
        self.boton_lanzar.pack(side=tk.LEFT, padx=10, pady=10)
        
        boton_limpiar = tk.Button(frame_botones, text="LIMPIAR", 
                                 command=self.limpiar,
                                 font=("Arial", 14, "bold"),
                                 bg="#e74c3c", fg="white",
                                 padx=30, pady=15, cursor="hand2")
        boton_limpiar.pack(side=tk.LEFT, padx=10, pady=10)
    
    def dibujar_dados(self, valor1, valor2):
        """Dibuja dos dados con los valores indicados."""
        self.canvas.delete("all")
        
        # Posiciones de los dados, centrados
        x1, y1 = 75, 60
        x2, y2 = 375, 60
        tamanio = 150
        
        # Dibujar primer dado
        self.dibujar_un_dado(x1, y1, tamanio, valor1)
        
        # Dibujar segundo dado
        self.dibujar_un_dado(x2, y2, tamanio, valor2)
        
        # Mostrar suma en el centro
        suma = valor1 + valor2
        self.canvas.create_text(300, 270, text=f"SUMA: {suma}", 
                              font=("Arial", 20, "bold"), fill="#2c3e50")
    
    def dibujar_un_dado(self, x, y, tamanio, valor):
        """Dibuja un solo dado con el valor indicado."""
        # Borde del dado con esquinas redondeadas simuladas
        self.canvas.create_rectangle(x, y, x + tamanio, y + tamanio,
                                    outline="#2c3e50", width=3, fill="#f5f5f5")
        
        # Puntos del dado según el valor
        puntos = self.obtener_puntos_dado(valor)
        
        # Dibujar los puntos perfectamente centrados
        radio = 7
        for px, py in puntos:
            # Calcular posición exactamente centrada en la celda
            pos_x = x + tamanio * (px + 0.5) / 7
            pos_y = y + tamanio * (py + 0.5) / 7
            self.canvas.create_oval(pos_x - radio, pos_y - radio,
                                   pos_x + radio, pos_y + radio,
                                   fill="#2c3e50")
    
    def obtener_puntos_dado(self, valor):
        """Retorna las posiciones de los puntos según el valor del dado."""
        centro = (3, 3)
        
        # Disposiciones de puntos para cada número
        disposiciones = {
            1: [centro],
            2: [(1, 1), (5, 5)],
            3: [(1, 1), centro, (5, 5)],
            4: [(1, 1), (5, 1), (1, 5), (5, 5)],
            5: [(1, 1), (5, 1), centro, (1, 5), (5, 5)],
            6: [(1, 1), (1, 3), (1, 5), (5, 1), (5, 3), (5, 5)]
        }
        
        return disposiciones.get(valor, [])
    
    def lanzar(self):
        """Inicia la animación de lanzamiento de dados."""
        if self.animando:
            return
        
        self.animando = True
        self.boton_lanzar.config(state=tk.DISABLED)
        
        # Animar los dados
        self.animar_dados(20)
    
    def animar_dados(self, frames_restantes):
        """Anima los dados con rotación."""
        if frames_restantes > 0:
            # Generar números aleatorios para la animación
            num_aleatorio1 = random.randint(1, 6)
            num_aleatorio2 = random.randint(1, 6)
            
            self.dibujar_dados(num_aleatorio1, num_aleatorio2)
            
            # Continuar la animación
            self.ventana.after(50, lambda: self.animar_dados(frames_restantes - 1))
        
        else:
            self.resultado_dado1 = self.simulador.lanzar_dado()
            self.resultado_dado2 = self.simulador.lanzar_dado()
            suma = self.resultado_dado1 + self.resultado_dado2
            self.simulador.guardar_resultado(suma)
            self.dibujar_dados(self.resultado_dado1, self.resultado_dado2)
            self.actualizar_estadisticas()
            
            self.animando = False
            self.boton_lanzar.config(state=tk.NORMAL)
    
    def actualizar_estadisticas(self):
        """Actualiza las etiquetas de estadísticas."""
        total_lanzamientos = self.simulador.obtener_total_lanzamientos()
        
        self.etiqueta_lanzamientos.config(text=f"Lanzamientos: {total_lanzamientos}")
        
        # Crear historial horizontal
        if self.simulador.resultados:
            # Mostrar los últimos 10 lanzamientos
            ultimos = self.simulador.resultados[-10:]
            historial_texto = " | ".join([str(r) for r in ultimos])
            self.etiqueta_historial.config(text=historial_texto)
        else:
            self.etiqueta_historial.config(text="")
    
    def limpiar(self):
        """Limpia los resultados y reinicia la interfaz."""
        if self.animando:
            return
        
        self.simulador.limpiar_resultados()
        self.resultado_dado1 = 1
        self.resultado_dado2 = 1
        
        self.dibujar_dados(1, 1)
        self.etiqueta_lanzamientos.config(text="Lanzamientos: 0")
        self.etiqueta_historial.config(text="")


def main():
    ventana = tk.Tk()
    app = InterfazSimulador(ventana)
    ventana.mainloop()


if __name__ == "__main__":
    main()
