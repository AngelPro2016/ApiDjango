from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=255)
    email = models.EmailField(unique=True)  
    telefono = models.CharField(max_length=20)
    direccion = models.TextField() 

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)
    categoria = models.CharField(max_length=100)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.titulo

class AlquilerLibro(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_alquiler = models.DateField()
    fecha_devolucion = models.DateField()

    def __str__(self):
        return f"Alquiler de {self.libro.titulo} a {self.cliente.nombre}"
